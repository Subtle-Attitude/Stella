import { describe, it, expect } from "vitest";

import { PlanRegistry }
  from "../../../../stella/planning/PlanRegistry";

describe(
  "PlanRegistry",
  () => {
    it(
      "creates and retrieves plan",
      () => {
        const registry =
          new PlanRegistry();

        const plan =
          registry.create(
            "Atlas",
            "Launch Atlas",
            ["review checklist"]
          );

        expect(
          plan.status
        ).toBe("draft");

        expect(
          registry.get(
            "Atlas",
            "Launch Atlas"
          )?.goal
        ).toBe(
          "Launch Atlas"
        );
      }
    );

    it(
      "treats lookup as case insensitive",
      () => {
        const registry =
          new PlanRegistry();

        registry.create(
          "Atlas",
          "Launch Atlas"
        );

        expect(
          registry.get(
            "atlas",
            "launch atlas"
          )
        ).toBeDefined();
      }
    );

    it(
      "updates status",
      () => {
        const registry =
          new PlanRegistry();

        registry.create(
          "Atlas",
          "Launch Atlas"
        );

        const updated =
          registry.updateStatus(
            "Atlas",
            "Launch Atlas",
            "active"
          );

        expect(
          updated?.status
        ).toBe("active");
      }
    );

    it(
      "returns undefined when updating a missing plan",
      () => {
        const registry =
          new PlanRegistry();

        expect(
          registry.updateStatus(
            "Missing",
            "Missing Goal",
            "active"
          )
        ).toBeUndefined();
      }
    );

    it(
      "returns all plans",
      () => {
        const registry =
          new PlanRegistry();

        registry.create(
          "Atlas",
          "Launch Atlas"
        );

        registry.create(
          "Stella OS",
          "Build Stella"
        );

        expect(
          registry.all()
        ).toHaveLength(2);
      }
    );
  }
);