export type EvidenceType = "F" | "R" | "I" | "M";
export type RiskLevel = "High" | "Medium" | "Low";

export interface SupportingEvidence {
    quote: string;
    day: string;
    type: EvidenceType;
}

export interface RiskSeverity {
    label: string;
    level: RiskLevel;
}
export interface MedicalData {
    weekSummary: string[];
    nutritionAdherence: number;
    exerciseSteps: number;
    sleepAmount: number;
    waterIntake: number;
    symptomsStress: string;
    engagementLevel: string;
    keyBarriers: string;
    pendingActions: string[];
    recommendedActions: string;
    keyTakeaway: string;
    supportingEvidence: SupportingEvidence[];
    riskSeverities: RiskSeverity[];
    diagnosisSummary: string[];
}

export interface FormState {
    success: boolean;
    error: string | null;
    data: MedicalData | null;
}
