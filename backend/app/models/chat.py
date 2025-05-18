from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter()

class ChatCreate(BaseModel):
    user_message: str
    con_id: str
    email: str
    created_at: Optional[datetime] = None

@router.post("/")  # 여기서 "/"는 "/api/chat"으로 확장됨
async def chat_endpoint(payload: ChatCreate):
    reply = f"'{payload.user_message}'에 대한 답변입니다."
    return {"reply": reply}
