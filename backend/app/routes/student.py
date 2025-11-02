from fastapi import APIRouter, HTTPException
from app.models.student import Student, StudentUpdate
from app.database import students_collection
from bson import ObjectId

router = APIRouter()

# 학생 정보 등록 API
@router.post("/")
async def create_student(student: Student):
    user_id = student.user_id

    existing_student = await students_collection.find_one({"_id": ObjectId(user_id)})
    if existing_student:
        raise HTTPException(status_code=400, detail="이미 등록된 학생입니다.")

    student_data = student.dict()
    student_data["_id"] = ObjectId(user_id) 
    student_data.pop("user_id", None) # 중복 제거

    await students_collection.insert_one(student_data)
    return {"message": "학생 정보가 성공적으로 저장되었습니다."}

# 학생 정보 조회 API
@router.get("/{user_id}")
async def get_student(user_id: str):
    try:
        student = await students_collection.find_one({"_id": ObjectId(user_id)}, {"_id": 0})
    except Exception:
        raise HTTPException(status_code=400, detail="올바르지 않은 user_id입니다.")

    if not student:
        raise HTTPException(status_code=404, detail="해당 학생을 찾을 수 없습니다.")
    return student

# 학생 정보 업데이트 API
@router.patch("/{user_id}")
async def update_student(user_id: str, student_data: StudentUpdate):
    try:
        existing_student = await students_collection.find_one({"_id": ObjectId(user_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="올바르지 않은 user_id입니다.")

    if not existing_student:
        raise HTTPException(status_code=404, detail="해당 학생을 찾을 수 없습니다.")

    update_data = {k: v for k, v in student_data.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="업데이트할 데이터가 없습니다.")

    await students_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    return {"message": "학생 정보가 업데이트되었습니다."}

# 학생 정보 삭제 API
@router.delete("/{user_id}")
async def delete_student(user_id: str):
    try:
        result = await students_collection.delete_one({"_id": ObjectId(user_id)})
    except Exception:
        raise HTTPException(status_code=400, detail="올바르지 않은 user_id입니다.")

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="해당 학생을 찾을 수 없습니다.")
    return {"message": "학생 정보가 삭제되었습니다."}
