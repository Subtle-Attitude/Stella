// src/app/stella/tests/unit/polarityValidator.test.ts
import { describe, it, expect } from "vitest";
import { PolarityValidator } from "../../../../stella/polarity/PolarityValidator";
import type { Polarity } from "../../contracts/Polarity";

describe("PolarityValidator", () => {
  const validator = new PolarityValidator();

  const base = (a: string, b: string): Polarity => ({
    id: "p1",
    valueA: a,
    valueB: b,
    description: "balance",
    source: "observed_pattern",
    supportingMemoryIds: [],
    supportingThemes: [],
    confidence: "medium",
    status: "active",
    createdAt: new Date(),
  });

  it("accepts Growth ↔ Stability", () => {
    expect(validator.validate(base("Growth", "Stability"))).toBe(true);
  });

  it("accepts Belonging ↔ Autonomy", () => {
    expect(validator.validate(base("Belonging", "Autonomy"))).toBe(true);
  });

  it("rejects Good vs Evil", () => {
    const bad = base("Good", "Evil");
    bad.description = "good vs evil";
    expect(validator.validate(bad)).toBe(false);
  });
});