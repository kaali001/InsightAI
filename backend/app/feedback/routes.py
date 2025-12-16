import asyncio
import logging
from fastapi import APIRouter, UploadFile, File, HTTPException, Query, Request
from fastapi.responses import JSONResponse

from app.feedback.services import save_feedbacks_from_csv
from app.core.rate_limiter import limiter
from app.core.validators import validate_app_ids
from typing import Optional
from datetime import datetime, timezone

from app.utils.scraper import fetch_all_reviews
from app.utils.nlp import cluster_feedbacks, summarize_feedbacks, label_feedbacks, analyze_sentiment

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/upload-csv")
@limiter.limit("20/minute")
async def upload_csv(request: Request, file: UploadFile = File(...)):
    import tempfile
    import os
    
    logger.info(f"CSV upload started: {file.filename}")
    
    if not file.filename.endswith(".csv"):
        logger.warning(f"Invalid file type uploaded: {file.filename}")
        raise HTTPException(status_code=400, detail="File must be a CSV")
    
    contents = await file.read()
    
    # Use temp file that auto-deletes
    with tempfile.NamedTemporaryFile(mode="wb", suffix=".csv", delete=False) as tmp:
        tmp.write(contents)
        tmp_path = tmp.name
    
    try:
        count = await save_feedbacks_from_csv(tmp_path)
        logger.info(f"CSV upload successful: {count} entries from {file.filename}")
        return {"message": f"Successfully uploaded {count} feedback entries"}
    except Exception as e:
        logger.error(f"CSV upload failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to process CSV file")
    finally:
        os.unlink(tmp_path)  # Clean up temp file


@router.get("/fetch-analyze")
@limiter.limit("5/minute")
async def fetch_and_analyze_feedbacks(
    request: Request,
    google_play_app_id: Optional[str] = Query(None, description="Google Play App ID"),
    app_store_app_name: Optional[str] = Query(None, description="App Store App Name"),
    app_store_app_id: Optional[str] = Query(None, description="App Store App ID"),
    mode: str = Query("weekly", enum=["daily", "weekly", "monthly"], description="Feedback timeframe")
):
    """
    Fetch app feedbacks and perform clustering, summarization, and labeling.
    """
    logger.info(f"Analysis request: GP={google_play_app_id}, iOS={app_store_app_id}, mode={mode}")
    
    # Validate app IDs
    validate_app_ids(google_play_app_id, app_store_app_id)

    # Set days based on mode
    days_map = {"daily": 1, "weekly": 7, "monthly": 30}
    days = days_map.get(mode)

    # Step 1: Fetch reviews
    logger.info(f"Fetching reviews for last {days} days...")
    reviews = await fetch_all_reviews(
        google_play_app_id=google_play_app_id,
        app_store_app_id=app_store_app_id,
        days=days
    )
    
    if not reviews:
        logger.warning(f"No feedbacks found for GP={google_play_app_id}, iOS={app_store_app_id}")
        raise HTTPException(status_code=404, detail="No feedbacks found.")

    logger.info(f"Fetched {len(reviews)} reviews, starting analysis...")
    
    texts = [review["content"] for review in reviews]

    # Sentiment analysis
    sentiment = analyze_sentiment(texts)

    # Parallel processing
    summary, labels, clusters = await asyncio.gather(
        summarize_feedbacks(texts),
        label_feedbacks(texts),
        cluster_feedbacks(texts)
    )

    # Attach labels back to reviews
    for idx, label in enumerate(labels):
        reviews[idx]["label"] = label

    logger.info(f"Analysis complete: {len(reviews)} feedbacks processed")
    
    return {
        "timestamp": datetime.now(timezone.utc),
        "total_feedbacks": len(reviews),
        "summary": summary,
        "clusters": clusters,
        "labeled_feedbacks": reviews,
        "sentiment": sentiment 
    }
