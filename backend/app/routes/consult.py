# # consult.py
# from fastapi import APIRouter
# from app.database import consultations_collection
# from app.models.student import Consultation

# router = APIRouter()

# # 내용 저장 API
# @router.post("/consultations/")
# async def create_consultation(consult: Consultation):
#     consult_data = consult.dict()
#     await consultations_collection.insert_one(consult_data)
#     return {"message": "상담 내용이 저장되었습니다."}
