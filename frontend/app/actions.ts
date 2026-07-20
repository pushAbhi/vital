"use server";

import { FormState, MedicalData } from "./types";

export async function handleFormSubmit(
    _prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const content = formData.get("content") as string;

    if (!content || !content.trim()) {
        return {
            success: false,
            error: "Please paste a client-coach conversation.",
            data: null,
        };
    }

    try {
        const baseURL =
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

        const response = await fetch(`${baseURL}/api/gemini`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: content }),
        });

        if (!response.ok) {
            console.log("Response not ok");
        }

        const payload = await response.json();

        if (payload.error) {
            throw new Error(payload.error);
        }

        const medicalData: MedicalData = JSON.parse(payload.text);

        return { success: true, error: null, data: medicalData };
    } catch (err) {
        console.log(`\nError: ${err}`);
        return {
            success: false,
            error:
                String(err) ||
                "Something went wrong analysing the conversation.",
            data: null,
        };
    }
}
