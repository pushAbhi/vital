"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Pencil, X } from "lucide-react";

export default function HumanReview() {
    const router = useRouter();
    const [visible, setVisible] = useState(true);
    const [selected, setSelected] = useState<"approve" | "edit" | "reject" | null>(
        null,
    );

    if (!visible) return null;

    function handleApprove() {
        setSelected("approve");
        setVisible(false);
    }

    function handleEdit() {
        setSelected("edit");
        setVisible(false);
    }

    function handleReject() {
        setSelected("reject");
        router.push("/");
    }

    return (
        <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="min-w-[180px]">
                    <h3 className="text-sm font-semibold text-slate-800">
                        Human Review
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Please review the AI analysis before saving to client
                        profile.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 flex-1">
                    <button
                        type="button"
                        onClick={handleApprove}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                            selected === "approve"
                                ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                                : "border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50"
                        }`}
                    >
                        <Check className="w-4 h-4" />
                        <span className="flex flex-col items-start leading-tight">
                            <span>Approve</span>
                            <span className="text-[10px] font-normal opacity-70">
                                Mark as accurate
                            </span>
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={handleEdit}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                            selected === "edit"
                                ? "border-sky-400 bg-sky-50 text-sky-700"
                                : "border-sky-200 bg-sky-50/50 text-sky-700 hover:bg-sky-50"
                        }`}
                    >
                        <Pencil className="w-4 h-4" />
                        <span className="flex flex-col items-start leading-tight">
                            <span>Edit</span>
                            <span className="text-[10px] font-normal opacity-70">
                                Modify before saving
                            </span>
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={handleReject}
                        className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50/50 text-red-700 hover:bg-red-50 px-4 py-2.5 text-sm font-medium transition-colors"
                    >
                        <X className="w-4 h-4" />
                        <span className="flex flex-col items-start leading-tight">
                            <span>Reject</span>
                            <span className="text-[10px] font-normal opacity-70">
                                Not accurate / not useful
                            </span>
                        </span>
                    </button>
                </div>
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-400">
                AI can make mistakes. Please verify important insights.
            </p>
        </section>
    );
}
