// src/stella/projects/ProjectContinuityEngine.ts
import type { ProjectProfile } from "../../app/stella/contracts/ProjectProfile";

export type ProjectContinuity = "isolated" | "emerging" | "persistent";

export class ProjectContinuityEngine {
  classify(profile: ProjectProfile): ProjectContinuity {
    const count = profile.goals.length;
    if (count === 1) return "isolated";
    if (count < 4) return "emerging";
    return "persistent";
  }
}