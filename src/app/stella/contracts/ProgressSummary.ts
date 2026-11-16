// src/app/stella/contracts/ProgressSummary.ts
export interface ProgressSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  blocked: number;
}