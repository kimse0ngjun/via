import httpx
import os
import logging
from fastapi import APIRouter, HTTPException, Depends, status, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.database import users_collection, get_user_by_email
from app.models.auth import RegisterRequest, LoginRequest
from app.utils.security import hash_password, verify_password, create_jwt_token, verify_jwt_token, create_reset_token, send_reset_email, verify_reset_token
from bson import ObjectId
from bson import datetime as bson_datetime
from datetime import datetime
from app.models.auth import PasswordResetRequest, PasswordResetConfirm


# 구글
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

# 카카오
KAKAO_CLIENT_ID = os.getenv("KAKAO_CLIENT_ID")
KAKAO_CLIENT_SECRET = os.getenv("KAKAO_CLIENT_SECRET")
KAKAO_REDIRECT_URI = os.getenv("KAKAO_REDIRECT_URI")

# 네이버
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

    # 이미 존재하는 이메일인지 확인
    existing_user = await users_collection.find_one({"email": data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="이미 가입된 이메일입니다.")

    # 비밀번호 해싱 후 저장
    hashed_password = hash_password(data.password)
    new_user = {
        "name": data.name,
        "age": data.age,
        "email": data.email,
        "hashed_password": hashed_password,
        "provider": "local",
    }
    await users_collection.insert_one(new_user)
    return {"message": "회원가입이 완료되었습니다."}

# 로그인 API
@router.post("/login")
async def login_user(data: LoginRequest):
    user = await users_collection.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="잘못된 이메일 또는 비밀번호입니다.")

    token = create_jwt_token({"sub": str(user["_id"]), "user_id": str(user["_id"])})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"name": user["name"], "email": user["email"]}
    }

# 로그인 상태 확인
@router.get("/status")
async def get_login_status(token: str = Depends(oauth2_scheme)):
    payload = verify_jwt_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="토큰이 만료되었습니다."
        )
    
    user = await users_collection.find_one({"_id": ObjectId(payload["user_id"])})
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="사용자를 찾을 수 없습니다.")
    
    return {"status": "success", "user_id": payload["user_id"], "user": {"name": user["name"], "email": user["email"]}}

# 비밀번호 재설정 요청 코드
logger = logging.getLogger(__name__)

@router.post("/password-reset-request")
async def password_reset_request(request: PasswordResetRequest, background_tasks: BackgroundTasks):
    name = request.name,
    email = request.email
    
    # 이메일로 사용자 찾기
    user = await get_user_by_email(email)
    if not user:
        logger.error(f"비밀번호 재설정 요청 실패: {email} 사용자를 찾을 수 없음")
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")

    # 비밀번호 재설정 토큰 생성
    token = create_reset_token(email)
    
    # reset_token과 reset_token_expiration 업데이트
    expiration_time = bson_datetime.datetime.utcnow()
    update_result = await users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"reset_token": token, "reset_token_expiration": expiration_time}}
    )

    if update_result.modified_count == 0:
        logger.error(f"{email} 사용자의 비밀번호 재설정 정보 업데이트 실패")
        raise HTTPException(status_code=500, detail="비밀번호 재설정 정보를 업데이트하는데 실패했습니다.")
    
    # 성공 로그
    logger.info(f"비밀번호 재설정 토큰 생성 성공: {email}, token: {token}")

    # 비밀번호 재설정 이메일을 백그라운드로 전송
    background_tasks.add_task(send_reset_email, email, token)

    return {"message": "비밀번호 재설정 이메일을 보냈습니다."}

@router.get("/reset-password")
async def get_reset_password(token: str):
    # 토큰을 확인하고 유효한지 검증
    user_email = verify_reset_token(token)  # 토큰 검증 후 이메일 반환

    if not user_email:
        raise HTTPException(status_code=400, detail="유효하지 않은 토큰입니다.")

    # 비밀번호 변경 폼을 사용자에게 전달 (간단히 확인만 하고 포워딩하는 예시)
    return {"message": "비밀번호 변경 페이지", "email": user_email}


# 비밀번호 재설정 
@router.post("/reset-password")
async def reset_password(request: PasswordResetConfirm):
    token = request.token
    new_password = request.new_password

    # 토큰 검증
    payload = verify_jwt_token(token)
    if not payload:
        raise HTTPException(status_code=400, detail="유효하지 않거나 만료된 토큰입니다.")

    email = payload["email"]

    # 사용자 찾기
    user = await get_user_by_email(email)
    if not user or user.get("reset_token") != token:
        raise HTTPException(status_code=400, detail="유효하지 않은 요청입니다.")

    # 비밀번호 해싱 후 업데이트
    hashed_password = hash_password(new_password)
    update_result = await users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"hashed_password": hashed_password}, "$unset": {"reset_token": "", "reset_token_expiration": ""}}
    )

    # 비밀번호 변경 후 새로운 토큰 생성
    new_token = create_jwt_token({"sub": str(user["_id"]), "user_id": str(user["_id"])})

    return {
        "message": "비밀번호가 성공적으로 변경되었습니다.",
        "access_token": new_token,
        "token_type": "bearer",
        "user": {"name": user["name"], "email": user["email"]}
    }

# 구글 로그인 요청
@router.get("/google")
async def google_login():
    google_authorize_url = f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=openid%20email%20profile"
    return {"login_url": google_authorize_url}

# 구글 콜백 처리
@router.get("/google/callback")
async def google_callback(code: str):
    token_url = "https://oauth2.googleapis.com/token"
    payload = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=payload)

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="구글 인증에 실패했습니다.")
    
    access_token = response.json().get("access_token")

    user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    
    async with httpx.AsyncClient() as client:
        user_info_response = await client.get(user_info_url, headers={"Authorization": f"Bearer {access_token}"})
    
    if user_info_response.status_code != 200:
        raise HTTPException(status_code=400, detail="사용자 정보를 가져오는 데 실패했습니다.")
    
    user_info = user_info_response.json()

    # 구글 로그인된 사용자 정보 처리
    existing_user = await users_collection.find_one({"email": user_info["email"]})
    if not existing_user:
        new_user = {
            "name": user_info["name"],
            "email": user_info["email"],
            "provider": "google",
        }
        await users_collection.insert_one(new_user)
    else:
        new_user = existing_user

    # JWT 토큰 발급
    token = create_jwt_token({"sub": user_info["email"], "user_id": str(new_user["_id"]), "provider": "google"})

    return {"access_token": token, "token_type": "bearer", "user": {"name": new_user["name"], "email": new_user["email"]}}

# 카카오 로그인 요청
@router.get("/kakao")
async def kakao_login():
    kakao_authorize_url = (
        f"https://kauth.kakao.com/oauth/authorize?response_type=code"
        f"&client_id={KAKAO_CLIENT_ID}"
        f"&redirect_uri={KAKAO_REDIRECT_URI}"
    )
    return {"login_url": kakao_authorize_url}

# 카카오 콜백 처리
@router.get("/kakao/callback")
async def kakao_callback(code: str):
    token_url = "https://kauth.kakao.com/oauth/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": KAKAO_CLIENT_ID,
        "client_secret": KAKAO_CLIENT_SECRET,
        "redirect_uri": KAKAO_REDIRECT_URI,
        "code": code,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=payload)
    
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="카카오 인증에 실패했습니다.")
    
    access_token = response.json().get("access_token")
    
    # 카카오 사용자 정보 요청
    user_info_url = "https://kapi.kakao.com/v2/user/me"
    async with httpx.AsyncClient() as client:
        user_info_response = await client.get(user_info_url, headers={"Authorization": f"Bearer {access_token}"})
    
    if user_info_response.status_code != 200:
        raise HTTPException(status_code=400, detail="카카오 사용자 정보를 가져오는데 실패했습니다.")
    
    user_info = user_info_response.json()
    kakao_id = user_info["id"]
    email = user_info.get("kakao_account", {}).get("email")
    nickname = user_info.get("properties", {}).get("nickname")
    
    if not email:
        raise HTTPException(status_code=400, detail="이메일 정보가 필요합니다.")
    
    # DB에서 사용자 확인 또는 등록
    existing_user = await users_collection.find_one({"email": email})
    if not existing_user:
        new_user = {
            "name": nickname,
            "email": email,
            "provider": "kakao",
            "kakao_id": kakao_id,
        }
        await users_collection.insert_one(new_user)
    else:
        new_user = existing_user
    
    # JWT 토큰 발급
    token = create_jwt_token({"sub": str(new_user["_id"]), "user_id": str(new_user["_id"]), "provider": "kakao"})
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"name": new_user["name"], "email": new_user["email"]}
    }

# 네이버 로그인 요청
@router.get("/naver")
async def naver_login():
    naver_authorize_url = (
        f"https://nid.naver.com/oauth2.0/authorize?response_type=code"
        f"&client_id={NAVER_CLIENT_ID}"
        f"&redirect_uri={NAVER_REDIRECT_URI}"
        f"&state=RANDOM_STATE"
    )
    return {"login_url": naver_authorize_url}

# 네이버 콜백 처리
@router.get("/naver/callback")
async def naver_callback(code: str, state: str):
    token_url = "https://nid.naver.com/oauth2.0/token"
    payload = {
        "grant_type": "authorization_code",
        "client_id": NAVER_CLIENT_ID,
        "client_secret": NAVER_CLIENT_SECRET,
        "redirect_uri": NAVER_REDIRECT_URI,
        "code": code,
        "state": state,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=payload)

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="네이버 인증에 실패했습니다.")

    access_token = response.json().get("access_token")

    # 네이버 사용자 정보 요청
    user_info_url = "https://openapi.naver.com/v1/nid/me"
    async with httpx.AsyncClient() as client:
        user_info_response = await client.get(user_info_url, headers={"Authorization": f"Bearer {access_token}"})

    if user_info_response.status_code != 200:
        raise HTTPException(status_code=400, detail="네이버 사용자 정보를 가져오는 데 실패했습니다.")

    user_info = user_info_response.json()["response"]
    naver_id = user_info["id"]
    email = user_info.get("email")
    nickname = user_info.get("nickname")

    if not email:
        raise HTTPException(status_code=400, detail="이메일 정보가 필요합니다.")

    # DB에서 사용자 확인 또는 등록
    existing_user = await users_collection.find_one({"email": email})
    if not existing_user:
        new_user = {
            "name": nickname,
            "email": email,
            "provider": "naver",
            "naver_id": naver_id,
        }
        await users_collection.insert_one(new_user)
    else:
        new_user = existing_user

    # JWT 토큰 발급
    token = create_jwt_token({"sub": str(new_user["_id"]), "user_id": str(new_user["_id"]), "provider": "naver"})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"name": new_user["name"], "email": new_user["email"]}
    }
