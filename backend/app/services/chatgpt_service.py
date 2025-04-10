# chatgpt_service.py
from app.database import chat_collection
from utils.careernet_api import get_job_info_by_keyword 

async def get_careernet_recommendation(user_id: str):
    recent_chats = await chat_collection.find({"user_id": user_id}).sort("timestamp", -1).limit(3).to_list(length=3)
    
    if not recent_chats:
        return "최근 대화 기록이 없습니다."

    keywords = []
    for chat in recent_chats:
        keywords.append(chat.get("user_message", ""))
        keywords.append(chat.get("gpt_reply", ""))

    results = []
    for keyword in keywords:
        job_info = await get_job_info_by_keyword(keyword)
        if job_info:
            results.append(job_info)

    if not results:
        return "관련된 진로 정보를 찾지 못했습니다."
    
    return results