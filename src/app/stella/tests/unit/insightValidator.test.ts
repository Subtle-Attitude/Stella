// src/app/stella/tests/unit/insightValidator.test.ts
import { describe, it, expect } from "vitest";
import { InsightValidator } from "../../../../stella/reasoning/InsightValidator";
import type { ReasoningInsight } from "../../contracts/ReasoningInsight";

describe("InsightValidator", () => {
  const validator = new InsightValidator();

  const base = (insight: string): ReasoningInsight => ({
    insight,
    supportingThemes: ["theme"],
    supportingSituations: [],
    supportingGoals: [],
    supportingProjects: [],
    confidence: "medium",
  });

  it("accepts valid insights", () => {
    expect(validator.validate(base("The theme appears within the situation."))).toBe(true);
  });

  it("rejects truth claims", () => {
    expect(validator.validate(base("This proves the connection."))).toBe(false);
  });

  it("rejects identity assertions", () => {
    expect(validator.validate(base("Your identity is defined by this."))).toBe(false);
  });

  it("rejects deterministic language", () => {
    expect(validator.validate(base("You must do this."))).toBe(false);
  });

  it("rejects certainty language", () => {
    expect(validator.validate(base("This definitely means something."))).toBe(false);
    expect(validator.validate(base("This is destined to happen."))).toBe(false);
  });

  it("rejects insights with no supporting evidence", () => {
    const empty: ReasoningInsight = {
      insight: "Something appears connected.",
      supportingThemes: [],
      supportingSituations: [],
      supportingGoals: [],
      supportingProjects: [],
      confidence: "medium",
    };
    expect(validator.validate(empty)).toBe(false);
  });
});