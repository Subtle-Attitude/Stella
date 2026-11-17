// src/app/stella/tests/unit/polarityNarrativeBuilder.test.ts

import { describe, it, expect } from "vitest";

import { PolarityNarrativeBuilder }
  from "../../../../stella/polarity/PolarityNarrativeBuilder";

import type { Polarity }
  from "../../contracts/Polarity";

describe(
  "PolarityNarrativeBuilder",
  () => {
    const builder =
      new PolarityNarrativeBuilder();

    const polarity: Polarity = {
      id: "p1",

      valueA: "Growth",

      valueB: "Stability",

      description: "balance",

      source: "observed_pattern",

      supportingMemoryIds: [],

      supportingThemes: [],

      confidence: "medium",

      status: "active",

      createdAt: new Date(),
    };

    it(
      "uses constitutional language",
      () => {
        const text =
          builder.build(
            polarity
          );

        expect(
          text
        ).toContain(
          "may exist"
        );

        expect(
          text
            .toLowerCase()
        ).toContain(
          "both values"
        );

        expect(
          text
            .toLowerCase()
        ).not.toContain(
          "should choose"
        );

        expect(
          text
            .toLowerCase()
        ).not.toContain(
          "correct"
        );
      }
    );
  }
);