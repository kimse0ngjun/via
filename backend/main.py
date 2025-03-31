from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, student, chatgpt, mypage, chat # interview

app = FastAPI()

# 라우터 등록
app.include_router(auth.router, prefix="/Auth")
app.include_router(chat.router, prefix="/Chat")
app.include_router(chatgpt.router, prefix="/Chatgpt")
app.include_router(student.router, prefix="/Student")
app.include_router(mypage.router, prefix="/Mypage")
# app.include_router(interview.router, prefix="/api/inteview")

# 정적 파일 (favicon.ico) 서빙 설정
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS 허용 설정
origins = [
    "http://localhost:3000",  # React 프론트엔드에서 오는 요청을 허용
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 어떤 도메인에서 요청을 허용할 것인지 설정
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용 
    allow_headers=["*"],  # 모든 헤더 허용
)

@app.get("/")
async def root():
    return {"message": "안녕하세요.."}

# URL: http://127.0.0.1:8000/
#