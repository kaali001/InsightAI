from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.project.schema import ProjectCreate, ProjectResponse
from app.project import crud
from app.db.database import get_database
from app.core.security import get_current_user_from_token as get_current_user # user must be authenticated

router = APIRouter()

@router.post("/create", response_model=ProjectResponse)
async def create_project(
    project: ProjectCreate,
    db=Depends(get_database),
    current_user: dict = Depends(get_current_user),
):
    try:
        return await crud.create_project(
            db, 
            project_data=project,
            owner_id=str(current_user["id"])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all", response_model=List[ProjectResponse])
async def fetch_projects(
    db=Depends(get_database),
    current_user: dict = Depends(get_current_user),
):
    try:
        return await crud.get_all_projects(db, current_user["id"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
