from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class User(BaseModel):
    id: Optional[str]
    email: EmailStr
    hashed_password: str
