from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from app.routes import auth, student, mypage, chat, conversation, career

app = FastAPI()

# 라우터 등록
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, prefix="/api", tags=["chat"])  # ✅ 여기가 핵심
app.include_router(conversation.router, prefix="/conversation", tags=["conversation"])
app.include_router(student.router, prefix="/student", tags=["student"])
app.include_router(mypage.router, prefix="/mypage", tags=["mypage"])
app.include_router(career.router, prefix="/career", tags=["career"])

# 정적 파일 설정
app.mount("/static", StaticFiles(directory="static"), name="static")

# CORS 허용 설정
origins = [
    "http://localhost:3000",  # React 프론트엔드에서 오는 요청 허용
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "안녕하세요.."}

# 📌 등록된 라우트 목록 출력 (디버깅용)
@app.on_event("startup")
async def show_routes():
    print("📌 등록된 라우트 목록:")
    for route in app.routes:
        if isinstance(route, APIRoute):
            print(f"PATH: {route.path} | METHODS: {route.methods}")
        else:
            print(f"PATH: {route.path} | (methods 정보 없음 - {type(route).__name__})")
