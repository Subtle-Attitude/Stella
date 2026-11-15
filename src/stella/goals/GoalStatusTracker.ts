// src/stella/goals/GoalStatusTracker.ts
import type { GoalProfile } from "../../app/stella/contracts/GoalProfile";

export class GoalStatusTracker {
  markActive(profile: GoalProfile): GoalProfile {
    return { ...profile, status: "active" };
  }

  markCompleted(profile: GoalProfile): GoalProfile {
    return { ...profile, status: "completed" };
  }

  markAbandoned(profile: GoalProfile): GoalProfile {
    return { ...profile, status: "abandoned" };
  }
}