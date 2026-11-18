// src/app/stella/tests/unit/wisdomIntegrationValidator.test.ts
import { describe, it, expect } from "vitest";
import { WisdomIntegrationValidator } from "../../../../stella/wisdom/WisdomIntegrationValidator";
import type { WisdomIntegration } from "../../contracts/WisdomIntegration";

describe("WisdomIntegrationValidator", () => {
  const validator = new WisdomIntegrationValidator();

  const base = (integration: string): WisdomIntegration => ({
    id: "w1",
    polarityA: "Growth",
    polarityB: "Stability",
    integration,
    description: "observed",
    source: "observed_pattern",
    supportingValues: [],
    supportingThemes: [],
    supportingNarrativeEvolutions: [],
    confidence: "medium",
    status: "active",
    createdAt: new Date(),
  });

  it("accepts Sustainable Growth", () => {
    expect(validator.validate(base("Sustainable Growth"))).toBe(true);
  });

  it("accepts Creative Discipline", () => {
    expect(validator.validate(base("Creative Discipline"))).toBe(true);
  });

  it("rejects Ultimate Truth", () => {
    const bad = base("Ultimate Truth");
    bad.description = "ultimate truth";
    expect(validator.validate(bad)).toBe(false);
  });

  it("rejects Final Purpose", () => {
    const bad = base("Final Purpose");
    bad.description = "final purpose";
    expect(validator.validate(bad)).toBe(false);
  });
});