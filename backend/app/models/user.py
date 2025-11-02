from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# 사용자 모델
class user(BaseModel):
    id: Optional[str] = None 
    name: str = Field(..., min_length=2, max_length=50) 
    email: EmailStr 
    hashed_password: str 
    provider: str = "local"  
    social_id: Optional[str] = None  

    class Config:
        orm_mode = True