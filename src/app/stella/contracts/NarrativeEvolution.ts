// src/app/stella/contracts/NarrativeEvolution.ts

export interface NarrativeEvolution {
  id: string;

  sourceTheme: string;

  evolvedTheme: string;

  evidence: string[];

  confidence:
    | "low"
    | "medium";

  explanation: string;

  status:
    | "active"
    | "archived";

  createdAt: Date;
}