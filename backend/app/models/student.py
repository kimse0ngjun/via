from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime

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

# 흥미 모델
class Interest(BaseModel):
    user_id: str
    job_category: str
    study_field: str
    personal_values: str
    tech_stack: List[str]
    target_company: str

# 상담기록 모델
class Consultation(BaseModel):
    user_id: str
    date: datetime
    interest: str
    career_goal: str
    consult_purpose: str
    consult_content: str

    # target_company: str
    # save_history: bool = True
    # interest_IT: str
    # job: str