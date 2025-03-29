import logging
from fastapi import APIRouter, HTTPException
from app.database import students_collection, users_collection
from app.models.student import MyPageResponse
from pydantic import BaseModel

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

router = APIRouter()

# 마이페이지 조회 API
@router.get("/mypage/{email}", response_model=MyPageResponse)
async def get_mypage(email: str):
    email = email.strip().lower()
    logger.debug(f"Processed email: {email}")  # 이메일 처리된 값 로깅

    # 사용자 정보 조회
    user = await users_collection.find_one({"email": email}, {"_id": 0, "name": 1, "age": 1})
    if not user:
        logger.error(f"사용자를 찾을 수 없습니다. 이메일: {email}")
        raise HTTPException(status_code=404, detail=f"사용자를 찾을 수 없습니다. 이메일: {email}")

    # 학생 정보 조회
    student = await students_collection.find_one({"email": email}, {"_id": 0, "grade": 1, "major": 1, "certifications": 1})
    if not student:
        logger.error(f"학생 정보를 찾을 수 없습니다. 이메일: {email}")
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    logger.debug(f"마이페이지 데이터 반환: {user['name']} - {email}")
    return MyPageResponse(
        name=user["name"],
        age=user["age"],
        grade=student["grade"] if student else None,
        major=student["major"] if student else None,
        certifications=student["certifications"] if student else []
    )
