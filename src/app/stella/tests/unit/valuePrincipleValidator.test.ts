// src/app/stella/tests/unit/valuePrincipleValidator.test.ts
import { describe, it, expect } from "vitest";
import { ValuePrincipleValidator } from "../../../../stella/values/ValuePrincipleValidator";
import type { ValuePrinciple } from "../../contracts/ValuePrinciple";

describe("ValuePrincipleValidator", () => {
  const validator = new ValuePrincipleValidator();

  const base = (name: string): ValuePrinciple => ({
    id: "v1",
    name,
    description: "desc",
    source: "user_declared",
    status: "active",
    supportingMemoryIds: [],
    supportingThemes: [],
    supportingIdentityConstructs: [],
    createdAt: new Date(),
  });

  it("accepts value", () => {
    expect(validator.validate(base("Growth"))).toBe(true);
  });

  it("rejects empty", () => {
    expect(validator.validate(base(""))).toBe(false);
  });

  it("rejects identity construct", () => {
    expect(validator.validate(base("Sun Dancer"))).toBe(false);
  });

  it("rejects duplicate", () => {
    expect(validator.validate(base("Growth"), [base("Growth")])).toBe(false);
  });
});