// src/app/stella/contracts/NarrativeEvolutionCandidate.ts
export interface NarrativeEvolutionCandidate {
  sourceTheme: string;
  evolvedTheme: string;
  confidence: "low" | "medium";
  evidence: string[];
}