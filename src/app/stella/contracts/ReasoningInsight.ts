// src/app/stella/contracts/ReasoningInsight.ts
export interface ReasoningInsight {
  insight: string;
  supportingThemes: string[];
  supportingSituations: string[];
  supportingGoals: string[];
  supportingProjects: string[];
  confidence: "low" | "medium" | "high";
}