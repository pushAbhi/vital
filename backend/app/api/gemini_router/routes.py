from fastapi import APIRouter
from app.services.gemini import ask_gemini 


router = APIRouter()

@router.post("/ask")
def ask(prompt: str):
    return {"response" : ask_gemini(prompt)}