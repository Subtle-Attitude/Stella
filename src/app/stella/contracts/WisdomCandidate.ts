// src/app/stella/contracts/WisdomCandidate.ts
export interface WisdomCandidate {
  polarityA: string;
  polarityB: string;
  integration: string;
  confidence: "low" | "medium";
  evidence: string[];
}