// src/app/stella/contracts/ConstitutionalHealth.ts
export interface ConstitutionalHealth {
  auditsPassed: number;
  auditsFailed: number;
  health: "healthy" | "needs_review";
}