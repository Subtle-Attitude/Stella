// src/app/stella/tests/unit/identityLineageRegistry.test.ts
import { describe, it, expect } from "vitest";
import { IdentityLineageRegistry } from "../../../../stella/identity/IdentityLineageRegistry";

describe("IdentityLineageRegistry", () => {
  const registry = new IdentityLineageRegistry();

  it("creates lineage and attaches construct", () => {
    const l = registry.createLineage("Belonging", "larger lineage");
    registry.attachConstruct(l.id, "construct-1");
    expect(registry.findLineage(l.id)?.constructs).toContain("construct-1");
  });

  it("archives lineage", () => {
    const l = registry.createLineage("Test", "desc");
    registry.archiveLineage(l.id);
    expect(registry.findLineage(l.id)?.status).toBe("archived");
  });
});