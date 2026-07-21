from pydantic import BaseModel, Field
from typing import Literal, Optional


## Evidence Codes
# F - Confirmed Fact
# R - Client Reported
# I - AI Inference
# M - Missing / unavailable
class Evidence(BaseModel) :
    quote: str = Field(description="Near-verbatim quote from the conversation")
    day: str = Field(description="Day label or short source reference (e.g. Day 7)")
    type: Literal["F", "R", "I", "M"] = Field(description="Evidence type: F - Confirmed Fact, R - Client Reported, I - AI Inference, or M - Missing/Unavailable")


class RiskSeverity(BaseModel):
    label: str = Field(description="Short description of the risk or attention flag")
    level: Literal["High", "Medium", "Low"] = Field(description="Severity: High, Medium, or Low")

# Response Schema of AI
class ClientIntelligence(BaseModel) :
    weekSummary: list[str] = Field(description="Weekly client summary bullet points (3-6 items) grounded in the conversation")
    nutritionAdherence: Optional[int] = Field(description="Estimated diet adherence percentage 0-100 based on coach guidance vs client reports")
    exerciseSteps: Optional[int] = Field(description="Average daily steps when reported; estimate only from mentioned figures")
    sleepAmount: Optional[float] = Field(description="Average sleep hours (e.g. 5.9) from reported nights")
    waterIntake: Optional[float] = Field(description="Average water intake in litres/day from reported values")
    symptomsStress: str = Field(description="Stress / symptom burden level: Low, Moderate, or High")
    engagementLevel: str = Field(description="Client engagement with coach updates: Bad, Moderate, or Good")
    keyBarriers: str = Field(description="Main obstacles to goals (20-50 words), grounded in conversation")
    pendingActions: list[str] = Field(description="Outstanding client TODOs / missed habits to follow up")
    recommendedActions: str = Field(description="Recommended next action for the coach (30-60 words)")
    keyTakeaway: str = Field(description="One concise paragraph (2-4 sentences) capturing the most important overall insight for the coach")
    supportingEvidence: list[Evidence] = Field(description="3-8 supporting quotes from the original conversation with evidence type")
    riskSeverities: list[RiskSeverity] = Field(description="Risk / attention flags with severity for coach prioritisation")
    diagnosysSummary: list[str] = Field(
        default=[], 
        description="Key diagnostic summary bullet points or health observations derived from the conversation"
    )
