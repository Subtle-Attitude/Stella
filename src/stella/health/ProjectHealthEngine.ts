// src/stella/health/ProjectHealthEngine.ts
import type { ProgressSummary } from "../../app/stella/contracts/ProgressSummary";
import type { ProjectHealthProfile } from "../../app/stella/contracts/ProjectHealthProfile";

export class ProjectHealthEngine {
  assess(project: string, summary: ProgressSummary): ProjectHealthProfile {
    const progressPercentage =
      summary.total === 0 ? 0 : Math.round((summary.completed / summary.total) * 100);

    let status: ProjectHealthProfile["status"];

    if (summary.blocked > 0 && summary.blocked >= summary.completed) {
      status = "at_risk";
    } else if (summary.completed === 0 && summary.pending > 0 && summary.blocked === 0) {
      status = "stalled";
    } else if (progressPercentage >= 70 && summary.blocked === 0) {
      status = "healthy";
    } else {
      status = "emerging";
    }

    return {
      project,
      status,
      progressPercentage,
      completedActions: summary.completed,
      pendingActions: summary.pending,
      blockedActions: summary.blocked,
    };
  }
}