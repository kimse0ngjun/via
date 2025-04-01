from pydantic import BaseModel
from datetime import datetime, timezone
from uuid import uuid4

class ChatCreate(BaseModel):
    con_id: str = str(uuid4())
    email: str
    user_message: str
    created_at: datetime = datetime.now(timezone.utc)
