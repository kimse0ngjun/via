import openai
from fastapi import APIRouter
from database import db
from models import ChatCreate
from app.core.config import settings
import uuid

router = APIRouter()

openai.api_key = settings.OPENAI_API_KEY

@router.post("/chat")
async def chat_with_gpt(chat_data: ChatCreate):
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": chat_data.user_message}]
    )

    gpt_reply = response["choices"][0]["message"]["content"]
    
    chat_entry = {
        "_id": str(uuid.uuid4()),
        "con_id": chat_data.con_id,
        "user_message": chat_data.user_message,
        "gpt_reply": gpt_reply,
        "created_at": chat_data.created_at
    }

    await db.chats.insert_one(chat_entry)
    
    return {"reply": gpt_reply}
