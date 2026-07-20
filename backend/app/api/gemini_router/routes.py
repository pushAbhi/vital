from fastapi import APIRouter
from app.services.gemini import ask_gemini, analyze_gemini

router = APIRouter()

@router.post("/ask")
async def ask(prompt: str):
    return {"response" : await ask_gemini(prompt)}


@router.post("/analyze")
async def analyze(conversation: str):
    return {"response" : await analyze_gemini(conversation)}