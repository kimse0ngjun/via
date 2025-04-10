import httpx
import os

CAREER_API_KEY = os.getenv("CAREER_KEY") 

BASE_URL = "https://www.career.go.kr/cnet/openapi/getOpenApi"

async def get_job_info_by_keyword(keyword: str):
    """
    사용자가 입력한 키워드를 기반으로 커리어넷 직업 정보 검색
    """
    try:
        params = {
            "apiKey": CAREER_API_KEY,
            "svcType": "api",
            "svcCode": "JOB",
            "contentType": "json",
            "gubun": "job",
            "searchWord": keyword
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(BASE_URL, params=params)
            data = response.json()

            job_list = data.get("dataSearch", {}).get("content", [])
            if not job_list:
                return None

            job = job_list[0]

            return {
                "직업명": job.get("job"),
                "설명": job.get("summary"),
                "관련 학과": job.get("relMajor", "정보 없음"),
                "전망": job.get("prospect", "정보 없음"),
                "관련 자격": job.get("certificate", "정보 없음")
            }

    except Exception as e:
        print(f"[커리어넷 API 오류]: {e}")
        return None
