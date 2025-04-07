import os
import bcrypt
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jose import jwt, ExpiredSignatureError, JWTError
from dotenv import load_dotenv
from datetime import datetime, timedelta

# 환경 변수 로드
load_dotenv()

# ✅ 환경 변수 설정
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")  # ✅ 환경 변수에서 URL 설정

# ✅ SMTP 설정
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "your-email@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "your-email-password")

# ✅ 비밀번호 해싱
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# ✅ 비밀번호 검증
def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

# ✅ JWT 토큰 생성
def create_jwt_token(data: dict) -> str:
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# ✅ JWT 토큰 검증
def verify_jwt_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        print("❌ Token expired")
        return None
    except JWTError:
        print("❌ Invalid token")
        return None

# ✅ 비밀번호 재설정 토큰 생성
def create_reset_token(email: str) -> str:
    expiration = datetime.utcnow() + timedelta(hours=1)
    payload = {"email": email, "exp": int(expiration.timestamp())}  # ✅ 정수 변환
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# ✅ 비밀번호 재설정 토큰 검증
def verify_reset_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        print("❌ Token expired")
        return None
    except JWTError:
        print("❌ Invalid token")
        return None
print(f"🌍 FRONTEND_URL 설정값: {FRONTEND_URL}")  # 환경 변수 확인

# ✅ 비밀번호 재설정 이메일 전송
def send_reset_email(email: str, token: str):
    reset_url = f"{FRONTEND_URL}/reset-password?token={token}"  # ✅ 환경 변수 적용

    # ✅ 이메일 제목 및 내용 설정
    subject = "VIA 웹 서비스 - 비밀번호 재설정 안내"
    body = f"""
    <html>
        <body>
            <h2>안녕하세요, {email}님</h2>
            <p>아래 버튼을 클릭하여 비밀번호를 재설정하세요.</p>
            <a href="{reset_url}" style="display: inline-block; padding: 10px 20px; font-size: 16px; 
                color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                비밀번호 재설정
            </a>
            <p>링크는 1시간 동안만 유효합니다.</p>
            <p>만약 본인이 요청한 것이 아니라면, 이 이메일을 무시하셔도 됩니다.</p>
            <br>
            <p>감사합니다.<br>VIA 웹 서비스 팀</p>
        </body>
    </html>
    """

    # ✅ 이메일 메시지 설정
    msg = MIMEMultipart()
    msg["Subject"] = subject
    msg["From"] = SMTP_USER
    msg["To"] = email
    msg.attach(MIMEText(body, "html"))  # ✅ HTML 형식으로 전송

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, email, msg.as_string())
        print(f"✅ 이메일 전송 성공: {email}")
    except Exception as e:
        print(f"❌ 이메일 전송 오류: {e}")
