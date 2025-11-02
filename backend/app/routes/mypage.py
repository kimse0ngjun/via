from fastapi import APIRouter, HTTPException
from app.database import students_collection, users_collection
from app.models.mypage import MyPageResponse, MyPageUpdateRequest, MyPageCreateRequest
from bson.objectid import ObjectId

router = APIRouter()

# 마이페이지 생성
@router.post("/", response_model=MyPageResponse)
async def create_mypage(data: MyPageCreateRequest):
    email = data.email.strip().lower()
    
    existing_user = await users_collection.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 존재하는 이메일입니다.")

    user_doc = {
        "name": data.name,
        "email": email,
        "phone_number": data.phone_number,
        "address": data.address,
        "birthdate": data.birthdate,
        "age": data.age,
        "gender": data.gender,
    }
    user_result = await users_collection.insert_one(user_doc)
    user_id = user_result.inserted_id

    student_doc = {
        "user_id": user_id,
        "subject": data.major,
        "grade": data.grade,
        "interests": data.interests or [],
        "introduction": data.introduction,
        "certifications": data.certifications or [],
    }
    await students_collection.insert_one(student_doc)

    return await get_mypage(str(user_id))

# 마이페이지 조회
@router.get("/{user_id}", response_model=MyPageResponse)
async def get_mypage(user_id: str):
    try:
        oid = ObjectId(user_id)
    except:
        raise HTTPException(status_code=400, detail="유효하지 않은 user_id입니다.")

    # 사용자 정보 조회
    user = await users_collection.find_one(
        {"_id": oid},
        {"_id": 0, "name": 1, "email": 1, "phone_number": 1, "address": 1,
         "birthdate": 1, "age": 1, "gender": 1}
    )
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    # 학생 정보 조회
    student = await students_collection.find_one(
        {"user_id": oid},
        {"_id": 0, "subject": 1, "grade": 1, "interests": 1,
         "introduction": 1, "certifications": 1}
    )

    # 없으면 자동으로 기본 문서 삽입
    if not student:
        default_student = {
            "user_id": oid,
            "subject": "",
            "grade": "",
            "interests": [],
            "introduction": "",
            "certifications": []
        }
        await students_collection.insert_one(default_student)
        student = default_student

    return MyPageResponse(
        name=user["name"],
        email=user["email"],
        phone_number=user.get("phone_number"),
        address=user.get("address"),
        birthdate=user.get("birthdate"),
        age=user.get("age"),
        gender=user.get("gender"),
        major=student.get("subject", ""),
        grade=student.get("grade", ""),
        interests=student.get("interests", []),
        introduction=student.get("introduction", ""),
        certifications=student.get("certifications", [])
    )

# 마이페이지 수정
@router.put("/{user_id}", response_model=MyPageResponse)
async def update_mypage(user_id: str, update_data: MyPageUpdateRequest):
    try:
        oid = ObjectId(user_id)
    except:
        raise HTTPException(status_code=400, detail="유효하지 않은 user_id입니다.")

    user_fields = ["name", "age", "phone_number", "address", "birthdate", "gender"]
    update_dict = update_data.dict(exclude_unset=True)

    user_update = {
        key: value for key, value in update_dict.items()
        if key in user_fields
    }
    if user_update:
        result = await users_collection.update_one({"_id": oid}, {"$set": user_update})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    student_update = {}
    for key in ["major", "grade", "interests", "introduction", "certifications"]:
        if key in update_dict:
            value = update_dict[key]
            if key == "grade":
                if value == "":
                    value = None
                else:
                    try:
                        value = float(value)
                    except ValueError:
                        value = None
                student_update["grade"] = value
            elif key == "major":
                student_update["subject"] = value
            else:
                student_update[key] = value

    if student_update:
        await students_collection.update_one(
            {"user_id": oid},
            {"$set": student_update},
            upsert=True
        )

    return await get_mypage(user_id)

# 공통 함수: user_id → ObjectId 변환
def validate_object_id(user_id: str) -> ObjectId:
    try:
        return ObjectId(user_id)
    except:
        raise HTTPException(status_code=400, detail="유효하지 않은 user_id입니다.")

# 전체 마이페이지 삭제 (User + Student)
@router.delete("/{user_id}")
async def delete_mypage(user_id: str):
    oid = validate_object_id(user_id)

    user_result = await users_collection.delete_one({"_id": oid})
    student_result = await students_collection.delete_one({"user_id": oid})

    if user_result.deleted_count == 0 and student_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"삭제할 데이터가 없습니다. user_id: {user_id}")

    return {"message": f"{user_id}의 마이페이지 정보가 삭제되었습니다."}


# 사용자 정보만 삭제
@router.delete("/user/{user_id}")
async def delete_user_info(user_id: str):
    oid = validate_object_id(user_id)

    result = await users_collection.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"사용자 정보를 찾을 수 없습니다. user_id: {user_id}")

    return {"message": f"{user_id}의 사용자 정보가 삭제되었습니다."}


# 학생 정보만 삭제
@router.delete("/student/{user_id}")
async def delete_student_info(user_id: str):
    oid = validate_object_id(user_id)

    result = await students_collection.delete_one({"user_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. user_id: {user_id}")

    return {"message": f"{user_id}의 학생 정보가 삭제되었습니다."}


# 흥미 초기화
@router.put("/student/{user_id}/clear-interests")
async def clear_interests(user_id: str):
    oid = validate_object_id(user_id)

    result = await students_collection.update_one(
        {"user_id": oid},
        {"$set": {"interests": []}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. user_id: {user_id}")

    return {"message": f"{user_id}의 관심분야가 삭제(초기화)되었습니다."}


# 자격증 초기화
@router.put("/student/{user_id}/clear-certifications")
async def clear_certifications(user_id: str):
    oid = validate_object_id(user_id)

    result = await students_collection.update_one(
        {"user_id": oid},
        {"$set": {"certifications": []}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. user_id: {user_id}")

    return {"message": f"{user_id}의 자격증 정보가 삭제(초기화)되었습니다."}


# 흥미 + 자격증 모두 초기화
@router.put("/student/{user_id}/clear-interests-and-certifications")
async def clear_interests_and_certifications(user_id: str):
    oid = validate_object_id(user_id)

    result = await students_collection.update_one(
        {"user_id": oid},
        {"$set": {"interests": [], "certifications": []}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail=f"학생 정보를 찾을 수 없습니다. user_id: {user_id}")

    return {"message": f"{user_id}의 관심분야와 자격증이 모두 삭제(초기화)되었습니다."}
