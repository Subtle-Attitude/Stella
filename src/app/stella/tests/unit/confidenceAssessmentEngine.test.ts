// src/app/stella/tests/unit/confidenceAssessmentEngine.test.ts
import { describe, it, expect } from "vitest";
import { ConfidenceAssessmentEngine } from "../../../../stella/meta/ConfidenceAssessmentEngine";

describe("ConfidenceAssessmentEngine", () => {
  const engine = new ConfidenceAssessmentEngine();

  it("3 signals → strong", () => {
    const result = engine.assess("Sustainable Growth", 3);
    expect(result.evidenceStrength).toBe("strong");
    expect(result.confidence).toBe("medium");
  });

  it("2 signals → moderate", () => {
    const result = engine.assess("Sustainable Growth", 2);
    expect(result.evidenceStrength).toBe("moderate");
  });

  it("1 signal → limited", () => {
    const result = engine.assess("Sustainable Growth", 1);
    expect(result.evidenceStrength).toBe("limited");
    expect(result.confidence).toBe("low");
  });
});