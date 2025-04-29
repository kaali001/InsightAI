from app.db.database import db
from app.core.security import hash_password, verify_password
from app.auth.models import User

async def get_user_by_email(email: str):
    return await db.users.find_one({"email": email})

async def create_user(email: str, password: str):
    hashed_pw = hash_password(password)
    user = {"email": email, "hashed_password": hashed_pw}
    result = await db.users.insert_one(user)
    return user
