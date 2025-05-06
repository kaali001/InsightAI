# app/utils/nlp.py
from typing import List, Dict, Optional
import os
import openai
import asyncio
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from collections import Counter
import logging
from openai import AsyncOpenAI
from langdetect import detect
from textblob import TextBlob
import numpy as np
from keybert import KeyBERT
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

# Initialize async OpenAI client
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
GPT_ENABLED = bool(os.getenv("OPENAI_API_KEY"))
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# -----------------------
# Summarization
# -----------------------

async def summarize_feedbacks(feedbacks: List[str]) -> str:
    """Hierarchical summarization with async fallbacks"""
    try:
        if GPT_ENABLED:
            try:
                return await gpt_summary(feedbacks)
            except Exception as e:
                logger.warning(f"GPT summary failed: {e}")
        
        return await run_in_executor(tfidf_summary, feedbacks)
        
    except Exception as e:
        logger.error(f"All summarization failed: {e}")
        return basic_stats_summary(feedbacks)

async def gpt_summary(feedbacks: List[str]) -> str:
    """Async GPT-4 summarization with truncation"""
    combined = "\n".join(feedbacks[:50])  # Keep within token limits
    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{
            "role": "system",
            "content": "Generate concise technical summary of user feedback."
        }, {
            "role": "user",
            "content": f"Analyze these feedback samples:\n{combined}"
        }],
        max_tokens=300
    )
    return response.choices[0].message.content.strip()

# -----------------------
# Labeling
# -----------------------

async def label_feedbacks(feedbacks: List[str]) -> Dict[str, List[str]]:
    """Hybrid labeling with async priority"""
    try:
        if GPT_ENABLED:
            try:
                return await gpt_labeling(feedbacks)
            except Exception as e:
                logger.warning(f"GPT labeling failed: {e}")
        
        return await run_in_executor(keyword_labeling, feedbacks)
        
    except Exception as e:
        logger.error(f"All labeling failed: {e}")
        return {"error": "Labeling failed"}

async def gpt_labeling(feedbacks: List[str]) -> Dict[str, List[str]]:
    """Async GPT categorization"""
    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{
            "role": "system",
            "content": "Categorize feedback into: bug, feature, ui, performance, other."
        }, {
            "role": "user", 
            "content": "\n".join(feedbacks[:20])
        }],
        max_tokens=500
    )
    return parse_gpt_labels(response.choices[0].message.content)

# -----------------------
# Clustering
# -----------------------

async def cluster_feedbacks(feedbacks: List[str]) -> Dict[int, List[str]]:
    """Adaptive clustering strategy"""
    try:
        if len(feedbacks) < 2:
            return {0: {"feedbacks": feedbacks, "summary": "All feedbacks", "count": len(feedbacks)}}
        
        if GPT_ENABLED and len(feedbacks) <= 20:
            try:
                return await gpt_clustering(feedbacks)
            except Exception as e:
                logger.warning(f"GPT clustering failed: {e}")
        
        embeddings = await run_in_executor(embedding_model.encode, feedbacks)
        # Cluster and summarize
        clusters = await run_in_executor(
            generate_cluster_names,
            feedbacks,
            embeddings
        )
        
        return clusters
        
    except Exception as e:
        logger.error(f"All clustering failed: {e}")
        return {0: feedbacks}  # Fallback to single cluster

async def gpt_clustering(feedbacks: List[str]) -> Dict[int, List[str]]:
    """Async GPT clustering"""
    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{
            "role": "system",
            "content": "Group these feedbacks into topics."
        }, {
            "role": "user",
            "content": "\n".join(feedbacks[:15])
        }],
        max_tokens=800
    )
    return parse_gpt_clusters(response.choices[0].message.content)

# -----------------------
# Fallback Implementations
# -----------------------

def tfidf_summary(feedbacks: List[str]) -> str:
    """CPU-bound fallback summary"""
    from sklearn.feature_extraction.text import TfidfVectorizer # type: ignore
    vectorizer = TfidfVectorizer(stop_words='english', max_features=50)
    X = vectorizer.fit_transform(feedbacks)
    features = vectorizer.get_feature_names_out()
    return f"Key topics: {', '.join(features[:5])}"

def keyword_labeling(feedbacks: List[str]) -> Dict[str, List[str]]:
    """Rule-based labeling"""
    labels = {"bug": [], "feature": [], "ui": [], "performance": [], "other": []}
    for text in feedbacks:
        lower_text = text.lower()
        if any(kw in lower_text for kw in ["bug", "crash", "error", "fail"]):
            labels["bug"].append(text)
        elif any(kw in lower_text for kw in ["feature", "add", "request"]):
            labels["feature"].append(text)
        elif any(kw in lower_text for kw in ["ui", "ux", "interface", "design"]):
            labels["ui"].append(text)
        elif any(kw in lower_text for kw in ["slow", "lag", "performance"]):
            labels["performance"].append(text)
        else:
            labels["other"].append(text)
    return labels

def kmeans_clustering(feedbacks: List[str]) -> Dict[int, List[str]]:
    """CPU-bound clustering fallback"""
    embeddings = embedding_model.encode(feedbacks)
    kmeans = KMeans(n_clusters=min(5, len(feedbacks)), n_init=10)
    clusters = kmeans.fit_predict(embeddings)
    return {i: [feedbacks[idx] for idx in cluster] for i, cluster in enumerate(clusters)}

def generate_cluster_names(feedbacks: List[str], embeddings: np.ndarray) -> Dict[int, dict]:
    """Generate meaningful cluster names using KeyBERT"""
    kw_model = KeyBERT()
    clusters = {}
    
    # First pass clustering
    kmeans = KMeans(n_clusters=min(5, len(feedbacks)), n_init=10)
    labels = kmeans.fit_predict(embeddings)
    
    unique_labels = np.unique(labels).tolist()

    # Cluster processing
    for cluster_id in unique_labels:
        # Convert numpy.int64 to int
        py_cluster_id = int(cluster_id)
        
        cluster_texts = [
            str(feedbacks[i])  # Ensure text is string
            for i, x in enumerate(labels) 
            if x == cluster_id
        ]
        # Fallback summary methods
        try:
            keywords = kw_model.extract_keywords(
                " ".join(cluster_texts), 
                keyphrase_ngram_range=(1, 2),
                stop_words='english',
                top_n=3
            )
            # Convert float scores to strings for JSON safety
            summary = ", ".join([f"{kw[0]}" for kw in keywords])
        except Exception as e:
            logger.warning(f"KeyBERT failed: {e}")
            summary = basic_stats_summary(cluster_texts)
        
        clusters[py_cluster_id] = {
            "feedbacks": cluster_texts,
            "summary": str(summary),  # Ensure string type
            "count": int(len(cluster_texts))  # Convert to native int
        }
    
    return clusters


def basic_stats_summary(feedbacks: List[str]) -> str:
    """Simple word frequency fallback"""
    words = Counter()
    for text in feedbacks:
        words.update([word.lower() for word in text.split() if len(word) > 3])
    return f"Top terms: {', '.join(w for w,_ in words.most_common(5))}"

# -----------------------
# Utilities
# -----------------------

async def run_in_executor(func, *args):
    """Run CPU-bound functions in thread pool"""
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, func, *args)


def parse_gpt_labels(gpt_response: str) -> Dict[str, List[str]]:
    """
    Parse GPT's labeled output into a dictionary.
    Very basic parser — assumes GPT returns a simple text format.
    """
    label_map = {
        "bugs": "bug",
        "features": "feature_request",
        "ui/ux": "ui_feedback",
        "perf": "performance"
    }
    labels = {}
    current_label = None

    for line in gpt_response.splitlines():
        line = line.strip()
        if not line:
            continue
        if ":" in line:
            current_label = line.replace(":", "").strip().lower()
            labels[current_label] = []
        elif current_label:
            labels[current_label].append(line)

    if current_label:
        normalized_label = label_map.get(current_label, current_label)
        labels.setdefault(normalized_label, []).append(line)
    return labels



def parse_gpt_clusters(gpt_response: str) -> Dict[int, List[str]]:
    """
    Parse GPT's cluster output into a dictionary.
    """
    clusters = {}
    current_cluster = None
    cluster_id = 0

    for line in gpt_response.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.lower().startswith("topic") or line.lower().startswith("group"):
            current_cluster = cluster_id
            clusters[current_cluster] = []
            cluster_id += 1
        elif current_cluster is not None:
            clusters[current_cluster].append(line)

    return clusters



def analyze_sentiment(feedbacks: List[str]) -> dict:
    """Multilingual sentiment analysis using TextBlob"""
    positive = 0
    negative = 0
    neutral = 0
    critical_issues = []
    
    for text in feedbacks:
        try:
            # Skip empty feedback
            if not text.strip():
                neutral += 1
                continue
                
            lang = detect(text[:500])  # Limit text size for language detection
            analysis = TextBlob(text)
            
            # Translate non-English text if possible
            if lang != 'en':
                try:
                    analysis = analysis.translate(to='en')
                except Exception as e:
                    logger.debug(f"Translation failed for {lang} text: {e}")
                    pass  # Use original text if translation fails
            
            polarity = analysis.sentiment.polarity
            
            if polarity > 0.1:
                positive += 1
            elif polarity < -0.1:
                negative += 1
            elif polarity < -0.3 or any(kw in text.lower() for kw in ["crash", "error", "bug", "fix"]):
                critical_issues.append({
                "text": text,
                "score": polarity,
                "keywords": [kw for kw in ["crash", "error", "bug", "fix"] if kw in text.lower()]
                })
            else:
                neutral += 1
        except Exception as e:
            logger.debug(f"Sentiment analysis failed for text: {text[:50]}... Error: {e}")
            neutral += 1  # Count as neutral if analysis fails
    
    total = max(1, len(feedbacks))  # Prevent division by zero
    return {
        'positive': round(positive/total * 100),
        'negative': round(negative/total * 100),
        'neutral': round(neutral/total * 100),
        'critical_issues': len(critical_issues),
        'critical_feedbacks': critical_issues
    }