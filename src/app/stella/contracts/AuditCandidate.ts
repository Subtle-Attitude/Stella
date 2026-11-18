// src/app/stella/contracts/AuditCandidate.ts
export interface AuditCandidate {
  subject: string;

  text: string;

  confidence:
    | "low"
    | "medium";

  evidenceStrength:
    | "limited"
    | "moderate"
    | "strong";
}