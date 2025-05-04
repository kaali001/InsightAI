from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from pydantic_core import core_schema

class PyObjectId(str):
    @classmethod
    def __get_pydantic_core_schema__(cls, _source_type, _handler):
        return core_schema.chain_schema([
            core_schema.no_info_plain_validator_function(cls.validate),
            core_schema.str_schema()
        ])

    @classmethod
    def validate(cls, v) -> str:
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, str) and ObjectId.is_valid(v):
            return v
        raise ValueError("Invalid ObjectId")

class ProjectBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    google_play_app_id: Optional[str] = None
    app_store_app_id: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectInDB(ProjectBase):
    id: PyObjectId = Field(alias="_id", default_factory=PyObjectId)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_scraped: Optional[datetime] = None
    platforms: List[str] = Field(default_factory=list)
    review_count: Optional[int] = 0
    owner_id: str
    
    model_config = ConfigDict(
        populate_by_name=True,
        json_encoders={
            datetime: lambda dt: dt.isoformat(),
        },
        arbitrary_types_allowed=True
    )

    @classmethod
    def from_mongo(cls, data: dict):
        if '_id' in data:
            data['id'] = str(data['_id'])
        return cls(**data)

class ProjectResponse(ProjectInDB):
    pass