import bcrypt
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jose import jwt, ExpiredSignatureError, JWTError
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

# 환경 변수 로드
load_dotenv()

# JWT 설정
SECRET_KEY = os.getenv("SECRET_KEY")  # JWT 암호화 키
ALGORITHM = "HS256"

# SMTP 설정 (환경 변수에서 불러오기)
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# 비밀번호 해싱
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# 비밀번호 검증
def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))

# JWT 토큰 생성
def create_jwt_token(data: dict) -> str:
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# JWT 토큰 검증
def verify_jwt_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        print("Token expired")
        return None
    except JWTError:
        print("Invalid token")
        return None

# 비밀번호 재설정 토큰 생성
def create_reset_token(email: str) -> str:
    expiration = datetime.utcnow() + timedelta(hours=1)
    payload = {"email": email, "exp": expiration}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

# 비밀번호 재설정 토큰 검증
def verify_reset_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        # 토큰 만료 시간 체크
        if datetime.utcnow() > datetime.utcfromtimestamp(payload["exp"]):
            return None  # 만료된 토큰
        return payload
    except JWTError:
        return None  # 유효하지 않은 토큰

# 비밀번호 재설정 이메일 전송
def send_reset_email(email: str, token: str):
    reset_url = f"http://127.0.0.1:8000/api/auth/reset-password?token={token}"
    
    # 이메일 제목 및 내용 설정
    subject = "VIA 웹 서비스 - 비밀번호 재설정 안내"
    body = f"""
    <html>
        <body>
            <h2>안녕하세요, {email}님</h2>
            <p>아래 버튼을 클릭하여 비밀번호를 설정할 수 있습니다..</p>
            <a href="{reset_url}" style="display: inline-block; padding: 10px 20px; font-size: 16px; 
                color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
                비밀번호 재설정
            </a>
            <p>링크는 1시간 동안만 유효합니다.</p>
            <p>만약 본인이 요청한 것이 아니라면, 이 이메일은 무시하셔도 됩니다.</p>
            <br>
            <p>감사합니다.<br>VIA 웹 서비스 팀</p>
        </body>
    </html>
    """

    # 이메일 메시지 설정
    msg = MIMEMultipart()
    msg["Subject"] = subject
    msg["From"] = SMTP_USER
    msg["To"] = email
    msg.attach(MIMEText(body, "html"))  # HTML 형식으로 전송

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, email, msg.as_string())
        print(f"이메일 전송 성공: {email}")
    except Exception as e:
        print(f"이메일 전송 오류: {e}")

