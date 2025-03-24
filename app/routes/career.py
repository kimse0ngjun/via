# 진로 추천 API
from fastapi import APIRouter, HTTPException
from app.services.chatgpt_service import get_career_recommendation
from app.models.schemas import CareerRequest, CareerResponse

router = APIRouter()

@router.post("/career-recommendation", response_model=CareerResponse)
async def career_recommendation(request: CareerRequest):
    try:
        response = await get_career_recommendation(request.user_input)
        return {"recommendation": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    