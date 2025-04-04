from fastapi import APIRouter, HTTPException, Query
from app.services.chatgpt_service import get_career_recommendation

router = APIRouter()

@router.post("/career-recommendation")
async def career_recommendation(
    user_input: str = Query(None, description="사용자 질문 입력"),
    user_id: str = Query(None, description="사용자 ID 기반 추천")
):
    """
    - `user_input`이 제공되면 입력된 텍스트로 ChatGPT 진로 추천 요청
    - `user_id`가 제공되면 DB에서 사용자 정보를 가져와 추천 요청
    """
    try:
        response = await get_career_recommendation(user_input=user_input, user_id=user_id)
        return {"recommendation": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
