# tests/test_scraper.py
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

import pytest
import datetime
import asyncio

from app.utils.scraper import (
    fetch_google_play_reviews,
    fetch_app_store_reviews,
    fetch_all_reviews
)

# Sample valid app identifiers
VALID_GP_APP_ID = "com.instagram.android"
VALID_IOS_APP_ID = "389801252"  # Instagram

# -----------------------
# Google Play Tests
# -----------------------

@pytest.mark.asyncio
async def test_fetch_google_play_reviews_returns_data():
    reviews = await fetch_google_play_reviews(VALID_GP_APP_ID, days=7)
    print("\nGoogle Play Reviews:", reviews)  # Print all reviews
    assert isinstance(reviews, list)
    if reviews:
        assert "content" in reviews[0]
        assert "score" in reviews[0]
        assert "date" in reviews[0]
        assert "platform" in reviews[0]
        assert reviews[0]["platform"] == "google_play"


@pytest.mark.asyncio
async def test_fetch_google_play_reviews_with_invalid_id():
    reviews = await fetch_google_play_reviews("invalid.app.id.123456", days=7)
    print("\nGoogle Play Reviews (Invalid ID):", reviews)  # Print empty list
    assert isinstance(reviews, list)
    assert len(reviews) == 0


# -----------------------
# App Store Tests
# -----------------------

@pytest.mark.asyncio
async def test_fetch_app_store_reviews_returns_data():
    reviews = await fetch_app_store_reviews(VALID_IOS_APP_ID, days=7)
    print("\nApp Store Reviews:", reviews)  # Print all reviews
    assert isinstance(reviews, list)
    if reviews:
        assert "content" in reviews[0]
        assert "score" in reviews[0]
        assert "date" in reviews[0]
        assert "platform" in reviews[0]
        assert reviews[0]["platform"] == "app_store"


@pytest.mark.asyncio
async def test_fetch_app_store_reviews_with_invalid_id():
    reviews = await fetch_app_store_reviews("000000000", days=7)
    print("\nApp Store Reviews (Invalid ID):", reviews)  # Print empty list
    assert isinstance(reviews, list)
    assert len(reviews) == 0


# -----------------------
# Combined Fetch Test
# -----------------------

@pytest.mark.asyncio
async def test_fetch_all_reviews_combined():
    reviews = await fetch_all_reviews(
        google_play_app_id=VALID_GP_APP_ID,
        app_store_app_id=VALID_IOS_APP_ID,
        days=7
    )
    print("\nAll Combined Reviews:", reviews)  # Print combined reviews
    assert isinstance(reviews, list)
    if reviews:
        platforms = {r["platform"] for r in reviews}
        assert "google_play" in platforms or "app_store" in platforms