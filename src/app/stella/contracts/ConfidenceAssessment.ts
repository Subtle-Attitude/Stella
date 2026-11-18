// src/app/stella/contracts/ConfidenceAssessment.ts
export interface ConfidenceAssessment {
  subject: string;
  confidence: "low" | "medium";
  evidenceStrength: "limited" | "moderate" | "strong";
}