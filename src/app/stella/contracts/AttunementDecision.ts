// src/app/stella/contracts/AttunementDecision.ts
export interface AttunementDecision {
  detectedContext: string;
  confidence: "low" | "medium";
  profile: string;
}