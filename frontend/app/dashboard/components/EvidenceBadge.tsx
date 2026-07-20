import { EvidenceType } from "@/app/types";

const styles: Record<EvidenceType, string> = {
    F: "bg-emerald-100 text-emerald-700",
    R: "bg-sky-100 text-sky-700",
    I: "bg-violet-100 text-violet-700",
    M: "bg-slate-100 text-slate-600",
};

const labels: Record<EvidenceType, string> = {
    F: "Confirmed Fact",
    R: "Client Reported",
    I: "AI Inference",
    M: "Missing",
};

export default function EvidenceBadge({ type }: { type: EvidenceType }) {
    return (
        <span
            title={labels[type]}
            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${styles[type]}`}
        >
            {type}
        </span>
    );
}

export function EvidenceLegend() {
    return (
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
                <EvidenceBadge type="F" /> Confirmed Fact
            </span>
            <span className="inline-flex items-center gap-1.5">
                <EvidenceBadge type="R" /> Client Reported
            </span>
            <span className="inline-flex items-center gap-1.5">
                <EvidenceBadge type="I" /> AI Inference
            </span>
            <span className="inline-flex items-center gap-1.5">
                <EvidenceBadge type="M" /> Missing
            </span>
        </div>
    );
}
