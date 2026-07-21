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
        const baseURL = "http://localhost:8000";

        const response = await fetch(`${baseURL}/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ conversation: content }),
        });

        if (!response.ok) {
            console.log("Response not ok", response);
        }

        const payload = await response.json();

        if (payload.error) {
            throw new Error(payload.error);
        }

        console.log(payload);
        const medicalData: MedicalData = payload;

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
