import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
                systemInstruction:
                    "You are an expert medical AI assistant, You will be given an conversation between a patient(CLIENT) and medical COACH Analyse the weekly conversation between and answer professionally",
                temperature: 0.2,

                responseMimeType: "application/json",

                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        diagonosysSummary: {
                            type: Type.ARRAY,
                            description: "Lists of Weekly Client Summary",
                            items: {
                                type: Type.STRING,
                            },
                        },
                        nutritionAdherence: {
                            type: Type.INTEGER,
                            description:
                                "how much patient have been adhering to suggested diet by COACH, mathematical percentage integer 0 to 100",
                        },
                        exerciseSteps: {
                            type: Type.INTEGER,
                            description:
                                "Average steps CLIENT have been taking",
                        },
                        sleepAmount: {
                            type: Type.NUMBER,
                            description:
                                "Amount of hours CLIENT been sleeping, ex - 6.2",
                        },
                        waterIntake: {
                            type: Type.NUMBER,
                            description:
                                "how much water CLIENT been drinking Liter/day",
                        },
                        symptomsStress: {
                            type: Type.STRING,
                            description:
                                "Stress level of CLIENT : Low/Moderate/high",
                        },
                        engagementLevel: {
                            type: Type.STRING,
                            description:
                                "how much CLIENT been engaging daily with COACH, output : Bad/Moderate/Good",
                        },
                        keyBarriers: {
                            type: Type.STRING,
                            description:
                                "the main obstacles preventing the client from achieving their health or fitness goals. word limit 20 to 50",
                        },
                        pendingActions: {
                            type: Type.ARRAY,
                            description:
                                "list of necessary things clients has missed, TODO list",
                            items: {
                                type: Type.STRING,
                            },
                        },
                        risksAndAttentionFlags: {
                            type: Type.ARRAY,
                            description:
                                "issues that deserve the coach's immediate or special attention because they may negatively affect the client's health, safety, or progress",
                            items: {
                                type: Type.STRING,
                            },
                        },
                        recommendedActions: {
                            type: Type.STRING,
                            description:
                                "Recommended next Actions for Coach, word limit: 30 to 60",
                        },
                    },
                },
            },
        });

        return NextResponse.json({ text: response.text });
    } catch (error) {
        console.log(`ERROR  : ${error}`);
        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 },
        );
    }
}
