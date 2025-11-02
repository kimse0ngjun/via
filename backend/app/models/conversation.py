from pydantic import BaseModel
from datetime import datetime, timezone

# 대화 모델
class ConversationCreate(BaseModel):
    user_id: str
    created_at: datetime = datetime.now(timezone.utc)
    content: str
    is_deleted: bool = False
