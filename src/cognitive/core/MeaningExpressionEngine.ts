// src/cognitive/core/MeaningExpressionEngine.ts

import { NarrativeEvolutionEngine }
  from "../../stella/narrative/NarrativeEvolutionEngine";

import { NarrativeEvolutionNarrativeBuilder }
  from "../../stella/narrative/NarrativeEvolutionNarrativeBuilder";

import type {
  NarrativeEvolution
} from "../../app/stella/contracts/NarrativeEvolution";

export class MeaningExpressionEngine {

  private readonly evolution =
    new NarrativeEvolutionEngine();

  private readonly narrativeBuilder =
    new NarrativeEvolutionNarrativeBuilder();

  express(
    response: string,
    input: string
  ): string {

    const lower =
      input.toLowerCase();

    const themes: string[] = [];

    const values: string[] = [];

    if (
      lower.includes("explore") ||
      lower.includes("exploration")
    ) {
      themes.push("Exploration");
    }

    if (
      lower.includes("growth")
    ) {
      values.push("Growth");
    }

    if (
      lower.includes("stewardship")
    ) {
      values.push("Stewardship");
    }

    const candidates =
      this.evolution.detect(
        themes,
        values
      );

    if (
      candidates.length === 0
    ) {
      return response;
    }

    const first =
      candidates[0];

    const evolution:
      NarrativeEvolution = {
        id: "generated",
        sourceTheme:
          first.sourceTheme,
        evolvedTheme:
          first.evolvedTheme,
        evidence:
          first.evidence,
        confidence:
          first.confidence,
        explanation:
          "Generated during response synthesis.",
        status:
          "active",
        createdAt:
          new Date(),
      };

    const narrative =
      this.narrativeBuilder.build(
        evolution
      );

    return `
${response}

${narrative}
`.trim();

  }

}