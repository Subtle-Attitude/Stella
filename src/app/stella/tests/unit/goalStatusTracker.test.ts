// src/app/stella/tests/unit/goalStatusTracker.test.ts
import { describe, it, expect } from "vitest";
import { GoalStatusTracker } from "../../../../stella/goals/GoalStatusTracker";
import type { GoalProfile } from "../../contracts/GoalProfile";

describe("GoalStatusTracker", () => {
  const tracker = new GoalStatusTracker();

  const base: GoalProfile = {
    goal: "launch atlas",
    frequency: 1,
    firstSeen: new Date(),
    lastSeen: new Date(),
    status: "identified",
    associatedThemes: [],
    supportingMemoryIds: [],
  };

  it("marks active", () => {
    expect(tracker.markActive(base).status).toBe("active");
  });

  it("marks completed", () => {
    expect(tracker.markCompleted(base).status).toBe("completed");
  });

  it("marks abandoned", () => {
    expect(tracker.markAbandoned(base).status).toBe("abandoned");
  });
});