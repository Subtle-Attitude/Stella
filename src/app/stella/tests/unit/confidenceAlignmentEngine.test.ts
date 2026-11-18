// src/app/stella/tests/unit/confidenceAlignmentEngine.test.ts
import { describe, it, expect } from "vitest";
import { ConfidenceAlignmentEngine } from "../../../../stella/audit/ConfidenceAlignmentEngine";

describe("ConfidenceAlignmentEngine", () => {
  const engine = new ConfidenceAlignmentEngine();

  it("strong + medium → aligned", () => {
    expect(engine.align("medium", "strong")).toBe("aligned");
  });

  it("limited + low → aligned", () => {
    expect(engine.align("low", "limited")).toBe("aligned");
  });

  it("limited + medium → overstated", () => {
    expect(engine.align("medium", "limited")).toBe("overstated");
  });
});