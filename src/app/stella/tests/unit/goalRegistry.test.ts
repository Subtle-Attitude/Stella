// src/app/stella/tests/unit/goalRegistry.test.ts
import { describe, it, expect } from "vitest";
import { GoalRegistry } from "../../../../stella/goals/GoalRegistry";

describe("GoalRegistry", () => {
  it("creates goals", () => {
    const registry = new GoalRegistry();
    const profile = registry.record("launch atlas");
    expect(profile.frequency).toBe(1);
    expect(profile.status).toBe("identified");
  });

  it("increments frequency and stores themes and memory ids", () => {
    const registry = new GoalRegistry();
    registry.record("launch atlas", "m1", "intentional growth");
    const updated = registry.record("launch atlas", "m2", "atlas development");
    expect(updated.frequency).toBe(2);
    expect(updated.associatedThemes).toContain("intentional growth");
    expect(updated.supportingMemoryIds).toContain("m1");
    expect(updated.supportingMemoryIds).toContain("m2");
  });

  it("does not duplicate memory ids", () => {
    const registry = new GoalRegistry();
    registry.record("launch atlas", "m1");
    registry.record("launch atlas", "m1");
    const profile = registry.get("launch atlas");
    expect(profile?.supportingMemoryIds).toEqual(["m1"]);
  });

  it("returns a goal by name", () => {
    const registry = new GoalRegistry();
    registry.record("launch atlas");
    expect(registry.get("launch atlas")?.goal).toBe("launch atlas");
  });

  it("returns all goals", () => {
    const registry = new GoalRegistry();
    registry.record("launch atlas");
    registry.record("build stella");
    expect(registry.all()).toHaveLength(2);
  });
});