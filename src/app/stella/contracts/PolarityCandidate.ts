// src/app/stella/contracts/PolarityCandidate.ts
export interface PolarityCandidate {
  valueA: string;
  valueB: string;
  confidence: "low" | "medium";
  evidence: string[];
}