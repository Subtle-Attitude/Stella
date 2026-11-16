// src/stella/planning/PlanRegistry.ts
import type { PlanProfile } from "../../app/stella/contracts/PlanProfile";

export class PlanRegistry {
  private readonly plans = new Map<string, PlanProfile>();

  private key(project: string, goal: string): string {
    return `${project.toLowerCase()}::${goal.toLowerCase()}`;
  }

  create(project: string, goal: string, actions: string[] = []): PlanProfile {
    const plan: PlanProfile = {
      project,
      goal,
      actions,
      createdAt: new Date(),
      status: "draft",
    };
    this.plans.set(this.key(project, goal), plan);
    return plan;
  }

  get(project: string, goal: string): PlanProfile | undefined {
    return this.plans.get(this.key(project, goal));
  }

  all(): PlanProfile[] {
    return Array.from(this.plans.values());
  }

  updateStatus(
    project: string,
    goal: string,
    status: PlanProfile["status"]
  ): PlanProfile | undefined {
    const existing = this.get(project, goal);
    if (!existing) return undefined;

    const updated: PlanProfile = { ...existing, status };
    this.plans.set(this.key(project, goal), updated);
    return updated;
  }
}