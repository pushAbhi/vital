"use server";

import { FormState, MedicalData } from "./types";

const BACKEND_URL = process.env.BACKEND_URL;
const SECRET = process.env.FRONTEND_SECRET_KEY;

if (!SECRET) {
    console.error("FRONTEND_SECRET_KEY not set.");
} else {
    console.log("FRONTEND_URL set.");
}

if (!BACKEND_URL) {
    console.error("BACKEND_URL not set.");
} else {
    console.log("BACKEND_URL set.");
}

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
        const response = await fetch(`${BACKEND_URL}/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Frontend-Key": SECRET!,
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
