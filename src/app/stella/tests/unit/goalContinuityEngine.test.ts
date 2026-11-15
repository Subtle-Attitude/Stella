// src/app/stella/tests/unit/goalContinuityEngine.test.ts
import { describe, it, expect } from "vitest";
import { GoalContinuityEngine } from "../../../../stella/goals/GoalContinuityEngine";
import type { GoalProfile } from "../../contracts/GoalProfile";

describe("GoalContinuityEngine", () => {
  const engine = new GoalContinuityEngine();

  const profile = (frequency: number): GoalProfile => ({
    goal: "test",
    frequency,
    firstSeen: new Date(),
    lastSeen: new Date(),
    status: "identified",
    associatedThemes: [],
    supportingMemoryIds: [],
  });

  it("classifies isolated", () => {
    expect(engine.classify(profile(1))).toBe("isolated");
  });

  it("classifies emerging", () => {
    expect(engine.classify(profile(3))).toBe("emerging");
  });

  it("classifies persistent", () => {
    expect(engine.classify(profile(5))).toBe("persistent");
  });
});