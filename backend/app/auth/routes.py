from fastapi import APIRouter, HTTPException, Depends
from app.auth.schemas import UserCreate, UserLogin, Token
from app.auth.utils import create_user, get_user_by_email
from app.core.security import verify_password, create_access_token
from datetime import timedelta

router = APIRouter()

@router.post("/signup", response_model=Token)
async def signup(user: UserCreate):
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    await create_user(user.email, user.password)
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token}

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db_user = await get_user_by_email(user.email)
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=60*24)
    )
    return {"access_token": access_token}
