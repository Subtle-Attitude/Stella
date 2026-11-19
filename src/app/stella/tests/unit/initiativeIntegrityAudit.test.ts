// src/app/stella/tests/unit/initiativeIntegrityAudit.test.ts
import { describe, it, expect } from "vitest";
import { InitiativeIntegrityAudit } from "../../../../stella/initiative/InitiativeIntegrityAudit";

describe("InitiativeIntegrityAudit", () => {
  const audit = new InitiativeIntegrityAudit();

  it("protects sovereignty", () => {
    expect(audit.audit("You must realize this.")).toBe(false);
  });

  it("protects governance", () => {
    expect(audit.audit("Would it be useful to explore?")).toBe(true);
  });
});