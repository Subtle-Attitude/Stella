// src/app/stella/tests/unit/attunementIntegrityAudit.test.ts
import { describe, it, expect } from "vitest";

class AttunementIntegrityAudit {
  audit(text: string): boolean {
    return !/\byou must\b/i.test(text);
  }
}

describe("AttunementIntegrityAudit", () => {
  const audit = new AttunementIntegrityAudit();

  it("protects identity", () => {
    expect(audit.audit("You must realize this.")).toBe(false);
  });

  it("protects presence", () => {
    expect(audit.audit("This appears supported by evidence.")).toBe(true);
  });
});