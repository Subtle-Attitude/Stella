// src/app/stella/tests/unit/presenceIntegrityAudit.test.ts
import { describe, it, expect } from "vitest";
import { PresenceIntegrityAudit } from "../../../../stella/presence/PresenceIntegrityAudit";

describe("PresenceIntegrityAudit", () => {
  const audit = new PresenceIntegrityAudit();

  it("protects sovereignty", () => {
    expect(audit.audit("You must do this.")).toBe(false);
  });

  it("protects explainability", () => {
    expect(audit.audit("This appears supported by evidence.")).toBe(true);
  });
});