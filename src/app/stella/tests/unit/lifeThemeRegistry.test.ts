// src/app/stella/tests/unit/lifeThemeRegistry.test.ts
import { describe, it, expect } from "vitest";
import { LifeThemeRegistry } from "../../../../stella/lifethemes/LifeThemeRegistry";

describe("LifeThemeRegistry", () => {
  const registry = new LifeThemeRegistry();

  it("creates and retrieves", () => {
    const t = registry.create("Interconnection", "desc", "user_declared", ["Belonging"]);
    expect(registry.findByName("interconnection")?.id).toBe(t.id);
  });

  it("lists all", () => {
    expect(registry.getAll().length).toBeGreaterThan(0);
  });
});