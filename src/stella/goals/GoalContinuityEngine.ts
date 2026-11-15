// src/stella/goals/GoalContinuityEngine.ts
import type { GoalProfile } from "../../app/stella/contracts/GoalProfile";

export type GoalContinuity = "isolated" | "emerging" | "persistent";

export class GoalContinuityEngine {
  classify(profile: GoalProfile): GoalContinuity {
    if (profile.frequency === 1) return "isolated";
    if (profile.frequency < 5) return "emerging";
    return "persistent";
  }
}