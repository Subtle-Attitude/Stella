// src/app/stella/tests/unit/reviewRecommendationEngine.test.ts
import { describe, it, expect } from "vitest";
import { ReviewRecommendationEngine } from "../../../../stella/audit/ReviewRecommendationEngine";
import type { ConstitutionalAudit } from "../../contracts/ConstitutionalAudit";

describe("ReviewRecommendationEngine", () => {
  const engine = new ReviewRecommendationEngine();

    const base = (
    overrides:
        Partial<ConstitutionalAudit> = {}
    ): ConstitutionalAudit => ({
    id: "a1",
    subject: "test",
    passed: true,
    violations: [],
    warnings: [],
    confidenceAlignment:
        "aligned",
    reviewRecommendation:
        "none",
    status: "active",
    createdAt: new Date(),
    ...overrides,
    });

  it("violations → review", () => {
    expect(engine.recommend(base({ violations: ["certainty language"] }))).toBe("review");
  });

  it("overstated → review", () => {
    expect(engine.recommend(base({ confidenceAlignment: "overstated" }))).toBe("review");
  });

  it("aligned → none", () => {
    expect(engine.recommend(base())).toBe("none");
  });
});