from fastapi import APIRouter, HTTPException
from app.database import students_collection, users_collection
from app.models.mypage import MyPageResponse, MyPageUpdateRequest
from bson.objectid import ObjectId
from pydantic import BaseModel

router = APIRouter()

# 마이페이지 조회 API
@router.get("/{email}", response_model=MyPageResponse)
async def get_mypage(email: str):
    email = email.strip().lower()

    # 사용자 정보 조회
    user = await users_collection.find_one({"email": email}, {"_id": 0, "name": 1, "age": 1})
    if not user:
        raise HTTPException(status_code=404, detail=f"사용자를 찾을 수 없습니다. 이메일: {email}")

    # 학생 정보 조회
    student = await students_collection.find_one({"email": email}, {"_id": 0, "grade": 1, "major": 1, "certifications": 1})
    if not student:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    return MyPageResponse(
        name=user["name"],
        age=user["age"],
        grade=student["grade"] if student else None,
        major=student["major"] if student else None,
        certifications=student["certifications"] if student else []
    )


# 마이페이지 정보 수정 API
@router.put("/{email}", response_model=MyPageResponse)
async def update_mypage(email: str, update_data: MyPageUpdateRequest):
    email = email.strip().lower()

    # 사용자 정보 업데이트
    user_update = {key: value for key, value in update_data.dict(exclude_unset=True).items() if value is not None}
    if user_update:
        update_user_result = await users_collection.update_one({"email": email}, {"$set": user_update})
        if update_user_result.matched_count == 0:
            raise HTTPException(status_code=404, detail=f"사용자를 찾을 수 없습니다. 이메일: {email}")

    # 학생 정보 업데이트
    student_update = {key: value for key, value in update_data.dict(exclude_unset=True).items() if value is not None and key in ["grade", "major", "certifications"]}
    if student_update:
        update_student_result = await students_collection.update_one({"email": email}, {"$set": student_update})
        if update_student_result.matched_count == 0:
            raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    user = await users_collection.find_one({"email": email}, {"_id": 0, "name": 1, "age": 1})
    student = await students_collection.find_one({"email": email}, {"_id": 0, "grade": 1, "major": 1, "certifications": 1})

    return MyPageResponse(
        name=user["name"],
        age=user["age"],
        grade=student["grade"] if student else None,
        major=student["major"] if student else None,
        certifications=student["certifications"] if student else []
    )