// src/app/stella/contracts/LifeThemeCandidate.ts
export interface LifeThemeCandidate {
  name: string;
  confidence: "low" | "medium";
  evidence: string[];
}