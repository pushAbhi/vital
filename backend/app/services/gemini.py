from google import genai
from app.core.config import settings
from google.genai import errors as genai_errors # type: ignore
import logging
from app.services.ai_constants import SYSTEM_PROMPT, GEMINI_ERROR_MESSAGES, SAVE_TOKEN
from app.models.ai_schemas import ClientIntelligence

logger = logging.getLogger(__name__)

client = genai.Client(api_key = settings.GEMINI_API_KEY)

async def ask_gemini(prompt: str, model: str) -> str:
    response = client.models.generate_content(
        model=model,
        contents = prompt,
    )
    return response.text

async def analyze_gemini(conversation: str, model: str) -> ClientIntelligence:
    try :
        ## MOCK DATA - comment / uncomment
        # return SAVE_TOKEN
    
        # --- Real AI API call ---
        response = client.models.generate_content(
            model=model,
            contents = conversation,
            config = {
                "system_instruction": SYSTEM_PROMPT,
                "temperature" : 0,
                "response_mime_type": "application/json",
                "response_schema" : ClientIntelligence,
            }
        )
        return ClientIntelligence.model_validate_json(response.text)
    except genai_errors.APIError as e:
        status = getattr(e, "code", None)
        message = GEMINI_ERROR_MESSAGES.get(status) or getattr(e, "message", "Gemini API error")
        logger.error("Gemini API error %s: %s", status, message)
    except genai_errors.ClientError as e:
        logger.error("Gemini client error: %s", e.message)
    except Exception as e:
        logger.error("Unknown Error: %s", e)