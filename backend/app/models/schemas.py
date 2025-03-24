from pydantic import BaseModel
from typing import List

class CareerRequest(BaseModel):
    user_input: str
    
class CareerResponse(BaseModel):
    recommendation: str
    
class InterviewRequest(BaseModel):
    job: str

class InterviewResponse(BaseModel):
    questions: List[str]