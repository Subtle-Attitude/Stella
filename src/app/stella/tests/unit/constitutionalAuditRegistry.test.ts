// src/app/stella/tests/unit/constitutionalAuditRegistry.test.ts
import { describe, it, expect } from "vitest";
import { ConstitutionalAuditRegistry } from "../../../../stella/audit/ConstitutionalAuditRegistry";

describe("ConstitutionalAuditRegistry", () => {
  const registry = new ConstitutionalAuditRegistry();

  it("creates and finds", () => {
    const a = registry.create("test", true, [], [], "aligned", "none");
    expect(registry.find(a.id)?.subject).toBe("test");
  });

  it("lists all", () => {
    expect(registry.getAll().length).toBeGreaterThan(0);
  });
});