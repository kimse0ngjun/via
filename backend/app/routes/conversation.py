from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.conversation import ConversationCreate

router = APIRouter()

# 대화 생성 API
@router.post("/")
async def create_conversation(conversation: ConversationCreate):
    conv_data = conversation.dict()
    conv_data["_id"] = f"conv_{conversation.user_id}_{int(conversation.created_at.timestamp())}"
    
    await db.conversations.insert_one(conv_data)
    return {"message": "대화가 생성되었습니다.", "con_id": conv_data["_id"]}

# 대화 삭제 API
@router.delete("/{con_id}")
async def delete_conversation(con_id: str):
    result = await db.conversations.update_one({"_id": con_id}, {"$set": {"is_deleted": True}})
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="대화를 찾을 수 없습니다.")
    
    return {"message": "대화가 삭제되었습니다."}
