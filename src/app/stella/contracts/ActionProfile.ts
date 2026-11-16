// src/app/stella/contracts/ActionProfile.ts
export interface ActionProfile {
  action: string;
  project: string;
  goal: string;
  createdAt: Date;
  completedAt?: Date;
  status: "pending" | "in_progress" | "completed" | "blocked";
}