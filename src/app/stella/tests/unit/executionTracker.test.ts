import { describe, it, expect } from "vitest";

import { ExecutionTracker }
  from "../../../../stella/execution/ExecutionTracker";

import type { ActionProfile }
  from "../../contracts/ActionProfile";

describe(
  "ExecutionTracker",
  () => {
    const tracker =
      new ExecutionTracker();

    const base: ActionProfile = {
      action:
        "review checklist",

      project:
        "Atlas",

      goal:
        "Launch Atlas",

      createdAt:
        new Date(),

      status:
        "pending",
    };

    it(
      "marks in progress",
      () => {
        expect(
          tracker.start(base)
            .status
        ).toBe(
          "in_progress"
        );
      }
    );

    it(
      "marks completed and sets completedAt",
      () => {
        const completed =
          tracker.complete(
            base
          );

        expect(
          completed.status
        ).toBe(
          "completed"
        );

        expect(
          completed.completedAt
        ).toBeDefined();
      }
    );

    it(
      "marks blocked",
      () => {
        expect(
          tracker.block(base)
            .status
        ).toBe(
          "blocked"
        );
      }
    );

    it(
      "does not mutate original action",
      () => {
        const original = {
          ...base,
        };

        const completed =
          tracker.complete(
            original
          );

        expect(
          original.status
        ).toBe(
          "pending"
        );

        expect(
          completed.status
        ).toBe(
          "completed"
        );
      }
    );
  }
);