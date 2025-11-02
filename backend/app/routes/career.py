from fastapi import APIRouter, HTTPException, Query
import httpx
import os

router = APIRouter()

API_KEY = os.environ.get("CAREER_KEY")

if not API_KEY:
    raise HTTPException(status_code=500, detail="환경 변수 'CAREER_KEY'가 설정되지 않았습니다.")

@router.get("/list")
async def get_career_jobs(searchJobNm: str = Query(..., description="검색할 직업명")):
    url = f"https://www.career.go.kr/cnet/front/openapi/jobs.json"
    params = {
        "apiKey": API_KEY,
        "searchJobNm": searchJobNm
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"API 요청 오류: {str(e)}")

    data = response.json()
    jobs = data.get("jobs", [])

    if not jobs:
        raise HTTPException(status_code=404, detail="검색된 직업이 없습니다.")

    job_results = [
        {
            "직업명": job.get("job_nm"),
            "하는 일": job.get("work", "정보 없음"),
            "관련직업": job.get("rel_job_nm", "없음"),
            "연봉수준": job.get("wage", "정보 없음"),
            "직업군": job.get("aptit_name", "정보 없음"),
        }
        for job in jobs
    ]

    return {"results": job_results}
