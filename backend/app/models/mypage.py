from pydantic import BaseModel
from typing import List, Optional

# 마이페이지 응답 모델
class MyPageResponse(BaseModel):
    name: str
    age: int
    grade: Optional[str] = None
    major: Optional[str] = None
    certifications: Optional[list] = None

class MyPageUpdateRequest(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    grade: Optional[str] = None
    major: Optional[str] = None
    certifications: Optional[list] = None
