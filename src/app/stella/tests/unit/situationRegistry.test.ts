// src/app/stella/tests/unit/situationRegistry.test.ts

import { describe, it, expect } from "vitest";

import { SituationRegistry }
  from "../../../../stella/situations/SituationRegistry";

describe(
  "SituationRegistry",
  () => {
    it(
      "creates situations",
      () => {
        const registry =
          new SituationRegistry();

        const profile =
          registry.record(
            "childcare transition"
          );

        expect(
          profile.status
        ).toBe("active");

        expect(
          profile.situation
        ).toBe(
          "childcare transition"
        );
      }
    );

    it(
      "updates themes and relationships without duplication",
      () => {
        const registry =
          new SituationRegistry();

        registry.record(
          "childcare transition",
          "parenting",
          "daughter"
        );

        const updated =
          registry.record(
            "childcare transition",
            "parenting",
            "son"
          );

        expect(
          updated.associatedThemes
        ).toEqual([
          "parenting",
        ]);

        expect(
          updated.associatedRelationships
        ).toContain(
          "daughter"
        );

        expect(
          updated.associatedRelationships
        ).toContain(
          "son"
        );
      }
    );

    it(
      "returns a situation by name (case-insensitive)",
      () => {
        const registry =
          new SituationRegistry();

        registry.record(
          "childcare transition"
        );

        expect(
          registry.get(
            "Childcare Transition"
          )?.situation
        ).toBe(
          "childcare transition"
        );
      }
    );

    it(
      "updates status",
      () => {
        const registry =
          new SituationRegistry();

        registry.record(
          "childcare transition"
        );

        const updated =
          registry.updateStatus(
            "childcare transition",
            "resolved"
          );

        expect(
          updated?.status
        ).toBe(
          "resolved"
        );
      }
    );

    it(
      "returns undefined when updating a missing situation",
      () => {
        const registry =
          new SituationRegistry();

        expect(
          registry.updateStatus(
            "missing situation",
            "resolved"
          )
        ).toBeUndefined();
      }
    );

    it(
      "returns all situations",
      () => {
        const registry =
          new SituationRegistry();

        registry.record(
          "childcare transition"
        );

        registry.record(
          "career transition"
        );

        expect(
          registry.all()
        ).toHaveLength(2);
      }
    );
  }
);