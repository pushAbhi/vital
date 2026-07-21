from fastapi import APIRouter, Depends
from app.services.gemini import ask_gemini, analyze_gemini
from enum import StrEnum
from pydantic import BaseModel
from app.core.security import verify_frontend

router = APIRouter()

# Switch model
class GeminiModel(StrEnum):
    # Standard Flagship Tier
    FLASH = "gemini-3.5-flash"
    FLASH_PREVIEW = "gemini-3-flash-preview"
    
    # High-Efficiency / Low-Cost Tiers
    FLASH_LITE = "gemini-3.1-flash-lite"
    FLASH_LITE_PREVIEW = "gemini-3.1-flash-lite-preview"

class AnalyzeRequest(BaseModel):
    conversation: str

# To be removed later, Temporary stuff
CURRENT_MODEL = GeminiModel.FLASH_PREVIEW

@router.post("/ask")
async def ask(prompt: str, model = CURRENT_MODEL, _: bool = Depends(verify_frontend)):
    return {"response" : await ask_gemini(prompt, model)}

@router.post("/analyze")
async def analyze(data: AnalyzeRequest, model = CURRENT_MODEL, _: bool = Depends(verify_frontend)):
    conversation = data.conversation
    return await analyze_gemini(conversation, model)