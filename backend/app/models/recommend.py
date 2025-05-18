from pydantic import BaseModel

class JobRecommendation(BaseModel):
    job_name: str
    description: str
    link: str

class UserIDRequest(BaseModel):
    user_id: str