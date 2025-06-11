from fastapi import APIRouter, HTTPException
from app.database import students_collection, users_collection
from app.models.mypage import MyPageResponse, MyPageUpdateRequest, MyPageCreateRequest
from bson.objectid import ObjectId

router = APIRouter()

# 마이페이지 생성, 저장장 API
@router.post("/", response_model=MyPageResponse)
async def create_mypage(data: MyPageCreateRequest):
    email = data.email.strip().lower()

    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 존재하는 이메일입니다.")

    # User 저장
    user_doc = {
        "name": data.name,
        "email": email,
        "phone_number": data.phone_number,
        "address": data.address,
        "birthdate": data.birthdate,
        "age": data.age,
        "gender": data.gender,
    }
    await users_collection.insert_one(user_doc)

    # Student 저장
    student_doc = {
        "email": email,
        "subject": data.major,
        "grade": data.grade,
        "interests": data.interests or [],
        "introduction": data.introduction,
        "certifications": data.certifications or [],
    }
    await students_collection.insert_one(student_doc)

    return await get_mypage(email)


# 마이페이지 조회 API
@router.get("/{email}", response_model=MyPageResponse)
async def get_mypage(email: str):
    email = email.strip().lower()

    # 사용자 정보 조회
    user = await users_collection.find_one(
        {"email": email},
        {"_id": 0, "name": 1, "email": 1, "phone_number": 1, "address": 1,
         "birthdate": 1, "age": 1, "gender": 1}
    )
    if not user:
        raise HTTPException(status_code=404, detail=f"사용자를 찾을 수 없습니다. 이메일: {email}")

    # 학생 정보 조회
    student = await students_collection.find_one(
        {"email": email},
        {"_id": 0, "subject": 1, "grade": 1, "interests": 1,
         "introduction": 1, "certifications": 1}
    )
    if not student:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    return MyPageResponse(
        name=user["name"],
        email=user["email"],
        phone_number=user.get("phone_number"),
        address=user.get("address"),
        birthdate=user.get("birthdate"),
        age=user.get("age"),
        gender=user.get("gender"),
        major=student.get("subject"),
        grade=student.get("grade"),
        interests=student.get("interests", []),
        introduction=student.get("introduction"),
        certifications=student.get("certifications", [])
    )


# 마이페이지 수정 API
@router.put("/{email}", response_model=MyPageResponse)
async def update_mypage(email: str, update_data: MyPageUpdateRequest):
    email = email.strip().lower()

    # 사용자 정보 업데이트
    user_fields = ["name", "age", "phone_number", "address", "birthdate", "gender"]
    user_update = {
        key: value for key, value in update_data.dict(exclude_unset=True).items()
        if key in user_fields
    }
    if user_update:
        user_result = await users_collection.update_one({"email": email}, {"$set": user_update})
        if user_result.matched_count == 0:
            raise HTTPException(status_code=404, detail=f"사용자를 찾을 수 없습니다. 이메일: {email}")

    # 학생 정보 업데이트
    student_fields = ["major", "grade", "interests", "introduction", "certifications"]
    student_update = {
        key if key != "major" else "subject": value
        for key, value in update_data.dict(exclude_unset=True).items()
        if key in student_fields
    }
    if student_update:
        student_result = await students_collection.update_one({"email": email}, {"$set": student_update})
        if student_result.matched_count == 0:
            raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    # 수정 후 결과 반환
    return await get_mypage(email)

# 전체 마이페이지 삭제 (user + student)
@router.delete("/{email}")
async def delete_mypage(email: str):
    email = email.strip().lower()

    user_result = await users_collection.delete_one({"email": email})
    student_result = await students_collection.delete_one({"email": email})

    if user_result.deleted_count == 0 and student_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"삭제할 데이터가 없습니다. 이메일: {email}")

    return {"message": f"{email}의 마이페이지 정보가 삭제되었습니다."}


# 사용자 정보만 삭제
@router.delete("/user/{email}")
async def delete_user_info(email: str):
    email = email.strip().lower()

    result = await users_collection.delete_one({"email": email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"사용자 정보를 찾을 수 없습니다. 이메일: {email}")

    return {"message": f"{email}의 사용자 정보가 삭제되었습니다."}


# 학생 정보만 삭제
@router.delete("/student/{email}")
async def delete_student_info(email: str):
    email = email.strip().lower()

    result = await students_collection.delete_one({"email": email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    return {"message": f"{email}의 학생 정보가 삭제되었습니다."}

# 흥미 삭제 API (학생)
@router.put("/student/{email}/clear-interests")
async def clear_interests(email: str):
    email = email.strip().lower()

    result = await students_collection.update_one(
        {"email": email},
        {"$set": {"interests": []}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    return {"message": f"{email}의 관심분야가 삭제(초기화)되었습니다."}

# 자격증 삭제 API (학생)
@router.put("/student/{email}/clear-certifications")
async def clear_certifications(email: str):
    email = email.strip().lower()

    result = await students_collection.update_one(
        {"email": email},
        {"$set": {"certifications": []}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    return {"message": f"{email}의 자격증 정보가 삭제(초기화)되었습니다."}

# 자격증 + 관심분야 삭제 API
@router.put("/student/{email}/clear-interests-and-certifications")
async def clear_interests_and_certifications(email: str):
    email = email.strip().lower()

    result = await students_collection.update_one(
        {"email": email},
        {"$set": {"interests": [], "certifications": []}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. 이메일: {email}")

    return {"message": f"{email}의 관심분야와 자격증이 모두 삭제(초기화)되었습니다."}
