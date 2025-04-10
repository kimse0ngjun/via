from fastapi import APIRouter, HTTPException
from app.services.chatgpt_service import get_combined_career_recommendation

router = APIRouter(prefix="/recommend", tags=["직업 추천"])

# 메인 추천 API
@router.get("/job-history")
async def recommend_job_from_history(user_id: str):  # user_id로 통일
    result = await get_combined_career_recommendation(user_id)
    if not result:
        raise HTTPException(status_code=404, detail="직업 추천 결과가 없습니다.")
    return result
