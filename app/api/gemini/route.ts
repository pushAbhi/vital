import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
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
