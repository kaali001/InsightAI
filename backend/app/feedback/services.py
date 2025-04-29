import pandas as pd
from app.db.database import db
from typing import List

async def save_feedbacks_from_csv(file_path: str):
    df = pd.read_csv(file_path)
    records = df.to_dict(orient="records")
    if records:
        await db.feedbacks.insert_many(records)
    return len(records)

# Scraping app store comments — Placeholder

