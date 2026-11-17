import { describe, it, expect } from "vitest";
import { NarrativeEvolutionNarrativeBuilder } from "../../../../stella/narrative/NarrativeEvolutionNarrativeBuilder";
import type { NarrativeEvolution } from "../../contracts/NarrativeEvolution";

describe("NarrativeEvolutionNarrativeBuilder", () => {
  const builder = new NarrativeEvolutionNarrativeBuilder();

  const evolution: NarrativeEvolution = {
    id: "e1",
    sourceTheme: "Exploration",
    evolvedTheme: "Stewardship",
    evidence: ["Growth", "Stewardship"],
    confidence: "medium",
    explanation: "observed",
    status: "active",
    createdAt: new Date(),
  };

  it("uses constitutional language", () => {
    const text = builder.build(evolution);

    expect(text).toContain(
      "possible narrative evolution"
    );

    expect(text).toContain(
      "appears to connect"
    );

    expect(text).not.toContain(
      "destiny"
    );

    expect(text).not.toContain(
      "purpose"
    );
  });
});