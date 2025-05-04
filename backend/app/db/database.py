from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGO_URI
from fastapi import Request


client = AsyncIOMotorClient(MONGO_URI)
db = client.insightai_db


async def get_database():
    return db