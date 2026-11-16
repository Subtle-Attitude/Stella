// src/stella/execution/ExecutionTracker.ts
import type { ActionProfile } from "../../app/stella/contracts/ActionProfile";

export class ExecutionTracker {
  start(action: ActionProfile): ActionProfile {
    return { ...action, status: "in_progress" };
  }

  complete(action: ActionProfile): ActionProfile {
    return { ...action, status: "completed", completedAt: new Date() };
  }

  block(action: ActionProfile): ActionProfile {
    return { ...action, status: "blocked" };
  }
}