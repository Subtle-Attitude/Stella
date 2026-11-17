// src/app/stella/tests/unit/identityConstructRegistry.test.ts
import { describe, it, expect } from "vitest";
import { IdentityConstructRegistry } from "../../../../stella/identity/IdentityConstructRegistry";

describe("IdentityConstructRegistry", () => {
  const registry = new IdentityConstructRegistry();

  it("creates and retrieves", () => {
    const c = registry.create("Sun Dancer", "embodied earthling", ["m1"]);
    expect(registry.find(c.id)?.name).toBe("Sun Dancer");
  });

  it("archives", () => {
    const c = registry.create("Dream Keeper", "desc", []);
    registry.archive(c.id);
    expect(registry.find(c.id)?.status).toBe("archived");
  });
});