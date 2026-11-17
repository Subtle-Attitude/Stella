// src/app/stella/contracts/Polarity.ts
export interface Polarity {
  id: string;
  valueA: string;
  valueB: string;
  description: string;
  source: "observed_pattern" | "user_confirmed";
  supportingMemoryIds: string[];
  supportingThemes: string[];
  confidence: "low" | "medium";
  status: "active" | "archived";
  createdAt: Date;
}