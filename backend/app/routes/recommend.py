from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.chatgpt_service import get_careernet_recommendation
from app.models.recommend import JobRecommendation, UserIDRequest

router = APIRouter()

@router.post("/job-history", response_model=List[JobRecommendation])
async def recommend_job_from_history(data: UserIDRequest):
    result = await get_careernet_recommendation(data.user_id)
    if not result:
        raise HTTPException(status_code=404, detail="직업 추천 결과가 없습니다.")
    return result
