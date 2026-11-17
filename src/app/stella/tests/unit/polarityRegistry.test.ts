// src/app/stella/tests/unit/polarityRegistry.test.ts

import { describe, it, expect } from "vitest";

import { PolarityRegistry }
  from "../../../../stella/polarity/PolarityRegistry";

describe(
  "PolarityRegistry",
  () => {
    const registry =
      new PolarityRegistry();

    it(
      "creates polarity",
      () => {
        const polarity =
          registry.create(
            "Growth",
            "Stability",
            "balance",
            "observed_pattern"
          );

        expect(
          polarity.valueA
        ).toBe(
          "Growth"
        );

        expect(
          polarity.valueB
        ).toBe(
          "Stability"
        );
      }
    );

    it(
      "finds polarity by value",
      () => {
        registry.create(
          "Belonging",
          "Autonomy",
          "balance",
          "observed_pattern"
        );

        const results =
          registry.findByValue(
            "Belonging"
          );

        expect(
          results.length
        ).toBeGreaterThan(
          0
        );

        expect(
          results.some(
            p =>
              p.valueA ===
                "Belonging" ||
              p.valueB ===
                "Belonging"
          )
        ).toBe(
          true
        );
      }
    );

    it(
      "archives polarity",
      () => {
        const polarity =
          registry.create(
            "Creativity",
            "Structure",
            "balance",
            "observed_pattern"
          );

        registry.archive(
          polarity.id
        );

        expect(
          polarity.status
        ).toBe(
          "archived"
        );
      }
    );

    it(
      "returns all polarities",
      () => {
        expect(
          registry
            .getAll()
            .length
        ).toBeGreaterThan(
          0
        );
      }
    );
  }
);