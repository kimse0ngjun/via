from fastapi import APIRouter, HTTPException
from app.models.student import Student, StudentUpdate
from app.database import students_collection

router = APIRouter()

# 학생 정보 등록 API
@router.post("/")
async def create_student(student: Student):
    existing_student = await students_collection.find_one({"email": student.email})
    if existing_student:
        raise HTTPException(status_code=400, detail="이미 등록된 학생입니다.")

    student_data = student.dict()
    await students_collection.insert_one(student_data)
    return {"message": "학생 정보가 성공적으로 저장되었습니다."}

# 학생 정보 조회 API
@router.get("/{email}")
async def get_student(email: str):
    student = await students_collection.find_one({"email": email}, {"_id": 0})
    if not student:
        raise HTTPException(status_code=404, detail="해당 학생을 찾을 수 없습니다.")
    return student

# 학생 정보 업데이트 API
@router.patch("/{email}")
async def update_student(email: str, student_data: StudentUpdate):
    existing_student = await students_collection.find_one({"email": email})
    if not existing_student:
        raise HTTPException(status_code=404, detail="해당 학생을 찾을 수 없습니다.")

    update_data = {k: v for k, v in student_data.dict().items() if v is not None}

    if not update_data:
        raise HTTPException(status_code=400, detail="업데이트할 데이터가 없습니다.")

    await students_collection.update_one({"email": email}, {"$set": update_data})
    return {"message": "학생 정보가 업데이트되었습니다."}

# 학생 정보 삭제 API
@router.delete("/{email}")
async def delete_student(email: str):
    result = await students_collection.delete_one({"email": email})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="해당 학생을 찾을 수 없습니다.")
    return {"message": "학생 정보가 삭제되었습니다."}
