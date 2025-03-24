# auth.py
from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    password_confirm: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
