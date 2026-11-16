import { describe, it, expect } from "vitest";

import { ProjectPlanner }
  from "../../../../stella/planning/ProjectPlanner";

describe(
  "ProjectPlanner",
  () => {
    const planner =
      new ProjectPlanner();

    it(
      "creates plan for atlas with draft status",
      () => {
        const plan =
          planner.buildPlan(
            "Atlas",
            "Launch Atlas"
          );

        expect(
          plan.status
        ).toBe("draft");

        expect(
          plan.actions.length
        ).toBeGreaterThan(0);
      }
    );

    it(
      "creates plan for stella",
      () => {
        const plan =
          planner.buildPlan(
            "Stella OS",
            "Build Stella"
          );

        expect(
          plan.project
        ).toBe("Stella OS");

        expect(
          plan.actions
        ).toContain(
          "review current architecture"
        );
      }
    );

    it(
      "creates independent plans for different goals",
      () => {
        const launch =
          planner.buildPlan(
            "Atlas",
            "Launch Atlas"
          );

        const roadmap =
          planner.buildPlan(
            "Atlas",
            "Atlas Roadmap"
          );

        expect(
          launch.goal
        ).not.toBe(
          roadmap.goal
        );
      }
    );
  }
);