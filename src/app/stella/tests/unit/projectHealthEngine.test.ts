import { describe, it, expect } from "vitest";

import { ProjectHealthEngine }
  from "../../../../stella/health/ProjectHealthEngine";

import type { ProgressSummary }
  from "../../contracts/ProgressSummary";

describe(
  "ProjectHealthEngine",
  () => {
    const engine =
      new ProjectHealthEngine();

    const summary = (
      overrides: Partial<ProgressSummary> = {}
    ): ProgressSummary => ({
      total: 10,
      pending: 0,
      inProgress: 0,
      completed: 0,
      blocked: 0,
      ...overrides,
    });

    it(
      "returns healthy",
      () => {
        const result =
          engine.assess(
            "Atlas",
            summary({
              completed: 8,
              pending: 2,
            })
          );

        expect(
          result.status
        ).toBe("healthy");

        expect(
          result.progressPercentage
        ).toBe(80);
      }
    );

    it(
      "returns emerging",
      () => {
        const result =
          engine.assess(
            "Atlas",
            summary({
              completed: 3,
              pending: 7,
            })
          );

        expect(
          result.status
        ).toBe("emerging");
      }
    );

    it(
      "returns stalled",
      () => {
        const result =
          engine.assess(
            "Atlas",
            summary({
              completed: 0,
              pending: 5,
            })
          );

        expect(
          result.status
        ).toBe("stalled");
      }
    );

    it(
      "returns at_risk",
      () => {
        const result =
          engine.assess(
            "Atlas",
            summary({
              completed: 1,
              pending: 2,
              blocked: 7,
            })
          );

        expect(
          result.status
        ).toBe("at_risk");

        expect(
          result.progressPercentage
        ).toBe(10);
      }
    );

    it(
      "handles empty projects",
      () => {
        const result =
          engine.assess(
            "Atlas",
            {
              total: 0,
              pending: 0,
              inProgress: 0,
              completed: 0,
              blocked: 0,
            }
          );

        expect(
          result.progressPercentage
        ).toBe(0);

        expect(
          result.status
        ).toBe("emerging");
      }
    );
  }
);