"use server";

import { FormState, MedicalData } from "../types/types";

import { z } from "zod";

const BACKEND_URL = process.env.BACKEND_URL;
const SECRET = process.env.FRONTEND_SECRET_KEY;

const conversationSchema = z
    .string()
    .trim()
    .min(100, "Conversation is too short to analyze")
    .max(
        20000,
        "Conversation is too long, please trim under 20,000 characters",
    );

export async function handleFormSubmit(
    _prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const raw = formData.get("content") as string;

    if (!raw || !raw.trim()) {
        return {
            success: false,
            error: "Please paste a client-coach conversation.",
            data: null,
        };
    }

    const parsed = conversationSchema.safeParse(raw);
    if (!parsed.success) {
        return {
            success: false,
            error: parsed.error.issues[0].message,
            data: null,
        };
    }

    const content = parsed.data;

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
