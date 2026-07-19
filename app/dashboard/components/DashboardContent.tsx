"use client";

import { useEffect, type ElementType, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
    Utensils,
    Footprints,
    Moon,
    Droplets,
    Brain,
    Activity,
    Flag,
    ClipboardList,
    AlertTriangle,
    Target,
    Calendar,
    MessageCircle,
    ArrowLeft,
    Upload,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useAnalysis } from "../../components/AnalysisProvider";
import type { MedicalData } from "../../actions";
import EvidenceBadge, { EvidenceLegend } from "./EvidenceBadge";
import HumanReview from "./HumanReview";
import Sidebar from "./Sidebar";

function nutritionLabel(pct: number) {
    if (pct >= 80) return { text: "Good", color: "text-emerald-600" };
    if (pct >= 50) return { text: "Fair", color: "text-amber-600" };
    return { text: "Low", color: "text-red-600" };
}

function sleepLabel(hrs: number) {
    if (hrs >= 7) return { text: "On target", color: "text-emerald-600" };
    if (hrs >= 6) return { text: "Below target", color: "text-amber-600" };
    return { text: "Below target", color: "text-red-600" };
}

function waterLabel(liters: number) {
    if (liters >= 3) return { text: "Adequate", color: "text-emerald-600" };
    if (liters >= 2) return { text: "Moderate", color: "text-amber-600" };
    return { text: "Low", color: "text-red-600" };
}

function stressColor(level: string) {
    const l = level.toLowerCase();
    if (l.includes("low")) return "text-emerald-600";
    if (l.includes("moderate") || l.includes("medium")) return "text-amber-600";
    return "text-red-600";
}

function engagementColor(level: string) {
    const l = level.toLowerCase();
    if (l.includes("good")) return "text-emerald-600";
    if (l.includes("moderate") || l.includes("medium")) return "text-amber-600";
    return "text-red-600";
}

function MetricCard({
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

function InsightCard({
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

function DashboardBody({ data }: { data: MedicalData }) {
    const summary = data.diagonosysSummary ?? [];
    const nutrition = data.nutritionAdherence ?? 0;
    const steps = data.exerciseSteps ?? 0;
    const sleep = data.sleepAmount ?? 0;
    const water = data.waterIntake ?? 0;
    const stress = data.symptomsStress ?? "—";
    const engagement = data.engagementLevel ?? "—";
    const barriers = data.keyBarriers ?? "—";
    const pending = data.pendingActions ?? [];
    const risks = data.risksAndAttentionFlags ?? [];
    const recommended = data.recommendedActions ?? "—";

    const nLabel = nutritionLabel(nutrition);
    const sLabel = sleepLabel(sleep);
    const wLabel = waterLabel(water);

    //hardcoded
    const keyTakeaway =
        "Client is engaged and making effort, but chronic short sleep, work stress, and inconsistent meal/protein planning are the primary risks. Bloating and acidity remain intermittent.";

    //hardcoded
    const supportingEvidence = [
        {
            quote: "Slept only around 5 hours last night. Daughter had exams, so I was awake late.",
            day: "Day 1",
            type: "R" as const,
        },
        {
            quote: "Still having acidity and bloating.",
            day: "Day 2",
            type: "R" as const,
        },
        {
            quote: "Water 4 litres, Sleep 5 hours, Steps around 8,000, Exercise only walking.",
            day: "Day 3",
            type: "F" as const,
        },
        {
            quote: "During a meeting today I was so tired that my head went down on the table and I actually slept for a few seconds.",
            day: "Day 7",
            type: "R" as const,
        },
        {
            quote: "Slept better last night, around 8 hours. Energy feels much better today.",
            day: "Day 8",
            type: "R" as const,
        },
    ];

    //hardcoded
    const riskSeverities: { label: string; level: "High" | "Medium" | "Low" }[] =
        risks.map((r, i) => ({
            label: r,
            level: i === 0 ? "High" : i === 1 ? "High" : "Medium",
        }));

    return (
        <div className="flex-1 min-w-0 overflow-y-auto">
            {/* Top bar */}
            <header className="sticky top-0 z-10 bg-[#F7F8FA]/90 backdrop-blur border-b border-slate-200/80 px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Clients
                    </Link>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            <Upload className="w-4 h-4" />
                            Upload Conversation
                        </button>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#5B4BDB] px-3 py-2 text-sm font-medium text-white hover:bg-[#4a3bc7] transition-colors"
                        >
                            <Sparkles className="w-4 h-4" />
                            Analyze New
                        </Link>
                    </div>
                </div>
            </header>

            <div className="px-6 py-6 space-y-6 max-w-[1400px]">
                {/* Client header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-violet-100 text-violet-700 text-lg font-semibold">
                            AC
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold text-slate-900">
                                    Anonymous Client
                                </h1>
                                {/*hardcoded*/}
                                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium px-2 py-0.5 border border-emerald-100">
                                    Active
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                                {/*hardcoded*/}
                                <span className="inline-flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Week: Day 1 – Day 8
                                </span>
                                {/*hardcoded*/}
                                <span className="inline-flex items-center gap-1">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    Source: Client–Coach Conversation
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*hardcoded*/}
                    <p className="text-xs text-slate-400 shrink-0">
                        Analysed from pasted conversation
                    </p>
                </div>

                {/* Metric strip */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                    <MetricCard
                        icon={Utensils}
                        iconColor="text-emerald-600"
                        label="Nutrition Adherence"
                        value={`${nutrition}%`}
                        sub={nLabel.text}
                        subColor={nLabel.color}
                    />
                    <MetricCard
                        icon={Footprints}
                        iconColor="text-sky-600"
                        label="Exercise / Steps"
                        value={steps.toLocaleString()}
                        sub="Steps avg"
                        subColor="text-sky-600"
                    />
                    <MetricCard
                        icon={Moon}
                        iconColor="text-indigo-500"
                        label="Sleep"
                        value={`${sleep} hrs`}
                        sub={sLabel.text}
                        subColor={sLabel.color}
                    />
                    <MetricCard
                        icon={Droplets}
                        iconColor="text-cyan-600"
                        label="Water Intake"
                        value={`${water} L/day`}
                        sub={wLabel.text}
                        subColor={wLabel.color}
                    />
                    <MetricCard
                        icon={Brain}
                        iconColor="text-orange-500"
                        label="Symptoms / Stress"
                        value={stress}
                        sub="Stress reported"
                        subColor={stressColor(stress)}
                    />
                    <MetricCard
                        icon={Activity}
                        iconColor="text-emerald-600"
                        label="Engagement"
                        value={engagement}
                        sub="Responds regularly"
                        subColor={engagementColor(engagement)}
                    />
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    {/* Details & Insights */}
                    <div className="xl:col-span-2 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h2 className="text-sm font-semibold text-slate-800">
                                Details & Insights
                            </h2>
                            <EvidenceLegend />
                        </div>

                        {/* Weekly summary */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Weekly Client Summary
                                </h3>
                                <EvidenceBadge type="I" />
                            </div>
                            <ul className="space-y-2">
                                {summary.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-2 text-xs text-slate-600 leading-relaxed"
                                    >
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0B1F3A] shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <InsightCard
                                icon={Utensils}
                                iconBg="bg-emerald-50"
                                iconColor="text-emerald-600"
                                title="Nutrition Adherence"
                                badge="R"
                                body={
                                    <>
                                        {nutrition}% adherence estimated this
                                        period. Protein often low at breakfast;
                                        meals skipped on hectic days.
                                    </>
                                }
                            />
                            <InsightCard
                                icon={Activity}
                                iconBg="bg-emerald-50"
                                iconColor="text-emerald-600"
                                title="Engagement Level"
                                badge="F"
                                body={
                                    <>
                                        {engagement} — client shared multi-day
                                        updates on meals, water, sleep, steps
                                        and symptoms.
                                    </>
                                }
                            />
                            <InsightCard
                                icon={Footprints}
                                iconBg="bg-sky-50"
                                iconColor="text-sky-600"
                                title="Exercise / Steps"
                                badge="F"
                                body={
                                    <>
                                        Averaged ~{steps.toLocaleString()}{" "}
                                        steps/day. Walking, stretching, running
                                        and household movement reported.
                                    </>
                                }
                            />
                            <InsightCard
                                icon={Flag}
                                iconBg="bg-red-50"
                                iconColor="text-red-500"
                                title="Key Barriers"
                                badge="R"
                                body={barriers}
                            />
                            <InsightCard
                                icon={Moon}
                                iconBg="bg-indigo-50"
                                iconColor="text-indigo-500"
                                title="Sleep"
                                badge="R"
                                body={
                                    <>
                                        Avg sleep ~{sleep} hrs/night. Multiple
                                        nights ~5–5.5 hrs; improved to ~8 hrs on
                                        Day 8.
                                    </>
                                }
                            />
                            <InsightCard
                                icon={ClipboardList}
                                iconBg="bg-amber-50"
                                iconColor="text-amber-600"
                                title="Pending Actions"
                                badge="R"
                                body={
                                    <ul className="space-y-1">
                                        {pending.map((a, i) => (
                                            <li key={i}>• {a}</li>
                                        ))}
                                    </ul>
                                }
                            />
                            <InsightCard
                                icon={Droplets}
                                iconBg="bg-cyan-50"
                                iconColor="text-cyan-600"
                                title="Water Intake"
                                badge="F"
                                body={
                                    <>
                                        ~{water} L/day average from reported
                                        days (e.g. 4 L Day 3, 3.5 L Day 8).
                                    </>
                                }
                            />
                            <InsightCard
                                icon={AlertTriangle}
                                iconBg="bg-red-50"
                                iconColor="text-red-500"
                                title="Risk / Attention Flags"
                                badge="I"
                                body={
                                    <ul className="space-y-1">
                                        {risks.map((r, i) => (
                                            <li key={i}>• {r}</li>
                                        ))}
                                    </ul>
                                }
                            />
                            <InsightCard
                                icon={Brain}
                                iconBg="bg-orange-50"
                                iconColor="text-orange-500"
                                title="Symptoms / Stress"
                                badge="R"
                                body={
                                    <>
                                        Stress: {stress}. Intermittent acidity
                                        and bloating; severe work fatigue Day 7
                                        (microsleep in meeting).
                                    </>
                                }
                            />
                            <InsightCard
                                icon={Target}
                                iconBg="bg-emerald-50"
                                iconColor="text-emerald-600"
                                title="Recommended Next Action"
                                badge="I"
                                body={recommended}
                            />
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                            <h3 className="text-sm font-semibold text-slate-800 mb-3">
                                Key Takeaway
                            </h3>
                            <div className="rounded-xl bg-violet-50 border border-violet-100 p-3 text-xs text-violet-900 leading-relaxed">
                                {keyTakeaway}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                            <h3 className="text-sm font-semibold text-slate-800 mb-3">
                                Risk / Attention Flags
                            </h3>
                            <div className="space-y-2">
                                {riskSeverities.map((r, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-start justify-between gap-2 rounded-xl px-3 py-2.5 text-xs ${
                                            r.level === "High"
                                                ? "bg-red-50 text-red-800"
                                                : "bg-amber-50 text-amber-800"
                                        }`}
                                    >
                                        <span className="leading-relaxed">
                                            {r.label}
                                        </span>
                                        <span
                                            className={`shrink-0 inline-flex items-center gap-1 font-medium ${
                                                r.level === "High"
                                                    ? "text-red-600"
                                                    : "text-amber-600"
                                            }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    r.level === "High"
                                                        ? "bg-red-500"
                                                        : "bg-amber-500"
                                                }`}
                                            />
                                            {r.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-slate-800">
                                    Supporting Evidence
                                </h3>
                            </div>
                            <div className="space-y-2">
                                {supportingEvidence.map((e, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl bg-slate-50 border border-slate-100 p-3"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-xs text-slate-700 leading-relaxed italic">
                                                &ldquo;{e.quote}&rdquo;
                                            </p>
                                            <EvidenceBadge type={e.type} />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1.5">
                                            — {e.day}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Human review */}
                <HumanReview />
            </div>
        </div>
    );
}

export default function DashboardContent() {
    const { data, state } = useAnalysis();
    const router = useRouter();

    useEffect(() => {
        if (!data && !state.success) {
            router.replace("/");
        }
    }, [data, state.success, router]);

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] text-sm text-slate-500">
                Loading analysis…
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F7F8FA]">
            <Sidebar />
            <DashboardBody data={data} />
        </div>
    );
}
