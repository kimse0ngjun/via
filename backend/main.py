from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes.student import student_router
from app.routes import auth, career # interview

app = FastAPI()

# 라우터 등록
app.include_router(auth.router, prefix="/api/auth")
app.include_router(career.router, prefix="/api/career")
app.include_router(student_router)
# app.include_router(interview.router, prefix="/api/interview")

# 정적 파일 (favicon.ico) 서빙 설정
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"message": "안녕하세요.."}

# URL: http://127.0.0.1:8000/
#