// src/app/stella/tests/unit/valuePrincipleRegistry.test.ts
import { describe, it, expect } from "vitest";
import { ValuePrincipleRegistry } from "../../../../stella/values/ValuePrincipleRegistry";

describe("ValuePrincipleRegistry", () => {
  const registry = new ValuePrincipleRegistry();

  it("creates and finds", () => {
    const v = registry.create("Growth", "growth-oriented effort", "user_declared");
    expect(registry.findByName("growth")?.id).toBe(v.id);
  });

  it("archives", () => {
    const v = registry.create("Belonging", "desc", "user_declared");
    registry.archive(v.id);
    expect(registry.findByName("Belonging")).toBeUndefined();
  });

  it("lists all", () => {
    expect(registry.getAll().length).toBeGreaterThan(0);
  });
});