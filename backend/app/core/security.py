from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from fastapi import Header, HTTPException
from jwt import PyJWTError, decode 
from app.core.config import JWT_SECRET, ALGORITHM


SECRET_KEY = "your_secret_key"  # replace with your actual secret key
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")



def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)



async def get_current_user_from_token(authorization: str = Header(...)) -> dict:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    try:
        payload = decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        user_id = payload.get("sub")  # 'sub' must contain the user ID
        if not user_id:
            raise HTTPException(status_code=401, detail="User ID not found in token")
        return {"id": user_id}
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
