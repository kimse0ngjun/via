# utils/security.py
import bcrypt
from jose import jwt 
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")  # JWT 암호화 키
ALGORITHM = "HS256"

# 비밀번호 해싱
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# 비밀번호 검증
def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

# JWT 토큰 생성
def create_jwt_token(data: dict) -> str:
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# JWT 토큰 확인
def verify_jwt_token(token: str):
    try:
        # JWT 디코딩
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvaildTokenError:
        return None