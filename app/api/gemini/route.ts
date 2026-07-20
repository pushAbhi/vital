import { NextResponse } from "next/server";
import { ApiError, GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                systemInstruction: `You are an expert clinical coaching intelligence assistant.
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
- Be concise and professional. No medical diagnosis language.`,
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        diagonosysSummary: {
                            type: Type.ARRAY,
                            description:
                                "Weekly client summary bullet points (3-6 items) grounded in the conversation",
                            items: {
                                type: Type.STRING,
                            },
                        },
                        nutritionAdherence: {
                            type: Type.INTEGER,
                            description:
                                "Estimated diet adherence percentage 0-100 based on coach guidance vs client reports",
                        },
                        exerciseSteps: {
                            type: Type.INTEGER,
                            description:
                                "Average daily steps when reported; estimate only from mentioned figures",
                        },
                        sleepAmount: {
                            type: Type.NUMBER,
                            description:
                                "Average sleep hours (e.g. 5.9) from reported nights",
                        },
                        waterIntake: {
                            type: Type.NUMBER,
                            description:
                                "Average water intake in litres/day from reported values",
                        },
                        symptomsStress: {
                            type: Type.STRING,
                            description:
                                "Stress / symptom burden level: Low, Moderate, or High",
                        },
                        engagementLevel: {
                            type: Type.STRING,
                            description:
                                "Client engagement with coach updates: Bad, Moderate, or Good",
                        },
                        keyBarriers: {
                            type: Type.STRING,
                            description:
                                "Main obstacles to goals (20-50 words), grounded in conversation",
                        },
                        pendingActions: {
                            type: Type.ARRAY,
                            description:
                                "Outstanding client TODOs / missed habits to follow up",
                            items: {
                                type: Type.STRING,
                            },
                        },
                        recommendedActions: {
                            type: Type.STRING,
                            description:
                                "Recommended next action for the coach (30-60 words)",
                        },
                        keyTakeaway: {
                            type: Type.STRING,
                            description:
                                "One concise paragraph (2-4 sentences) capturing the most important overall insight for the coach",
                        },
                        supportingEvidence: {
                            type: Type.ARRAY,
                            description:
                                "3-8 supporting quotes from the original conversation with evidence type",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    quote: {
                                        type: Type.STRING,
                                        description:
                                            "Near-verbatim quote from the conversation",
                                    },
                                    day: {
                                        type: Type.STRING,
                                        description:
                                            "Day label or short source reference (e.g. Day 7)",
                                    },
                                    type: {
                                        type: Type.STRING,
                                        description:
                                            "Evidence type: F, R, I, or M",
                                        enum: ["F", "R", "I", "M"],
                                    },
                                },
                                required: ["quote", "day", "type"],
                            },
                        },
                        riskSeverities: {
                            type: Type.ARRAY,
                            description:
                                "Risk / attention flags with severity for coach prioritisation",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    label: {
                                        type: Type.STRING,
                                        description:
                                            "Short description of the risk or attention flag",
                                    },
                                    level: {
                                        type: Type.STRING,
                                        description:
                                            "Severity: High, Medium, or Low",
                                        enum: ["High", "Medium", "Low"],
                                    },
                                },
                                required: ["label", "level"],
                            },
                        },
                    },
                    required: [
                        "diagonosysSummary",
                        "nutritionAdherence",
                        "exerciseSteps",
                        "sleepAmount",
                        "waterIntake",
                        "symptomsStress",
                        "engagementLevel",
                        "keyBarriers",
                        "pendingActions",
                        "recommendedActions",
                        "keyTakeaway",
                        "supportingEvidence",
                        "riskSeverities",
                    ],
                },
            },
        });

        return NextResponse.json({ text: response.text });
    } catch (error: unknown) {
        // Gemini Error Handling
        if (error instanceof ApiError) {
            const status = error.status;

            const errorMessages: Record<number, string> = {
                400: "The request body is malformed. Or Gemini free tier is not available in your country. Enable billing in Google AI Studio.",
                403: "Your API key doesn't have the required permissions.",
                404: "The requested resource wasn't found.",
                429: "Developer out of tokens 😖", // Rate limit / quota
                499: "The operation was cancelled.",
                500: "Your input context is too long.",
                503: "Service temporarily unavailable or overloaded.",
                504: "Service timeout - unable to finish processing.",
            };

            const message =
                errorMessages[status] || error.message || "Gemini API error";

            return NextResponse.json({ error: message }, { status });
        }

        console.error(`ERROR  : ${error}`);

        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 },
        );
    }
}
