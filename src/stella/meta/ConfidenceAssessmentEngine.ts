// src/stella/meta/ConfidenceAssessmentEngine.ts
import type { ConfidenceAssessment } from "../../app/stella/contracts/ConfidenceAssessment";

export class ConfidenceAssessmentEngine {
  assess(subject: string, evidenceCount: number): ConfidenceAssessment {
    if (evidenceCount >= 3) {
      return { subject, confidence: "medium", evidenceStrength: "strong" };
    }
    if (evidenceCount === 2) {
      return { subject, confidence: "medium", evidenceStrength: "moderate" };
    }
    return { subject, confidence: "low", evidenceStrength: "limited" };
  }
}