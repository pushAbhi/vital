"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    type ReactNode,
} from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { handleFormSubmit } from "../actions";
import { FormState, MedicalData } from "../types";

interface AnalysisContextValue {
    state: FormState;
    formAction: (payload: FormData) => void;
    isPending: boolean;
    data: MedicalData | null;
}

const initialState: FormState = {
    success: false,
    error: null,
    data: null,
};

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

export function AnalysisProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(
        handleFormSubmit,
        initialState,
    );
    const lastDataRef = useRef<MedicalData | null>(null);

    useEffect(() => {
        if (state.success && state.data && state.data !== lastDataRef.current) {
            lastDataRef.current = state.data;
            router.push("/dashboard");
        }
    }, [state.success, state.data, router]);

    return (
        <AnalysisContext.Provider
            value={{
                state,
                formAction,
                isPending,
                data: state.data,
            }}
        >
            {children}
        </AnalysisContext.Provider>
    );
}

export function useAnalysis() {
    const ctx = useContext(AnalysisContext);
    if (!ctx) {
        throw new Error("useAnalysis must be used within AnalysisProvider");
    }
    return ctx;
}
