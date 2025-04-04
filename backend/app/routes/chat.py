from fastapi import APIRouter, HTTPException
from openai import OpenAI
from app.database import db
from app.models.chat import ChatCreate
from app.core.config import settings
import uuid
from datetime import datetime
import httpx

router = APIRouter()
client = OpenAI(api_key=settings.OPENAI_API_KEY)

async def is_job_related(message: str) -> bool:
    job_keywords = ["직업", "진로", "취업", "연봉", "직무", "하는 일", "커리어", "진학", "전망", "자격증"]
    if any(kw in message.lower() for kw in job_keywords):
        return True

    judge_prompt = f"""
    사용자의 질문이 직업, 진로, 커리어, 연봉, 자격증 등과 관련된 내용인지 판단해줘.
    관련 있으면 '예', 관련 없으면 '아니오'로만 답해줘.

    질문: "{message}"
    """
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": judge_prompt}]
    )
    answer = response.choices[0].message.content.strip()
    return "예" in answer

@router.post("/")
async def chat_with_gpt(chat_data: ChatCreate):
    email = chat_data.email.lower().strip()

    user = await db.users.find_one({"email": email})
    student = await db.students.find_one({"email": email})

    if not user or not student:
        raise HTTPException(status_code=404, detail="사용자 정보를 찾을 수 없습니다.")

    prompt = f"""
    ## 프롬프트 설명

    당신은 IT 백엔드 개발 전문가입니다. 사용자의 학력, 관심사, 보유 기술을 바탕으로 백엔드 개발 관련 질문에 대한 답변을 제공합니다.

    ## 사용자 정보 
    - 이름: {user['name']} 
    - 나이: {user['age']} 
    - 성별: {student['gender']} 
    - 학점: {student['grade']} 
    - 전공: {student['major']} 
    - 관심 분야: {student['interest']} 
    - 보유 자격증: {', '.join(student['certifications']) if student['certifications'] else '없음'} 

    ## 사용자의 질문: 
    {chat_data.user_message}

    ## AI 상담사의 역할 
    1. 사용자의 배경을 고려한 맞춤형 백엔드 개발 관련 답변 제공 
    2. 백엔드 개발 관련 기술 스택, 취업 전략 추천 
    3. 백엔드 개발 관련 포트폴리오 및 프로젝트 기획 방법 안내 
    4. 백엔드 개발 관련 면접 준비 및 실무에서 필요한 역량 조언 
    5. 백엔드 개발자로 성장하기 위한 단계별 학습 로드맵 제공 

    ## 주의사항 
    - 친절하고 전문적인 어조 사용 
    - 답변은 너무 길지 않게 2~3줄로 표현 
    - 반복적인 표현 최소화 
    - 사용자가 계속 질문할 수 있도록 스무고개 방식으로 답변
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        gpt_reply = response.choices[0].message.content.strip()

        job_related = await is_job_related(chat_data.user_message)

        job_name = None
        job_info = None
        career_text = ""

        if job_related:
            job_extract_prompt = f"다음 문장에서 핵심 직업명을 한 단어 또는 문장으로만 추출해줘:\n\n{chat_data.user_message}"
            job_response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": job_extract_prompt}]
            )
            job_name = job_response.choices[0].message.content.strip()

            try:
                url = "https://www.career.go.kr/cnet/front/openapi/jobs.json"
                params = {"apiKey": settings.CAREER_KEY, "searchJobNm": job_name}
                async with httpx.AsyncClient() as http_client:
                    res = await http_client.get(url, params=params)
                    job_data = res.json()
                    job_info = job_data.get("jobs", [])[0] if job_data.get("jobs") else None
            except Exception as e:
                print("CareerNet API 오류:", e)

            if job_info:
                career_text = f"""
## 직업 정보:
- 직업명: {job_info.get("job_nm", "N/A")}
- 하는 일: {job_info.get("work", "정보 없음")}
- 관련직업: {job_info.get("rel_job_nm", "없음")}
- 연봉 수준: {job_info.get("wage", "정보 없음")}
- 직업군: {job_info.get("aptit_name", "정보 없음")}
"""

        final_reply = f"{gpt_reply}\n\n{career_text}" if career_text.strip() else gpt_reply

        chat_entry = {
            "_id": str(uuid.uuid4()),
            "con_id": chat_data.con_id,
            "email": email,
            "user_message": chat_data.user_message,
            "gpt_reply": final_reply,
            "job_name": job_name,
            "created_at": chat_data.created_at if chat_data.created_at else datetime.utcnow()
        }

        await db.chats.insert_one(chat_entry)

        return {"reply": final_reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
