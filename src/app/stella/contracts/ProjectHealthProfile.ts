// src/app/stella/contracts/ProjectHealthProfile.ts
export interface ProjectHealthProfile {
  project: string;
  status: "healthy" | "emerging" | "stalled" | "at_risk";
  progressPercentage: number;
  completedActions: number;
  pendingActions: number;
  blockedActions: number;
}