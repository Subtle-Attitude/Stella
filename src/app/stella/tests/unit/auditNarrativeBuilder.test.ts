// src/app/stella/tests/unit/auditNarrativeBuilder.test.ts
import { describe, it, expect } from "vitest";
import { AuditNarrativeBuilder } from "../../../../stella/audit/AuditNarrativeBuilder";
import type { ConstitutionalAudit } from "../../contracts/ConstitutionalAudit";

describe("AuditNarrativeBuilder", () => {
  const builder = new AuditNarrativeBuilder();

    const aligned: ConstitutionalAudit = {
    id: "a1",
    subject: "test",
    passed: true,
    violations: [],
    warnings: [],
    confidenceAlignment: "aligned",
    reviewRecommendation: "none",
    status: "active",
    createdAt: new Date(),
    };

  it("uses constitutional language", () => {
    const text = builder.build(aligned);
    expect(text).toContain("constitutionally aligned");
    expect(text).not.toContain("is true");
    expect(text).not.toContain("proven");
  });
});