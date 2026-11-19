// src/app/stella/tests/unit/reflectionOpportunityEngine.test.ts
import { describe, it, expect } from "vitest";
import { ReflectionOpportunityEngine } from "../../../../stella/initiative/ReflectionOpportunityEngine";

describe("ReflectionOpportunityEngine", () => {
  const engine = new ReflectionOpportunityEngine();

  it("detects recurring pattern", () => {
    expect(engine.identify("The same challenge keeps appearing.")).toBe("Recurring Pattern");
  });

  it("detects polarity", () => {
    expect(engine.identify("I have conflicting priorities.")).toBe("Polarity Opportunity");
  });
});