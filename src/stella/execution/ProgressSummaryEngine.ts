// src/stella/execution/ProgressSummaryEngine.ts
import type { ActionProfile } from "../../app/stella/contracts/ActionProfile";
import type { ProgressSummary } from "../../app/stella/contracts/ProgressSummary";

export class ProgressSummaryEngine {
  summarize(actions: ActionProfile[]): ProgressSummary {
    return {
      total: actions.length,
      pending: actions.filter((a) => a.status === "pending").length,
      inProgress: actions.filter((a) => a.status === "in_progress").length,
      completed: actions.filter((a) => a.status === "completed").length,
      blocked: actions.filter((a) => a.status === "blocked").length,
    };
  }
}