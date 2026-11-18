// src/app/stella/tests/unit/constitutionalAuditEngine.test.ts
import { describe, it, expect } from "vitest";
import { ConstitutionalAuditEngine } from "../../../../stella/audit/ConstitutionalAuditEngine";

describe("ConstitutionalAuditEngine", () => {
  const engine = new ConstitutionalAuditEngine();

  it("rejects destiny language", () => {
    const result = engine.audit({ subject: "test", text: "Your destiny is this.", confidence: "medium", evidenceStrength: "strong" });
    expect(result.passed).toBe(false);
    expect(result.violations).toContain("destiny language");
  });

  it("rejects certainty language", () => {
    const result = engine.audit({ subject: "test", text: "This is proven.", confidence: "medium", evidenceStrength: "strong" });
    expect(result.violations).toContain("certainty language");
  });

  it("rejects authority language", () => {
    const result = engine.audit({ subject: "test", text: "The answer is this.", confidence: "medium", evidenceStrength: "strong" });
    expect(result.violations).toContain("authority claim");
  });

  it("passes constitutional output", () => {
    const result = engine.audit({ subject: "test", text: "A possible integration may be interpreted as Sustainable Growth.", confidence: "medium", evidenceStrength: "strong" });
    expect(result.passed).toBe(true);
  });
});