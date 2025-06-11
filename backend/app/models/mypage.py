from pydantic import BaseModel
from typing import List, Optional

# 마이페이지 업데이트 모델
class MyPageUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    birthdate: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    major: Optional[str] = None
    grade: Optional[float] = None
    interests: Optional[List[str]] = None
    introduction: Optional[str] = None
    certifications: Optional[List[str]] = None

# 마이페이지 생성 모델델
class MyPageCreateRequest(BaseModel):
    name: str
    email: str
    phone_number: Optional[str] = None
    address: Optional[str] = None
    birthdate: Optional[str] = None  
    age: Optional[int] = None
    gender: Optional[str] = None
    major: Optional[str] = None
    grade: Optional[float] = None
    interests: Optional[List[str]] = []
    introduction: Optional[str] = None
    certifications: Optional[List[str]] = []

# 마이페이지 응답 모델
class MyPageResponse(BaseModel):
    name: str
    email: str
    phone_number: Optional[str]
    address: Optional[str]
    birthdate: Optional[str]
    age: Optional[int]
    gender: Optional[str]
    major: Optional[str]
    grade: Optional[float]
    interests: Optional[List[str]]
    introduction: Optional[str]
    certifications: Optional[List[str]]