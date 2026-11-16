// src/stella/execution/ActionRegistry.ts
import type { ActionProfile } from "../../app/stella/contracts/ActionProfile";

export class ActionRegistry {
  private readonly actions = new Map<string, ActionProfile>();

  private key(project: string, goal: string, action: string): string {
    return `${project.toLowerCase()}::${goal.toLowerCase()}::${action.toLowerCase()}`;
  }

  create(project: string, goal: string, action: string): ActionProfile {
    const profile: ActionProfile = {
      action,
      project,
      goal,
      createdAt: new Date(),
      status: "pending",
    };
    this.actions.set(this.key(project, goal, action), profile);
    return profile;
  }

  get(project: string, goal: string, action: string): ActionProfile | undefined {
    return this.actions.get(this.key(project, goal, action));
  }

  all(): ActionProfile[] {
    return Array.from(this.actions.values());
  }

  updateStatus(
    project: string,
    goal: string,
    action: string,
    status: ActionProfile["status"]
  ): ActionProfile | undefined {
    const existing = this.get(project, goal, action);
    if (!existing) return undefined;

    const updated: ActionProfile = {
      ...existing,
      status,
      completedAt: status === "completed" ? new Date() : existing.completedAt,
    };
    this.actions.set(this.key(project, goal, action), updated);
    return updated;
  }
}