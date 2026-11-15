// src/app/stella/tests/unit/projectGoalMapper.test.ts
import { describe, it, expect } from "vitest";
import { ProjectGoalMapper } from "../../../../stella/projects/ProjectGoalMapper";

describe("ProjectGoalMapper", () => {
  const mapper = new ProjectGoalMapper();

  it("maps atlas goals", () => {
    expect(mapper.map("launch atlas")).toBe("Atlas");
    expect(mapper.map("atlas roadmap")).toBe("Atlas");
  });

  it("maps stella goals", () => {
    expect(mapper.map("build stella")).toBe("Stella OS");
  });

  it("returns null for unrelated goals", () => {
    expect(mapper.map("grow community")).toBeNull();
  });
});