import { describe, it, expect } from "vitest";

import { RelationshipRegistry }
  from "../../../../stella/relationships/RelationshipRegistry";

describe(
  "RelationshipRegistry",
  () => {
    it(
      "creates relationship entries",
      () => {
        const registry =
          new RelationshipRegistry();

        const profile =
          registry.record(
            "Test Person"
          );

        expect(
          profile.frequency
        ).toBe(1);

        expect(
          profile.entity
        ).toBe(
          "Test Person"
        );
      }
    );

    it(
      "increments frequency and associates themes",
      () => {
        const registry =
          new RelationshipRegistry();

        registry.record(
          "Test Person",
          "creative self-reflection"
        );

        const updated =
          registry.record(
            "Test Person",
            "entrepreneurship"
          );

        expect(
          updated.frequency
        ).toBe(2);

        expect(
          updated.associatedThemes
        ).toContain(
          "creative self-reflection"
        );

        expect(
          updated.associatedThemes
        ).toContain(
          "entrepreneurship"
        );
      }
    );

    it(
      "does not duplicate themes",
      () => {
        const registry =
          new RelationshipRegistry();

        registry.record(
          "Test Person",
          "entrepreneurship"
        );

        registry.record(
          "Test Person",
          "entrepreneurship"
        );

        const profile =
          registry.get(
            "Test Person"
          );

        expect(
          profile?.associatedThemes
        ).toEqual([
          "entrepreneurship",
        ]);
      }
    );

    it(
      "returns all relationships",
      () => {
        const registry =
          new RelationshipRegistry();

        registry.record(
          "Test Person"
        );

        registry.record(
          "Mentor"
        );

        expect(
          registry.all()
        ).toHaveLength(2);
      }
    );

    it(
      "returns a relationship by name",
      () => {
        const registry =
          new RelationshipRegistry();

        registry.record(
          "Test Person"
        );

        const profile =
          registry.get(
            "Test Person"
          );

        expect(
          profile?.entity
        ).toBe(
          "Test Person"
        );
      }
    );

    it(
      "treats entity lookup as case-insensitive",
      () => {
        const registry =
          new RelationshipRegistry();

        registry.record(
          "Test Person"
        );

        const profile =
          registry.get(
            "test person"
          );

        expect(
          profile?.entity
        ).toBe(
          "Test Person"
        );
      }
    );
  }
);