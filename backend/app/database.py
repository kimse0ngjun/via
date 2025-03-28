from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")  
DATABASE_NAME = "VIA"  

# MongoDB 클라이언트 설정
client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]

# 컬렉션 선택
users_collection = db["users"]
students_collection = db["students"]

# 이메일로 사용자 조회
async def get_user_by_email(email: str):
    return await users_collection.find_one({"email": email})
