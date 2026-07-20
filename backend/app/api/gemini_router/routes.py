from fastapi import APIRouter
from app.services.gemini import ask_gemini, analyze_gemini
from enum import StrEnum

router = APIRouter()

# Switch model
class GeminiModel(StrEnum):
    # Standard Flagship Tier
    FLASH = "gemini-3.5-flash"
    FLASH_PREVIEW = "gemini-3-flash-preview"
    
    # High-Efficiency / Low-Cost Tiers
    FLASH_LITE = "gemini-3.1-flash-lite"
    FLASH_LITE_PREVIEW = "gemini-3.1-flash-lite-preview"

# To be removed later, Temporary stuff
CURRENT_MODEL = GeminiModel.FLASH_PREVIEW

@router.post("/ask")
async def ask(prompt: str, model = CURRENT_MODEL):
    return {"response" : await ask_gemini(prompt, model)}


@router.post("/analyze")
async def analyze(conversation: str, model = CURRENT_MODEL):
    return await analyze_gemini(conversation, model)