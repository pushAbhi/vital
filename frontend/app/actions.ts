"use server";

import { FormState, MedicalData } from "./types";

const BACKEND_URL = process.env.BACKEND_URL;
const SECRET = process.env.FRONTEND_SECRET_KEY;

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

    if (!BACKEND_URL || !SECRET) {
        console.error(
            "Missing environment variables: BACKEND_URL or FRONTEND_SECRET_KEY",
        );
        return {
            success: false,
            error: "Server configuration error. Please contact support.",
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

        const payload = await response.json();

        if (!response.ok) {
            console.error(
                `Backend failed with status ${response.status}:`,
                payload.detail,
            );
            return { success: false, error: payload.detail, data: null };
        }

        if (payload.error) {
            throw new Error(payload.error);
        }

        const medicalData: MedicalData = payload;
        console.log("Successfully retrieved medical data:", medicalData);

        return { success: true, error: null, data: medicalData };
    } catch (err) {
        console.log(`\nError: ${err}`);
        return {
            success: false,
            error: "Something went wrong analysing the conversation.",
            data: null,
        };
    }
}
