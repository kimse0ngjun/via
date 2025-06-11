from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, student, mypage, chat, conversation, career, recommend  # interview

app = FastAPI(strict_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 헤더 허용
)

app.include_router(auth.router, prefix="/auth")
app.include_router(chat.router, prefix="/chat")
app.include_router(conversation.router, prefix="/conversation")
app.include_router(student.router, prefix="/student")
app.include_router(mypage.router, prefix="/mypage")
app.include_router(career.router, prefix="/career")
app.include_router(recommend.router, prefix="/recommend")
# app.include_router(interview.router, prefix="/interview")

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"message": "안녕하세요.."}

from fastapi.routing import APIRoute
for route in app.routes:
    if isinstance(route, APIRoute):
        print(f"✅ Route: {route.path} - {route.methods}")
