import logging
from fastapi import APIRouter, HTTPException, Depends, Request
from app.auth.schemas import UserCreate, UserLogin, Token
from app.auth.utils import create_user, get_user_by_email
from app.core.security import verify_password, create_access_token
from app.core.rate_limiter import limiter
from datetime import timedelta

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/signup", response_model=Token)
@limiter.limit("10/minute")
async def signup(request: Request, user: UserCreate):
    logger.info(f"Signup attempt for email: {user.email}")
    
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        logger.warning(f"Signup failed - email already registered: {user.email}")
        raise HTTPException(status_code=400, detail="Email already registered")
    
    await create_user(user.email, user.password)
    access_token = create_access_token(data={"sub": user.email})
    
    logger.info(f"Signup successful for: {user.email}")
    return {"access_token": access_token}

@router.post("/login", response_model=Token)
@limiter.limit("10/minute")
async def login(request: Request, user: UserLogin):
    logger.info(f"Login attempt for email: {user.email}")
    
    db_user = await get_user_by_email(user.email)
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        logger.warning(f"Login failed - incorrect credentials for: {user.email}")
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=60*24)
    )
    
    logger.info(f"Login successful for: {user.email}")
    return {"access_token": access_token}
