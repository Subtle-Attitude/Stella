import { describe, it, expect } from "vitest";

import { ActionRegistry }
  from "../../../../stella/execution/ActionRegistry";

describe(
  "ActionRegistry",
  () => {
    it(
      "creates and retrieves actions",
      () => {
        const registry =
          new ActionRegistry();

        const action =
          registry.create(
            "Atlas",
            "Launch Atlas",
            "review checklist"
          );

        expect(
          action.status
        ).toBe("pending");

        expect(
          registry.get(
            "Atlas",
            "Launch Atlas",
            "review checklist"
          )?.action
        ).toBe(
          "review checklist"
        );
      }
    );

    it(
      "treats lookup as case insensitive",
      () => {
        const registry =
          new ActionRegistry();

        registry.create(
          "Atlas",
          "Launch Atlas",
          "review checklist"
        );

        expect(
          registry.get(
            "atlas",
            "launch atlas",
            "review checklist"
          )
        ).toBeDefined();
      }
    );

    it(
      "updates status",
      () => {
        const registry =
          new ActionRegistry();

        registry.create(
          "Atlas",
          "Launch Atlas",
          "review checklist"
        );

        const updated =
          registry.updateStatus(
            "Atlas",
            "Launch Atlas",
            "review checklist",
            "completed"
          );

        expect(
          updated?.status
        ).toBe("completed");

        expect(
          updated?.completedAt
        ).toBeDefined();
      }
    );

    it(
      "returns undefined when updating a missing action",
      () => {
        const registry =
          new ActionRegistry();

        expect(
          registry.updateStatus(
            "Missing Project",
            "Missing Goal",
            "Missing Action",
            "completed"
          )
        ).toBeUndefined();
      }
    );

    it(
      "returns all actions",
      () => {
        const registry =
          new ActionRegistry();

        registry.create(
          "Atlas",
          "Launch Atlas",
          "review checklist"
        );

        registry.create(
          "Atlas",
          "Launch Atlas",
          "verify onboarding"
        );

        expect(
          registry.all()
        ).toHaveLength(2);
      }
    );
  }
);