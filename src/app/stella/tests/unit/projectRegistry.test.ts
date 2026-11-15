import { describe, it, expect } from "vitest";

import { ProjectRegistry }
  from "../../../../stella/projects/ProjectRegistry";

describe(
  "ProjectRegistry",
  () => {
    it(
      "creates projects",
      () => {
        const registry =
          new ProjectRegistry();

        const profile =
          registry.record("Atlas");

        expect(
          profile.project
        ).toBe("Atlas");

        expect(
          profile.status
        ).toBe("identified");
      }
    );

    it(
      "tracks goals and themes without duplication",
      () => {
        const registry =
          new ProjectRegistry();

        registry.record(
          "Atlas",
          "launch atlas",
          "intentional growth"
        );

        const updated =
          registry.record(
            "Atlas",
            "atlas roadmap",
            "development"
          );

        expect(
          updated.goals
        ).toContain(
          "launch atlas"
        );

        expect(
          updated.goals
        ).toContain(
          "atlas roadmap"
        );

        expect(
          updated.associatedThemes
        ).toContain(
          "intentional growth"
        );

        expect(
          updated.associatedThemes
        ).toContain(
          "development"
        );
      }
    );

    it(
      "returns a project by name",
      () => {
        const registry =
          new ProjectRegistry();

        registry.record("Atlas");

        expect(
          registry.get("Atlas")?.project
        ).toBe("Atlas");
      }
    );

    it(
      "treats project lookup as case insensitive",
      () => {
        const registry =
          new ProjectRegistry();

        registry.record("Atlas");

        expect(
          registry.get("atlas")?.project
        ).toBe("Atlas");
      }
    );

    it(
      "updates status",
      () => {
        const registry =
          new ProjectRegistry();

        registry.record("Atlas");

        const updated =
          registry.updateStatus(
            "Atlas",
            "active"
          );

        expect(
          updated?.status
        ).toBe("active");
      }
    );

    it(
      "returns all projects",
      () => {
        const registry =
          new ProjectRegistry();

        registry.record("Atlas");

        registry.record(
          "Stella OS"
        );

        expect(
          registry.all()
        ).toHaveLength(2);
      }
    );
  }
);