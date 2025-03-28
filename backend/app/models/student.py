from pydantic import BaseModel, EmailStr
from typing import List

# 학생 모델
class Student(BaseModel):
    user_id: str
    age: int
    gender: str
    email: EmailStr
    grade: str
    major: str
    certifications: List[str]
    interest: str
    role: str
    # target_company: str
    # save_history: bool = True
    # interest_IT: str
    # job: str