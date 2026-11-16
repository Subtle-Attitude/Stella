// src/app/stella/tests/unit/nextActionEngine.test.ts
import { describe, it, expect } from "vitest";
import { NextActionEngine } from "../../../../stella/planning/NextActionEngine";

describe("NextActionEngine", () => {
  const engine = new NextActionEngine();

  it("suggests atlas actions", () => {
    const actions = engine.suggest("Atlas", "Launch Atlas");
    expect(actions).toContain("review launch checklist");
  });

  it("suggests stella actions", () => {
    const actions = engine.suggest("Stella OS", "Build Stella");
    expect(actions).toContain("review current architecture");
  });

  it("returns fallback action", () => {
    expect(engine.suggest("Other", "Something else")).toEqual(["review project progress"]);
  });
});