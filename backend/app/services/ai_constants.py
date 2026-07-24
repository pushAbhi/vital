from app.models.ai_schemas import ClientIntelligence, Evidence, RiskSeverity

## ---------------- AI CONSTANTS -------------------
SAVE_TOKEN = ClientIntelligence(
    weekSummary=[
        "Client is experiencing significant work-related stress and 'office politics,' leading to extreme fatigue and a reported incident of falling asleep during a meeting.",
        "Sleep deprivation is a major concern, with the client averaging under 6 hours for most of the week due to family and work pressures.",
        "Persistent digestive issues including acidity and bloating are frequently reported, often linked by the client to poor sleep and irregular meal timings.",
        "Nutrition is inconsistent; the client tends to undereat or skip protein when busy, leading the coach to warn against inadequate caloric intake.",
        "Physical activity remains a bright spot, with the client consistently incorporating walking, household chores, and stretching despite low energy.",
    ],
    nutritionAdherence=65,
    exerciseSteps=6625,
    sleepAmount=5.9,
    waterIntake=3.75,
    symptomsStress="High",
    engagementLevel="Good",
    keyBarriers="High-pressure work environment and school schedule prevent consistent meal planning. Chronic sleep deprivation (averaging ~5 hours) is causing extreme fatigue and exacerbating digestive issues like acidity and bloating.",
    pendingActions=[
        "Stock vegetables for consistent salad intake",
        "Establish a consistent reminder for ACV consumption",
        "Increase protein intake during school hours (sprouts, chana)",
        "Improve sleep hygiene to reach 7-8 hours consistently",
    ],
    recommendedActions="Prioritize a 'minimum viable' meal prep strategy for school days to prevent under-eating protein. The coach should focus on stress management techniques and a strict sleep schedule to address the extreme fatigue and acidity before increasing exercise intensity.",
    keyTakeaway="The client is highly motivated but currently overwhelmed by work stress and severe sleep debt, which is manifesting as physical exhaustion and digestive distress. While she is active, her metabolic progress is hindered by under-eating and high cortisol; stabilizing her routine and sleep must be the immediate priority.",
    supportingEvidence=[
        Evidence(
            quote="Slept only around 5 hours last night. Daughter had exams, so I was awake late.",
            day="Day 1",
            type="R",
        ),
        Evidence(
            quote="I still need to stock vegetables properly. Will do it tomorrow.",
            day="Day 1",
            type="R",
        ),
        Evidence(
            quote="Weight seems slightly up even though I'm eating almost half of what I used to eat.",
            day="Day 5",
            type="R",
        ),
        Evidence(
            quote="I am not getting enough time to plan meals.",
            day="Day 6",
            type="R",
        ),
        Evidence(
            quote="During a meeting today I was so tired that my head went down on the table and I actually slept for a few seconds.",
            day="Day 7",
            type="R",
        ),
        Evidence(
            quote="Weight is around 83 kg. Waist almost same.",
            day="Day 8",
            type="F",
        ),
    ],
    riskSeverities=[
        RiskSeverity(label="Extreme Fatigue / Burnout", level="High"),
        RiskSeverity(label="Chronic Sleep Deprivation", level="High"),
        RiskSeverity(label="Digestive Distress (Acidity/Bloating)", level="Medium"),
    ],
    diagnosysSummary=[
        "Chronic sleep debt averaging 5.9 hours per night.",
        "High occupational stress and emotional exhaustion.",
        "Symptoms of functional dyspepsia (bloating and acidity) correlated with stress and sleep loss.",
        "Inadequate protein distribution across daily meals.",
    ],
)

SYSTEM_PROMPT = """You are an expert clinical coaching intelligence assistant.
You will be given an anonymised conversation between a CLIENT and a health COACH (and sometimes an Accountability Coach).

Analyse the full conversation and return structured client intelligence.

Rules:
- Ground findings in the conversation. Prefer numbers and quotes that actually appear. Do not infer relationships that are not explicitly stated.
- Distinguish evidence types for supportingEvidence.type:
  F = Confirmed Fact (objective metric or coach-confirmed),
  R = Client Reported,
  I = AI Inference,
  M = Missing / unavailable.
- For riskSeverities.level use only: High, Medium, or Low.
- supportingEvidence.quote must be near-verbatim excerpts from the conversation.
- supportingEvidence.day should reference the day label if present (e.g. "Day 3"), otherwise a short source note.
- Do not invent metrics that were never mentioned; if sparse, say so in summaries and mark type M where appropriate.
- Be concise and professional. No medical diagnosis language.
- Do not use causal terms such as "caused", "driven by", "led to", ACT PROFESSIONAL.
"""

## ----------- ERROR HANDLING ---------------------
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