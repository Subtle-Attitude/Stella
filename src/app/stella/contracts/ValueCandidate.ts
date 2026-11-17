// src/app/stella/contracts/ValueCandidate.ts
export interface ValueCandidate {
  name: string;
  confidence: "low" | "medium";
  evidence: string;
}