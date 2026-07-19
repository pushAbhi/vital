"use server";

interface FormState {
    success: boolean;
    error: string | null;
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
        return { success: true, error: null };
    } catch (err) {
        console.log(`Error: ${err}`);
        return { success: false, error: "Something went wrong." };
    }
}
