from fastapi import APIRouter, HTTPException, Query
from typing import List
from bson import ObjectId
from app.database import db
from app.models.conversation import ConversationCreate

router = APIRouter()

# 대화 생성 API
@router.post("/")
async def create_conversation(convo: ConversationCreate):
    convo_data = {
        "user_id": convo.user_id,
        "created_at": convo.created_at,
        "content": convo.content,
        "is_deleted": convo.is_deleted,
    }
    result = await db.conversations.insert_one(convo_data)
    return {"_id": str(result.inserted_id)} 

# 대화 목록 조회 API
@router.get("/", response_model=List[ConversationCreate])
async def get_conversations(user_id: str = Query(...)):
    conversations = await db.conversations.find({
        "user_id": user_id,
        "is_deleted": False
    }).to_list(100)

    return conversations  

# 대화 삭제 API
@router.delete("/{con_id}")
async def delete_conversation(con_id: str):
    try:
        object_id = ObjectId(con_id)
    except Exception:
        raise HTTPException(status_code=400, detail="잘못된 ID 형식입니다.")

    result = await db.conversations.update_one(
        {"_id": object_id},
        {"$set": {"is_deleted": True}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="대화를 찾을 수 없습니다.")

    return {"message": "대화가 삭제되었습니다."}
