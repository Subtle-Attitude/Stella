// src/app/stella/tests/unit/stellaIdentityRegistry.test.ts
import { describe, it, expect } from "vitest";
import { StellaIdentityRegistry } from "../../../../stella/identity/StellaIdentityRegistry";

describe("StellaIdentityRegistry", () => {
  const registry = new StellaIdentityRegistry();

  it("creates and retrieves", () => {
    registry.create("Curious", "open inquiry");
    expect(registry.findByName("Curious")).toBeDefined();
  });

  it("lists all", () => {
    expect(registry.getAll().length).toBeGreaterThan(0);
  });
});