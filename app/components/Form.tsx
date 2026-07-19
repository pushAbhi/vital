"use client";

import { handleFormSubmit } from "../actions";
import { useActionState } from "react";

export default function Form() {
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        success: false,
        error: null,
        data: null,
    });

    const medicalData = state.data;

    return (
        <form
            className="flex flex-col flex-1 bg-gray-400 p-5"
            action={formAction}
        >
            <textarea
                className="flex-1 focus:outline-0 border border-black rounded-3xl p-5 text-2xl"
                wrap="soft"
                name="content"
            ></textarea>
            <div className="bg-powder-petal flex justify-between px-15 pt-5">
                <span>Upload a File</span>
                <button type="submit" disabled={isPending}>
                    {isPending ? "Analysing..." : "Analyse"}
                </button>
                <span>Summary : {medicalData?.exerciseSteps}</span>
            </div>
        </form>
    );
}
