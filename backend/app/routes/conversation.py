from fastapi import APIRouter, HTTPException, Query
from typing import List
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


# 대화 목록 조회 API 
@router.get("/", response_model=List[ConversationCreate])
async def get_conversations(user_id: str = Query(...)):
    conversations = await db.conversations.find({
        "user_id": user_id,
        "is_deleted": False
    }).to_list(100)

    if not conversations:
        return []

    return conversations


# 대화 삭제 API
@router.delete("/{con_id}")
async def delete_conversation(con_id: str):
    result = await db.conversations.update_one({"_id": con_id}, {"$set": {"is_deleted": True}})
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="대화를 찾을 수 없습니다.")
    
    return {"message": "대화가 삭제되었습니다."}
