# tests/test_nlp.py
import os
import sys
import pytest
from unittest.mock import patch, MagicMock
from typing import List, Dict

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from app.utils.nlp import (
    summarize_feedbacks,
    label_feedbacks,
    cluster_feedbacks,
    parse_gpt_labels,
    parse_gpt_clusters
)

# Sample feedbacks for testing
SAMPLE_FEEDBACKS = [
    "App crashes when uploading photos",
    "Please add dark mode feature",
    "The UI feels cluttered in the new update",
    "Slow performance on older devices",
    "Experiencing login errors frequently",
    "Love the new camera filters!",
    "Battery drains too fast when using the app",
    "Can't find the share button in the new layout"
]

# -----------------------
# Test Data
# -----------------------

GPT_SUMMARY_RESPONSE = "Users are reporting crashes during photo uploads, requesting dark mode, and noting performance issues on older devices."
GPT_LABELS_RESPONSE = """
Bugs:
- App crashes when uploading photos
- Experiencing login errors frequently

Feature Requests:
- Please add dark mode feature

UI Feedback:
- The UI feels cluttered in the new update
- Can't find the share button in the new layout

Performance:
- Slow performance on older devices
- Battery drains too fast when using the app
"""

GPT_CLUSTERS_RESPONSE = """
Topic 1: Crash Issues
- App crashes when uploading photos
- Experiencing login errors frequently

Topic 2: UI Feedback
- The UI feels cluttered in the new update
- Can't find the share button in the new layout

Topic 3: Performance
- Slow performance on older devices
- Battery drains too fast when using the app

Topic 4: Feature Requests
- Please add dark mode feature
- Love the new camera filters!
"""

# -----------------------
# Fixtures
# -----------------------

@pytest.fixture
def mock_openai_success():
    mock_response = MagicMock()
    mock_response.choices = [MagicMock(message=MagicMock(content=GPT_SUMMARY_RESPONSE))]
    with patch('openai.ChatCompletion.create', return_value=mock_response) as mock:
        yield mock

# -----------------------
# Summary Tests
# -----------------------

def test_summarize_feedbacks_gpt(mock_openai_success):
    """Test GPT-powered summary generation"""
    os.environ["OPENAI_API_KEY"] = "sk-test123"
    summary = summarize_feedbacks(SAMPLE_FEEDBACKS)
    print("\nGPT Summary Result:", summary)
    assert isinstance(summary, str)
    assert len(summary) > 50

def test_summarize_feedbacks_fallback():
    """Test fallback summary without GPT"""
    os.environ.pop("OPENAI_API_KEY", None)
    summary = summarize_feedbacks(SAMPLE_FEEDBACKS)
    print("\nFallback Summary Result:", summary)
    assert isinstance(summary, str)
    assert "Collected 8 feedback items" in summary

# -----------------------
# Labeling Tests
# -----------------------

def test_label_feedbacks_gpt(mock_openai_success):
    """Test GPT-powered labeling"""
    os.environ["OPENAI_API_KEY"] = "sk-test123"
    labeled = label_feedbacks(SAMPLE_FEEDBACKS)
    print("\nGPT Labeling Result:", labeled)
    assert isinstance(labeled, dict)
    assert "bugs" in labeled
    assert len(labeled["bugs"]) >= 2

def test_label_feedbacks_fallback():
    """Test keyword-based fallback labeling"""
    os.environ.pop("OPENAI_API_KEY", None)
    labeled = label_feedbacks(SAMPLE_FEEDBACKS)
    print("\nFallback Labeling Result:", labeled)
    assert isinstance(labeled, dict)
    assert len(labeled["bug"]) >= 2
    assert len(labeled["feature_request"]) >= 1

def test_parse_gpt_labels():
    """Test GPT response parsing for labels"""
    parsed = parse_gpt_labels(GPT_LABELS_RESPONSE)
    print("\nParsed GPT Labels:", parsed)
    assert isinstance(parsed, dict)
    assert "bugs" in parsed
    assert len(parsed["bugs"]) == 2
    assert "performance" in parsed

# -----------------------
# Clustering Tests
# -----------------------

def test_cluster_feedbacks_gpt(mock_openai_success):
    """Test GPT-powered clustering"""
    os.environ["OPENAI_API_KEY"] = "sk-test123"
    clusters = cluster_feedbacks(SAMPLE_FEEDBACKS[:3])  # Small set for GPT
    print("\nGPT Clustering Result:", clusters)
    assert isinstance(clusters, dict)
    assert len(clusters) > 1

def test_cluster_feedbacks_kmeans():
    """Test KMeans fallback clustering"""
    os.environ.pop("OPENAI_API_KEY", None)
    clusters = cluster_feedbacks(SAMPLE_FEEDBACKS)
    print("\nKMeans Clustering Result:", clusters)
    assert isinstance(clusters, dict)
    assert len(clusters) <= 5

def test_parse_gpt_clusters():
    """Test GPT response parsing for clusters"""
    parsed = parse_gpt_clusters(GPT_CLUSTERS_RESPONSE)
    print("\nParsed GPT Clusters:", parsed)
    assert isinstance(parsed, dict)
    assert len(parsed) == 4
    assert any(len(items) >= 2 for items in parsed.values())

# -----------------------
# Edge Cases
# -----------------------

def test_empty_feedback_handling():
    """Test empty input handling across functions"""
    os.environ.pop("OPENAI_API_KEY", None)
    
    empty_summary = summarize_feedbacks([])
    print("\nEmpty Feedback Summary:", empty_summary)
    assert "Collected 0 feedback items" in empty_summary
    
    empty_labels = label_feedbacks([])
    print("Empty Feedback Labels:", empty_labels)
    assert all(len(v) == 0 for v in empty_labels.values())
    
    empty_clusters = cluster_feedbacks([])
    print("Empty Feedback Clusters:", empty_clusters)
    assert empty_clusters == {}