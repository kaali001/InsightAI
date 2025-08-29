import asyncio
from fastapi import APIRouter, UploadFile, File, HTTPException, Query
from fastapi.responses import JSONResponse


# import traceback
from app.feedback.services import save_feedbacks_from_csv
from typing import Optional
from datetime import datetime

from app.utils.scraper import fetch_all_reviews
from app.utils.nlp import cluster_feedbacks, summarize_feedbacks, label_feedbacks, analyze_sentiment

# router = APIRouter(prefix="/feedbacks", tags=["Feedbacks"])
router = APIRouter()

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="File must be a CSV")
    
    contents = await file.read()
    with open("temp.csv", "wb") as f:
        f.write(contents)

    count = await save_feedbacks_from_csv("temp.csv")
    return {"message": f"Successfully uploaded {count} feedback entries"}


# app/feedbacks/routes.py


@router.get("/fetch-analyze")
async def fetch_and_analyze_feedbacks(
    google_play_app_id: Optional[str] = Query(None, description="Google Play App ID"),
    app_store_app_name: Optional[str] = Query(None, description="App Store App Name"),
    app_store_app_id: Optional[str] = Query(None, description="App Store App ID"),
    mode: str = Query("weekly", enum=["daily", "weekly", "monthly"], description="Feedback timeframe")
):
    """
    Fetch app feedbacks and perform clustering, summarization, and labeling.
    """
    if not google_play_app_id and not (app_store_app_name and app_store_app_id):
        raise HTTPException(status_code=400, detail="At least one app identifier must be provided.")

    # Set days based on mode
    if mode == "daily":
        days = 1
    elif mode == "weekly":
        days = 7
    elif mode == "monthly":
        days = 30
    else:
        days = None

    # Step 1: Fetch reviews
    reviews = await fetch_all_reviews(
        google_play_app_id=google_play_app_id,
        # app_store_app_name=app_store_app_name,
        app_store_app_id=app_store_app_id,
        days=days
    )
    # print("reviews:",reviews[0:5])
    if not reviews:
        raise HTTPException(status_code=404, detail="No feedbacks found.")

    
    texts = [review["content"] for review in reviews]


  # sentiment analysis
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

    return {
        "timestamp": datetime.utcnow(),
        "total_feedbacks": len(reviews),
        "summary": summary,
        "clusters": clusters,
        "labeled_feedbacks": reviews,
        "sentiment": sentiment 
    }
