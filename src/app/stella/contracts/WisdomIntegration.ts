// src/app/stella/contracts/WisdomIntegration.ts
export interface WisdomIntegration {
  id: string;
  polarityA: string;
  polarityB: string;
  integration: string;
  description: string;
  source: "observed_pattern" | "user_confirmed";
  supportingValues: string[];
  supportingThemes: string[];
  supportingNarrativeEvolutions: string[];
  confidence: "low" | "medium";
  status: "active" | "archived";
  createdAt: Date;
}