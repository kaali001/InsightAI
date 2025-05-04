from typing import List
from app.project.schema import ProjectCreate, ProjectInDB
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime, timezone
import logging

logger = logging.getLogger(__name__)
PROJECTS_COLLECTION = "projects"

async def create_project(db: AsyncIOMotorDatabase, project_data: ProjectCreate, owner_id: str) -> ProjectInDB:
    new_project = {
        **project_data.model_dump(),
        "owner_id": owner_id,
        "created_at": datetime.now(timezone.utc),
        "platforms": []
    }
    
    if project_data.google_play_app_id:
        new_project["platforms"].append("google_play")
    if project_data.app_store_app_id:
        new_project["platforms"].append("app_store")

    try:
        result = await db[PROJECTS_COLLECTION].insert_one(new_project)
        new_project["_id"] = result.inserted_id
        return ProjectInDB.from_mongo(new_project)
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise RuntimeError("Failed to create project.")

async def get_all_projects(db: AsyncIOMotorDatabase, owner_id: str) -> List[ProjectInDB]:
    try:
        projects_cursor = db[PROJECTS_COLLECTION].find({"owner_id": owner_id})
        return [
            ProjectInDB.from_mongo({**project, "_id": str(project["_id"])})
            async for project in projects_cursor
        ]
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise RuntimeError("Failed to fetch projects.")