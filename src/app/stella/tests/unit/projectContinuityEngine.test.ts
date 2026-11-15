// src/app/stella/tests/unit/projectContinuityEngine.test.ts
import { describe, it, expect } from "vitest";
import { ProjectContinuityEngine } from "../../../../stella/projects/ProjectContinuityEngine";
import type { ProjectProfile } from "../../contracts/ProjectProfile";

describe("ProjectContinuityEngine", () => {
  const engine = new ProjectContinuityEngine();

  const profile = (goals: string[]): ProjectProfile => ({
    project: "test",
    goals,
    associatedThemes: [],
    firstSeen: new Date(),
    lastSeen: new Date(),
    status: "identified",
  });

  it("classifies isolated", () => {
    expect(engine.classify(profile(["one"]))).toBe("isolated");
  });

  it("classifies emerging", () => {
    expect(engine.classify(profile(["one", "two"]))).toBe("emerging");
  });

  it("classifies persistent", () => {
    expect(engine.classify(profile(["one", "two", "three", "four"]))).toBe("persistent");
  });
});