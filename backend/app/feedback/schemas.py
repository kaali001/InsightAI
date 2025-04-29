from pydantic import BaseModel
from typing import Optional

class FeedbackUpload(BaseModel):
    app_name: Optional[str]
    platform: Optional[str]
