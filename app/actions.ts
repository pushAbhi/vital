"use server";

interface FormState {
    success: boolean;
    error: string | null;
    data?: MedicalData | null;
}

export interface MedicalData {
    diagnosysSummary: string[];
    nutritionAdherence: number;
    exerciseSteps: number;
    sleepAmount: number;
    waterIntake: number;
    symptomsStress: string;
    engagementLevel: string;
    keyBarriers: string;
    pendingActions: string[];
    risksAndAttentionFlags: string[];
    recommendedActions: string;
}

export async function handleFormSubmit(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const content = formData.get("content") as string;

    if (!content) {
        return { success: false, error: "Please input content" };
    }

    try {
        console.log(`Saving Data to DB : ${content}`);

        const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
        const response = await fetch(`${baseURL}/api/gemini`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: content }),
        });

        if (!response.ok) {
            throw new Error(`response ERROR: ${response.status}`);
        }

        const data = await response.json();

        const medicalData: MedicalData = JSON.parse(data.text);

        console.log("Data from API route : ", medicalData);

        return { success: true, error: null, data: medicalData };
    } catch (err) {
        console.log(`Error: ${err}`);
        return { success: false, error: "Something went wrong." };
    }
}
