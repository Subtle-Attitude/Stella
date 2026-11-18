// src/app/stella/contracts/IdentityHealth.ts
export interface IdentityHealth {
  alignedTraits: number;
  totalTraits: number;
  health: "healthy" | "needs_review";
}