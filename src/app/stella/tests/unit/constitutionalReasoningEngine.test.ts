// src/app/stella/tests/unit/constitutionalReasoningEngine.test.ts
import { describe, it, expect } from "vitest";
import { ConstitutionalReasoningEngine } from "../../../../stella/reasoning/ConstitutionalReasoningEngine";

describe("ConstitutionalReasoningEngine", () => {
  const engine = new ConstitutionalReasoningEngine();

  it("generates theme-situation reasoning", () => {
    const insights = engine.reason(
      ["intentional growth"],
      ["business growth effort"],
      [],
      []
    );
    expect(insights[0].insight).toContain("intentional growth");
    expect(insights[0].confidence).toBe("medium");
  });

  it("generates situation-goal reasoning", () => {
    const insights = engine.reason(
      [],
      ["childcare transition"],
      ["secure childcare"],
      []
    );
    expect(insights[0].insight).toContain("childcare transition");
    expect(insights[0].confidence).toBe("high");
  });

  it("generates goal-project reasoning", () => {
    const insights = engine.reason(
      [],
      [],
      ["launch atlas"],
      ["Atlas"]
    );
    expect(insights[0].insight).toContain("Atlas");
    expect(insights[0].confidence).toBe("high");
  });

  it("generates multi-layer reasoning", () => {
    const insights = engine.reason(
      ["intentional growth"],
      ["business growth effort"],
      ["launch atlas"],
      ["Atlas"]
    );
    const multi = insights.find((i) => i.insight.includes("appears consistently"));
    expect(multi).toBeDefined();
    expect(multi?.confidence).toBe("high");
  });

  it("provides supporting evidence", () => {
    const insights = engine.reason(
      ["intentional growth"],
      ["business growth effort"],
      ["launch atlas"],
      ["Atlas"]
    );
    expect(
      insights.every(
        (insight) =>
          insight.supportingThemes.length +
            insight.supportingSituations.length +
            insight.supportingGoals.length +
            insight.supportingProjects.length >
          0
      )
    ).toBe(true);
  });
});