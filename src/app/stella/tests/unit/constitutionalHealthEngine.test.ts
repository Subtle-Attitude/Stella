// src/app/stella/tests/unit/constitutionalHealthEngine.test.ts
import { describe, it, expect } from "vitest";
import { ConstitutionalHealthEngine } from "../../../../stella/audit/ConstitutionalHealthEngine";
import type { ConstitutionalAudit } from "../../contracts/ConstitutionalAudit";

describe("ConstitutionalHealthEngine", () => {
  const engine = new ConstitutionalHealthEngine();

    const audit = (
    passed: boolean
    ): ConstitutionalAudit => ({
    id: "a1",
    subject: "test",
    passed,
    violations: passed
        ? []
        : ["issue"],
    warnings: [],
    confidenceAlignment:
        "aligned",
    reviewRecommendation:
        passed
        ? "none"
        : "review",
    status: "active",
    createdAt: new Date(),
    });

  it("healthy when all pass", () => {
    expect(engine.summarize([audit(true), audit(true)]).health).toBe("healthy");
  });

  it("needs_review when failures exist", () => {
    expect(engine.summarize([audit(true), audit(false)]).health).toBe("needs_review");
  });
});