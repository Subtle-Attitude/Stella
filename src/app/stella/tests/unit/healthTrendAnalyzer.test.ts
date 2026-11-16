import { describe, it, expect } from "vitest";

import { HealthTrendAnalyzer }
  from "../../../../stella/health/HealthTrendAnalyzer";

import type { ProjectHealthProfile }
  from "../../contracts/ProjectHealthProfile";

describe(
  "HealthTrendAnalyzer",
  () => {
    const analyzer =
      new HealthTrendAnalyzer();

    const profile = (
      status: ProjectHealthProfile["status"]
    ): ProjectHealthProfile => ({
      project: "Atlas",
      status,
      progressPercentage: 0,
      completedActions: 0,
      pendingActions: 0,
      blockedActions: 0,
    });

    it(
      "returns improving",
      () => {
        expect(
          analyzer.compare(
            profile("emerging"),
            profile("healthy")
          )
        ).toBe("improving");

        expect(
          analyzer.compare(
            profile("at_risk"),
            profile("emerging")
          )
        ).toBe("improving");
      }
    );

    it(
      "returns stable",
      () => {
        expect(
          analyzer.compare(
            profile("healthy"),
            profile("healthy")
          )
        ).toBe("stable");
      }
    );

    it(
      "returns declining",
      () => {
        expect(
          analyzer.compare(
            profile("healthy"),
            profile("at_risk")
          )
        ).toBe("declining");
      }
    );

    it(
      "supports multiple-step improvement",
      () => {
        expect(
          analyzer.compare(
            profile("at_risk"),
            profile("healthy")
          )
        ).toBe("improving");
      }
    );

    it(
      "supports multiple-step decline",
      () => {
        expect(
          analyzer.compare(
            profile("healthy"),
            profile("stalled")
          )
        ).toBe("declining");
      }
    );
  }
);