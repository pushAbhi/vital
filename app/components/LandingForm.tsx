"use client";

import { useState } from "react";
import { useAnalysis } from "./AnalysisProvider";
import { Loader2, Sparkles } from "lucide-react";
import { exampleScript1 } from "./ExampleScripts";

export default function LandingForm() {
    const { formAction, isPending, state } = useAnalysis();
    const [textAreaValue, setTextAreaValue] = useState<string>("");

    function pasteExampleScript() {
        setTextAreaValue(exampleScript1);
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-surface px-4">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-navy text-white mb-4">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-semibold text-navy tracking-tight">
                        Vital
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Paste a client-coach conversation to generate client
                        intelligence.
                    </p>
                </div>

                <form
                    action={formAction}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
                >
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="content"
                            className="block text-md font-medium text-slate-700 mb-2"
                        >
                            Conversation
                        </label>
                        <button
                            className="block text-sm font-medium text-red-400 mb-2 hover:cursor-pointer"
                            type="button"
                            onClick={pasteExampleScript}
                        >
                            Paste example script
                        </button>
                    </div>
                    <textarea
                        id="content"
                        name="content"
                        required
                        rows={12}
                        placeholder="Paste the client-coach conversation here…"
                        className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-navy transition-shadow"
                        disabled={isPending}
                        defaultValue={textAreaValue}
                        value={textAreaValue}
                    ></textarea>

                    {state.error && (
                        <p className="mt-3 text-sm text-red-600" role="alert">
                            {state.error}
                        </p>
                    )}

                    <div className="mt-5 flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Analysing…
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Analyse conversation
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-center text-xs text-slate-400">
                    AI can make mistakes. Always verify important insights.
                </p>
            </div>
        </div>
    );
}
