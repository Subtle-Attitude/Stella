import { describe, it, expect } from "vitest";

import { ThemeRegistry }
  from "../../../../stella/themes/ThemeRegistry";

describe(
  "ThemeRegistry",
  () => {
    it(
      "creates theme entries",
      () => {
        const registry =
          new ThemeRegistry();

        const profile =
          registry.record(
            "creative self-reflection"
          );

        expect(
          profile.frequency
        ).toBe(1);

        expect(
          profile.theme
        ).toBe(
          "creative self-reflection"
        );
      }
    );

    it(
      "increments frequency and updates lastSeen",
      () => {
        const registry =
          new ThemeRegistry();

        const first =
          registry.record(
            "journaling"
          );

        const later =
          new Date(
            first.lastSeen.getTime() +
            1000
          );

        const second =
          registry.record(
            "journaling",
            later
          );

        expect(
          second.frequency
        ).toBe(2);

        expect(
          second.lastSeen.getTime()
        ).toBe(
          later.getTime()
        );
      }
    );

    it(
      "returns all registered themes",
      () => {
        const registry =
          new ThemeRegistry();

        registry.record(
          "creative self-reflection"
        );

        registry.record(
          "intentional growth"
        );

        expect(
          registry.all()
        ).toHaveLength(2);
      }
    );

    it(
      "returns a theme by name",
      () => {
        const registry =
          new ThemeRegistry();

        registry.record(
          "creative self-reflection"
        );

        const profile =
          registry.get(
            "creative self-reflection"
          );

        expect(
          profile?.theme
        ).toBe(
          "creative self-reflection"
        );
      }
    );
  }
);
