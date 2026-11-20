// src/cognitive/core/WisdomExpressionEngine.ts

import { WisdomIntegrationEngine }
  from "../../stella/wisdom/WisdomIntegrationEngine";

import { WisdomNarrativeBuilder }
  from "../../stella/wisdom/WisdomNarrativeBuilder";

import { WisdomReflectionEngine }
  from "../../stella/wisdom/WisdomReflectionEngine";

import type {
  WisdomIntegration
} from "../../app/stella/contracts/WisdomIntegration";

export class WisdomExpressionEngine {

  private readonly integration =
    new WisdomIntegrationEngine();

  private readonly narrative =
    new WisdomNarrativeBuilder();

  private readonly reflection =
    new WisdomReflectionEngine();

  express(
    response: string,
    input: string
  ): string {

    const lower =
      input.toLowerCase();

    const polarities:
      { valueA: string; valueB: string }[] = [];

    const values: string[] = [];

    if (
      lower.includes("growth") &&
      lower.includes("stability")
    ) {
      polarities.push({
        valueA: "Growth",
        valueB: "Stability",
      });
    }

    if (
      lower.includes("belonging") &&
      lower.includes("autonomy")
    ) {
      polarities.push({
        valueA: "Belonging",
        valueB: "Autonomy",
      });
    }

    if (
      lower.includes("creativity") &&
      lower.includes("structure")
    ) {
      polarities.push({
        valueA: "Creativity",
        valueB: "Structure",
      });
    }

    if (
      lower.includes("exploration") &&
      lower.includes("stewardship")
    ) {
      polarities.push({
        valueA: "Exploration",
        valueB: "Stewardship",
      });

      values.push(
        "Exploration",
        "Stewardship"
      );
    }

    const candidates =
      this.integration.detect(
        polarities,
        values
      );

    if (
      candidates.length === 0
    ) {
      return response;
    }

    const first =
      candidates[0];

    const wisdom:
      WisdomIntegration = {
        id: "generated",
        polarityA:
          first.polarityA,
        polarityB:
          first.polarityB,
        integration:
          first.integration,
        description:
          "Generated during synthesis.",
        source:
          "observed_pattern",
        supportingValues:
          first.evidence,
        supportingThemes:
          [],
        supportingNarrativeEvolutions:
          [],
        confidence:
          first.confidence,
        status:
          "active",
        createdAt:
          new Date(),
      };

    const narrativeText =
      this.narrative.build(
        wisdom
      );

    const reflectionQuestion =
      this.reflection.reflect(
        wisdom
      );

    return `
${response}

${narrativeText}

${reflectionQuestion}
`.trim();

  }

}