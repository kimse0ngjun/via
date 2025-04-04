from openai import OpenAI
import os
from bson import ObjectId
from app.database import users_collection, interests_collection

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")) 

async def generate_prompt(user_id: str):
    """
    주어진 user_id를 기반으로 사용자 정보를 가져와 진로 추천을 위한 프롬프트 생성
    """
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    interests = await interests_collection.find_one({"user_id": user_id})

    if not user or not interests:
        return "사용자 정보를 찾을 수 없습니다."

    prompt_data = {
        "age": user.get("age", "정보 없음"),
        "gender": user.get("gender", "정보 없음"),
        "grades": user.get("grades", "정보 없음"),
        "major": user.get("major", "정보 없음"),
        "job_category": interests.job_category("job_category", "정보 없음"),
        "personal_values": interests.personal_values("personal_values", "정보 없음"),
        "tech_stack": interests.tech_stack("tech_stack", "정보 없음"),
        "target_company": interests.target_company("target_company", "정보 없음")
    }

    return f"여기 너의 응답이야: {prompt_data}. 여기서 진로에 대한 충고를 줄 수 있니?"


async def get_career_recommendation(user_input: str = None, user_id: str = None):
    """
    ChatGPT를 사용하여 진로 추천을 생성하는 함수
    - user_input이 있으면 직접 입력된 질문 기반 추천
    - user_id가 있으면 DB에서 정보를 가져와 추천
    """
    try:
        if user_id:
            user_input = await generate_prompt(user_id)
        
        if not user_input:
            return "올바른 입력이 필요합니다."

        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "당신은 진로 상담 전문가입니다."},
                {"role": "user", "content": user_input}
            ],
            temperature=0.7
        )
        return response.choices[0].message.content

    except Exception as e:
        print(f"ChatGPT API 오류: {str(e)}")  # 디버깅 로그
        return "진로 추천을 생성하는 중 오류가 발생했습니다."
