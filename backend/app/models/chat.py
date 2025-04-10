from pydantic import BaseModel, Field
from datetime import datetime, timezone
from typing import Optional
import uuid

class ChatCreate(BaseModel):
    con_id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    user_message: str
    created_at: datetime = datetime.now(timezone.utc)