# consult.py
from fastapi import APIRouter
from database import consultations_collection
from models.student import Consultation

router = APIRouter()

@router.post("/consultations/")
async def create_consultation(consult: Consultation):
    consult_data = consult.dict()
    await consultations_collection.insert_one(consult_data)
    return {"message": "Consultation saved"}
