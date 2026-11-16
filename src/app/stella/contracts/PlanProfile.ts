// src/app/stella/contracts/PlanProfile.ts
export interface PlanProfile {
  project: string;
  goal: string;
  actions: string[];
  createdAt: Date;
  status: "draft" | "active" | "completed";
}