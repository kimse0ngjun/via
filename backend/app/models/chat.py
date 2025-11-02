from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatCreate(BaseModel):
    con_id: str
    user_id: str
    user_message: str
    created_at: Optional[datetime] = None
