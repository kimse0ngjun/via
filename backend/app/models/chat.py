from pydantic import BaseModel
from datetime import datetime, timezone

class ChatCreate(BaseModel):
    con_id: str
    user_message: str
    gpt_reply: str
    created_at: datetime = datetime.now(timezone.utc)
