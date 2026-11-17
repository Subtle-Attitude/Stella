// src/app/stella/tests/unit/lifeThemeValidator.test.ts
import { describe, it, expect } from "vitest";
import { LifeThemeValidator } from "../../../../stella/lifethemes/LifeThemeValidator";
import type { LifeTheme } from "../../contracts/LifeTheme";

describe("LifeThemeValidator", () => {
  const validator = new LifeThemeValidator();

  const base = (name: string): LifeTheme => ({
    id: "t1",
    name,
    description: "desc",
    source: "user_declared",
    supportingValues: [],
    supportingIdentityConstructs: [],
    supportingThemes: [],
    supportingMemoryIds: [],
    createdAt: new Date(),
  });

  it("accepts Interconnection", () => {
    expect(validator.validate(base("Interconnection"))).toBe(true);
  });

  it("accepts Exploration", () => {
    expect(validator.validate(base("Exploration"))).toBe(true);
  });

  it("rejects Destiny", () => {
    expect(validator.validate(base("Destiny"))).toBe(false);
  });

  it("rejects Purpose", () => {
    expect(validator.validate(base("Purpose"))).toBe(false);
  });

  it("rejects Soul Mission", () => {
    expect(validator.validate(base("Soul Mission"))).toBe(false);
  });
});