from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, student
import os

app = FastAPI()

app.include_router(auth.router, prefix="/api/auth")
app.include_router(student.router, prefix="/api/student")

app.mount("/static", StaticFiles(directory="static"), name="static")

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"], # 필요에 따라 수정
    allow_headers=["Content-Type", "Authorization"], # 필요에 따라 수정
)

@app.get("/")
async def root():
    return {"message": "안녕하세요.."}