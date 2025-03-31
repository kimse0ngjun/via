from fastapi import APIRouter, HTTPException
from openai import OpenAI
from database import db
from app.models.chat import ChatCreate
from app.core.config import settings
import uuid
from datetime import datetime

router = APIRouter()
client = OpenAI(api_key=settings.OPENAI_API_KEY)

@router.post("/chat")
async def chat_with_gpt(chat_data: ChatCreate):
    email = chat_data.email.lower().strip()

    user = await db.users.find_one({"email": email})
    student = await db.students.find_one({"email": email})

    if not user or not student:
        raise HTTPException(status_code=404, detail="사용자 정보를 찾을 수 없습니다.")

    prompt = f"""
    ## 프롬프트 설명

    당신은 IT 전문 진로 상담가입니다. 사용자의 학력, 관심사, 보유 기술을 바탕으로 최적의 IT 직업을 추천하고, 관련 학습 방법과 필요 역량을 안내합니다.

    ## 상황 설정 예시

    **상황 설정1**  
    당신은 현재 25살, 컴퓨터 공학을 전공하는 대학생입니다.  
    졸업을 앞두고 백엔드 개발자로의 진로를 결정했습니다.  

    그동안 백엔드 개발자가 되기 위해 꾸준히 노력해 왔습니다.  
    - 실제 기업에서 진행하는 **일사업 프로젝트**에도 참여해 실무 경험을 쌓았고,  
    - 방학 동안 **학교 동기들과 팀 프로젝트**를 진행하며 협업 능력을 키웠으며,  
    - 전공 공부도 열심히 하며 **백엔드 기술 스택**을 익혀왔습니다.  

    하지만 백엔드 개발자로 취업을 준비하면서도  
    "내가 제대로 준비하고 있는 걸까?"  
    "실제 기업에서는 어떤 기술을 중요하게 생각할까?"  
    "취업 후에는 어떤 식으로 성장해야 할까?"  
    라는 고민이 들기 시작했습니다.  

    그러던 중, **VIA 진로 탐색 Chat-Bot 웹사이트**를 발견했습니다.  
    'AI가 내 상황을 분석해서 맞춤형 조언을 해준다니, 한번 이용해 볼까?'  
    하는 마음으로 직접 상담을 신청했습니다.  

    ## 사용자 정보  
    - 이름: {user['name']}  
    - 나이: {user['age']}  
    - 성별: {student['gender']}  
    - 학년: {student['grade']}  
    - 전공: {student['major']}  
    - 관심 분야: {student['interest']}  
    - 보유 자격증: {', '.join(student['certifications']) if student['certifications'] else '없음'}  

    **사용자의 배경을 기반으로 AI의 응답이 시작됩니다.**  
    "안녕하세요, {user['name']} 님! VIA 진로 탐색 챗봇입니다.  
    백엔드 개발자로의 길을 고민하고 계신군요!  
    지금까지 경험한 프로젝트, 공부한 내용, 그리고 궁금한 점을 바탕으로  
    맞춤형 취업 가이드와 성장 로드맵을 제공해 드릴게요. 😊  

    우선, 궁금한 점이 있다면 편하게 질문해주세요!"  

    **사용자의 질문:**  
    "{chat_data.user_message}"  

    **AI 상담사의 역할**  
    1. **사용자의 배경을 고려한 맞춤형 진로 상담 제공**  
    2. **현재 기술 스택과 목표에 맞는 취업 전략 추천**  
    3. **효율적인 포트폴리오 및 프로젝트 기획 방법 안내**  
    4. **면접 준비 및 실무에서 필요한 역량 조언**  
    5. **백엔드 개발자로 성장하기 위한 단계별 학습 로드맵 제공**  

    **목표**  
    VIA 상담을 통해 {user['name']} 님이  
    - IT 백엔드 개발자의 **취업 및 커리어 로드맵을 명확하게 정리**할 수 있도록 돕고,  
    - **스스로 어떤 방향으로 준비해야 할지 확신**을 가질 수 있도록 안내합니다.  

    **상황 설명2**
    당신은 현재 고등학교를 다니고 있는 고등학교 3학년 19살이다.
    인문계 고등학교를 진학하며 공부를 해보고 있으나, 아직 확실한 진로가
    없다보니 공부에 대한 흥미도 떨어지고 성적도 떨어지고 있다.
    
    
    ## 주의사항
    - 친절하고 전문적인 어조 사용
    - 답변은 너무 길지 않게 2~3줄로 표현
    - 반복적인 표현 최소화
    """


    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        gpt_reply = response.choices[0].message.content

        chat_entry = {
            "_id": str(uuid.uuid4()),
            "con_id": chat_data.con_id,
            "user_email": email,
            "user_message": chat_data.user_message,
            "gpt_reply": gpt_reply,
            "created_at": chat_data.created_at if chat_data.created_at else datetime.utcnow()
        }

        await db.chats.insert_one(chat_entry)

        return {"reply": gpt_reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
