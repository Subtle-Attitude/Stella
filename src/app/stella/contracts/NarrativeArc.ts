// src/app/stella/contracts/NarrativeArc.ts
export interface NarrativeArc {
  themes: string[];
  transitions: string[];
  confidence: "low" | "medium";
}