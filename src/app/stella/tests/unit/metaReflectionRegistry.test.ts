import {
  describe,
  expect,
  it,
} from "vitest";

import {
  MetaReflectionRegistry,
} from "../../../../stella/meta/MetaReflectionRegistry";

describe(
  "MetaReflectionRegistry",
  () => {
    const registry =
      new MetaReflectionRegistry();

    it(
      "creates reflection",
      () => {
        const reflection =
          registry.create(
            "Sustainable Growth",
            "medium",
            "strong",
            "stable",
            "supported",
            [
              "Growth",
              "Stability",
            ]
          );

        expect(
          reflection.subject
        ).toBe(
          "Sustainable Growth"
        );
      }
    );

    it(
      "finds reflection",
      () => {
        const result =
          registry.findBySubject(
            "sustainable growth"
          );

        expect(
          result
        ).toBeDefined();
      }
    );

    it(
      "archives reflection",
      () => {
        const reflection =
          registry.create(
            "Creative Discipline",
            "medium",
            "moderate",
            "emerging",
            "supported"
          );

        registry.archive(
          reflection.id
        );

        expect(
          reflection.status
        ).toBe(
          "archived"
        );
      }
    );

    it(
      "lists reflections",
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