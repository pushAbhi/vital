from google import genai
from dotenv import load_dotenv
from app.core.config import settings
from pydantic import BaseModel
from typing import Literal
from google.genai import errors as genai_errors
import logging

logger = logging.getLogger(__name__)

GEMINI_ERROR_MESSAGES: dict[int | str, str] = {
    400: "The request body is malformed. Or Gemini free tier is not available in your country. Enable billing in Google AI Studio.",
    403: "Your API key doesn't have the required permissions.",
    404: "The requested resource wasn't found.",
    429: "Developer out of tokens 😖",
    499: "The operation was cancelled.",
    500: "Your input context is too long.",
    503: "Service temporarily unavailable or overloaded.",
    504: "Service timeout - unable to finish processing.",
}

SYSTEM_PROMPT = """You are an expert clinical coaching intelligence assistant.
You will be given an anonymised conversation between a CLIENT and a health COACH (and sometimes an Accountability Coach).

Analyse the full conversation and return structured client intelligence.

Rules:
- Ground findings in the conversation. Prefer numbers and quotes that actually appear.
- Distinguish evidence types for supportingEvidence.type:
  F = Confirmed Fact (objective metric or coach-confirmed),
  R = Client Reported,
  I = AI Inference,
  M = Missing / unavailable.
- For riskSeverities.level use only: High, Medium, or Low.
- supportingEvidence.quote must be near-verbatim excerpts from the conversation.
- supportingEvidence.day should reference the day label if present (e.g. "Day 3"), otherwise a short source note.
- Do not invent metrics that were never mentioned; if sparse, say so in summaries and mark type M where appropriate.
- Be concise and professional. No medical diagnosis language."""

class Evidence(BaseModel) :
    quote: str
    day: str
    type: Literal["F", "R", "I", "M"]

class ClientIntelligence(BaseModel) :
    weekSummary: list[str]
    nutritionAdherence: int
    sleepAmount: float
    keyBarriers: str
    supportingEvidence: list[Evidence]

client = genai.Client(api_key = settings.GEMINI_API_KEY)

def ask_gemini(prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents = prompt,
    )
    return response.text

async def analyze_gemini(conversation: str) -> ClientIntelligence:
    try :
        # test error
        # raise genai_errors.ServerError(429, {"error": {"message": "fake 503"}}, None)
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents = conversation,
            config = {
                "system_instruction": SYSTEM_PROMPT,
                "temperature" : 0.2,
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