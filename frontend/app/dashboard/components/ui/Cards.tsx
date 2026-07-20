import { ElementType, ReactNode } from "react";
import EvidenceBadge from "../EvidenceBadge";

export function InsightCard({
    icon: Icon,
    iconBg,
    iconColor,
    title,
    body,
    badge,
}: {
    icon: ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    body: ReactNode;
    badge: "F" | "R" | "I" | "M";
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start gap-3">
                <div
                    className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${iconBg}`}
                >
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-slate-800">
                            {title}
                        </h4>
                        <EvidenceBadge type={badge} />
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function MetricCard({
    icon: Icon,
    iconColor,
    label,
    value,
    sub,
    subColor,
}: {
    icon: ElementType;
    iconColor: string;
    label: string;
    value: string;
    sub: string;
    subColor: string;
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500 mb-3">{label}</p>
            <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${iconColor}`} />
                <div>
                    <p className="text-xl font-semibold text-slate-800 leading-none">
                        {value}
                    </p>
                    <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>
                </div>
            </div>
        </div>
    );
}
