// src/stella/planning/ProjectPlanner.ts
import type { PlanProfile } from "../../app/stella/contracts/PlanProfile";
import { NextActionEngine } from "./NextActionEngine";
import { PlanRegistry } from "./PlanRegistry";

export class ProjectPlanner {
  constructor(
    private readonly engine = new NextActionEngine(),
    private readonly registry = new PlanRegistry()
  ) {}

  buildPlan(project: string, goal: string): PlanProfile {
    const actions = this.engine.suggest(project, goal);
    return this.registry.create(project, goal, actions);
  }
}