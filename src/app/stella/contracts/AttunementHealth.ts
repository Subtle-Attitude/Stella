// src/app/stella/contracts/AttunementHealth.ts
export interface AttunementHealth {
  constitutionalCompliance: number;
  contextAccuracy: number;
  health: "healthy" | "needs_review";
}