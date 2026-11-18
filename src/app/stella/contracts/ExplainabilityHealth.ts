// src/app/stella/contracts/ExplainabilityHealth.ts
export interface ExplainabilityHealth {
  explanationsGenerated: number;
  traceCoverage: number;
  health: "healthy" | "needs_review";
}