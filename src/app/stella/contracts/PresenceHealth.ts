// src/app/stella/contracts/PresenceHealth.ts
export interface PresenceHealth {
  constitutionalCompliance: number;
  expressionIntegrity: number;
  health: "healthy" | "needs_review";
}