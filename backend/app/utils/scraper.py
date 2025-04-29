# app/utils/scraper.py

import datetime
from typing import List, Optional
import asyncio

from google_play_scraper import reviews as gp_reviews, Sort as GP_Sort
from app_store_web_scraper import AppStoreEntry

# -----------------------
# Google Play Scraper
# -----------------------

async def fetch_google_play_reviews(
    app_id: str,
    days: Optional[int] = None
) -> List[dict]:
    """
    Fetch recent reviews from Google Play for a given app.
    days = number of past days to fetch (None = all available)
    """
    all_reviews = []
    try:
        # Using 'newest' sort to prioritize fresh reviews
        result, _ = gp_reviews(
            app_id,
            lang="en",
            country="us",
            sort=GP_Sort.NEWEST,
            count=200  # max per request
        )

        cutoff_date = None
        if days:
            cutoff_date = datetime.datetime.now() - datetime.timedelta(days=days)

        for r in result:
            review_date = r["at"]
            if not cutoff_date or review_date >= cutoff_date:
                all_reviews.append({
                    "content": r["content"],
                    "score": r["score"],
                    "date": review_date,
                    "platform": "google_play",
                })
    except Exception as e:
        print(f"Error fetching Google Play reviews: {e}")

    return all_reviews


# -----------------------
# App Store Scraper
# -----------------------

async def fetch_app_store_reviews(
    app_id: str,
    days: Optional[int] = None,
    country: str = "us"
) -> List[dict]:
    """
    Fetch recent reviews from iOS App Store.
    days = number of past days to fetch (None = all available)
    """
    all_reviews = []
    try:
        app = AppStoreEntry(app_id=app_id, country=country)
        reviews = app.get_reviews()

        cutoff_date = None
        if days:
            cutoff_date = datetime.datetime.now() - datetime.timedelta(days=days)

        for r in reviews:
            review_date = datetime.datetime.fromisoformat(r["date"])
            if not cutoff_date or review_date >= cutoff_date:
                all_reviews.append({
                    "content": r["review"],
                    "score": r["rating"],
                    "date": review_date,
                    "platform": "app_store",
                })
    except Exception as e:
        print(f"Error fetching App Store reviews: {e}")

    return all_reviews

# -----------------------
# Combined Fetch
# -----------------------

async def fetch_all_reviews(
    google_play_app_id: Optional[str] = None,
    app_store_app_id: Optional[str] = None,
    days: Optional[int] = None
) -> List[dict]:
    """
    Fetch reviews from Google Play and/or App Store.
    If both provided, will fetch both.
    """
    tasks = []

    if google_play_app_id:
        tasks.append(fetch_google_play_reviews(google_play_app_id, days))

    if app_store_app_id:
        tasks.append(fetch_app_store_reviews(app_store_app_id, days))

    results = await asyncio.gather(*tasks)

    reviews = []
    for res in results:
        reviews.extend(res)

    return reviews