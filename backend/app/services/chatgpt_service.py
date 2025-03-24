import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

async def get_career_recommendation(user_input: str):
    """
    ChatGPT를 사용하여 진로 추천을 생성하는 함수
    """
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "당신은 진로 상담 전문가입니다."},
            {"role": "user", "content": user_input}
        ],
        temperature=0.7,
    )
    return response["choice"][0]["message"]["content"]