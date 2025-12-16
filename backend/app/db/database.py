from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGO_URI
from fastapi import Request
import logging

logger = logging.getLogger(__name__)

# Initialize client with connection settings
client = AsyncIOMotorClient(
    MONGO_URI,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=10000,
    retryWrites=True
)
db = client.insightai_db


async def get_database():
    """Get database instance with connection verification"""
    try:
        # Verify connection is alive
        await client.admin.command('ping')
        return db
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise