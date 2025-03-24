from pydantic import BaseModel
from typing import List

# 학생 모델
class StudentCreate(BaseModel):
    user_id: str
    age: int
    gender: str
    grade: int
    interest_IT: str
    job: str
    qualifications: List[str]
    interest: str
    target_company: str
    save_history: bool = True
