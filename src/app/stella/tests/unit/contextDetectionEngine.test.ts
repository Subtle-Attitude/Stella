// src/app/stella/tests/unit/contextDetectionEngine.test.ts
import { describe, it, expect } from "vitest";
import { ContextDetectionEngine } from "../../../../stella/attunement/ContextDetectionEngine";

describe("ContextDetectionEngine", () => {
  const engine = new ContextDetectionEngine();

  it("detects planning", () => {
    expect(engine.detect("Help me prioritize next steps.")).toBe("planning");
  });

  it("detects reflection", () => {
    expect(engine.detect("I keep noticing this pattern.")).toBe("reflection");
  });

  it("detects problem solving", () => {
    expect(engine.detect("Let's troubleshoot this bug.")).toBe("problem_solving");
  });

  it("detects creative exploration", () => {
    expect(engine.detect("Let's explore possibilities.")).toBe("creative_exploration");
  });
});