import httpx
import os
import logging
from fastapi import APIRouter, HTTPException, Depends, status, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId
from datetime import datetime
from app.database import users_collection, get_user_by_email
from app.models.auth import RegisterRequest, LoginRequest, PasswordResetRequest, PasswordResetConfirm
from app.utils.security import (
    hash_password, verify_password, create_jwt_token, verify_jwt_token,
    create_reset_token, send_reset_email, verify_reset_token
)

# 환경 변수 설정
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
KAKAO_CLIENT_ID = os.getenv("KAKAO_CLIENT_ID")
KAKAO_CLIENT_SECRET = os.getenv("KAKAO_CLIENT_SECRET")
KAKAO_REDIRECT_URI = os.getenv("KAKAO_REDIRECT_URI")
NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")
NAVER_REDIRECT_URI = os.getenv("NAVER_REDIRECT_URI")

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 회원가입 API    
@router.post("/register")
async def register_user(data: RegisterRequest):
    if data.password != data.password_confirm:
        raise HTTPException(status_code=400, detail="비밀번호가 일치하지 않습니다.")

    existing_user = await users_collection.find_one({"email": data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 가입된 이메일입니다.")

    user_id = ObjectId() 
    hashed_password = hash_password(data.password)

    new_user = {
        "_id": user_id,
        "name": data.name,
        "age": data.age,
        "email": data.email,
        "hashed_password": hashed_password,
        "provider": "local",
    }

    await users_collection.insert_one(new_user)

    return {
        "message": "회원가입이 완료되었습니다.",
        "user_id": str(user_id) 
    }

# 로그인 API (user_id 포함)
@router.post("/login")
async def login_user(data: LoginRequest):
    user = await users_collection.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="잘못된 이메일 또는 비밀번호입니다.")

    user_id = str(user["_id"])
    token = create_jwt_token({"sub": user_id, "user_id": user_id})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_id": user_id,
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }

@router.get("/status")
async def get_login_status(token: str = Depends(oauth2_scheme)):
    payload = verify_jwt_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="토큰이 만료되었습니다.")

    user = await users_collection.find_one({"_id": ObjectId(payload["user_id"])})
    if user is None:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    return {"status": "success", "user": {"name": user["name"], "email": user["email"]}}

# 비밀번호 재설정 요청
@router.post("/password-reset-request")
async def password_reset_request(request: PasswordResetRequest, background_tasks: BackgroundTasks):
    email = request.email
    user = await get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    token = create_reset_token(email)
    expiration_time = datetime.utcnow()
    await users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"reset_token": token, "reset_token_expiration": expiration_time}}
    )

    background_tasks.add_task(send_reset_email, email, token)
    return {"message": "비밀번호 재설정 이메일을 보냈습니다."}

@router.post("/reset-password")
async def reset_password(request: PasswordResetConfirm):
    payload = verify_jwt_token(request.token)
    if not payload:
        raise HTTPException(status_code=400, detail="유효하지 않거나 만료된 토큰입니다.")

    email = payload["email"]
    user = await get_user_by_email(email)
    if not user or user.get("reset_token") != request.token:
        raise HTTPException(status_code=400, detail="유효하지 않은 요청입니다.")

    hashed_password = hash_password(request.new_password)
    await users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"hashed_password": hashed_password}, "$unset": {"reset_token": "", "reset_token_expiration": ""}}
    )

    new_token = create_jwt_token({"sub": str(user["_id"]), "user_id": str(user["_id"])})
    return {"message": "비밀번호가 변경되었습니다.", "access_token": new_token, "token_type": "bearer"}

# 소셜 로그인 - Google
@router.get("/google")
async def google_login():
    return {
        "login_url": f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=openid%20email%20profile"
    }

@router.get("/google/callback")
async def google_callback(code: str):
    token_url = "https://oauth2.googleapis.com/token"
    payload = {
        "code": code, "client_id": GOOGLE_CLIENT_ID, "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI, "grant_type": "authorization_code"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="구글 인증 실패")

    access_token = response.json().get("access_token")
    async with httpx.AsyncClient() as client:
        user_info = await client.get("https://www.googleapis.com/oauth2/v2/userinfo", headers={"Authorization": f"Bearer {access_token}"})
    user_info = user_info.json()
    user = await users_collection.find_one({"email": user_info["email"]}) or {
        "name": user_info["name"], "email": user_info["email"], "provider": "google"
    }
    if "_id" not in user:
        await users_collection.insert_one(user)

    token = create_jwt_token({"sub": str(user["_id"]), "user_id": str(user["_id"])})
    return {"access_token": token, "user": {"name": user["name"], "email": user["email"]}}

# 소셜 로그인 - Kakao
@router.get("/kakao")
async def kakao_login():
    return {
        "login_url": f"https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={KAKAO_CLIENT_ID}&redirect_uri={KAKAO_REDIRECT_URI}"
    }

@router.get("/kakao/callback")
async def kakao_callback(code: str):
    token_url = "https://kauth.kakao.com/oauth/token"
    payload = {
        "grant_type": "authorization_code", "client_id": KAKAO_CLIENT_ID,
        "client_secret": KAKAO_CLIENT_SECRET, "redirect_uri": KAKAO_REDIRECT_URI, "code": code
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="카카오 인증 실패")

    access_token = response.json().get("access_token")
    async with httpx.AsyncClient() as client:
        user_info = await client.get("https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
    user_info = user_info.json()
    email = user_info["kakao_account"]["email"]
    user = await users_collection.find_one({"email": email}) or {
        "name": user_info["properties"]["nickname"], "email": email, "provider": "kakao"
    }
    if "_id" not in user:
        await users_collection.insert_one(user)

    token = create_jwt_token({"sub": str(user["_id"]), "user_id": str(user["_id"])})
    return {"access_token": token, "user": {"name": user["name"], "email": user["email"]}}
