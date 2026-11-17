import { describe, it, expect } from "vitest";
import { NarrativeEvolutionValidator } from "../../../../stella/narrative/NarrativeEvolutionValidator";
import type { NarrativeEvolution } from "../../contracts/NarrativeEvolution";

describe("NarrativeEvolutionValidator", () => {
  const validator = new NarrativeEvolutionValidator();

  const base = (evolved: string): NarrativeEvolution => ({
    id: "e1",
    sourceTheme: "Exploration",
    evolvedTheme: evolved,
    evidence: [],
    confidence: "medium",
    explanation: "observed",
    status: "active",
    createdAt: new Date(),
  });

  it("accepts Stewardship", () => {
    expect(
      validator.validate(base("Stewardship"))
    ).toBe(true);
  });

  it("accepts Community Building", () => {
    expect(
      validator.validate(base("Community Building"))
    ).toBe(true);
  });

  it("rejects Destiny", () => {
    expect(
      validator.validate(base("Destiny"))
    ).toBe(false);
  });

  it("rejects Purpose", () => {
    expect(
      validator.validate(base("Purpose"))
    ).toBe(false);
  });
});