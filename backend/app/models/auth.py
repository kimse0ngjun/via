# auth.py
from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    name: str
    age: int
    email: EmailStr
    password: str
    password_confirm: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class PasswordResetRequest(BaseModel):
    name: str
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str