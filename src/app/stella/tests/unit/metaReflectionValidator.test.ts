// src/app/stella/tests/unit/metaReflectionValidator.test.ts
import { describe, it, expect } from "vitest";
import { MetaReflectionValidator } from "../../../../stella/meta/MetaReflectionValidator";
import type { MetaReflection } from "../../contracts/MetaReflection";

describe("MetaReflectionValidator", () => {
  const validator = new MetaReflectionValidator();

    const base = (
    explanation: string
    ): MetaReflection => ({
    id: "m1",
    subject: "Sustainable Growth",
    confidence: "medium",
    evidenceStrength: "strong",
    reviewStatus: "stable",
    explanation,
    supportingEvidence: [],
    status: "active",
    createdAt: new Date(),
    });

  it("rejects proven", () => {
    expect(validator.validate(base("This is proven."))).toBe(false);
  });

  it("rejects guaranteed", () => {
    expect(validator.validate(base("This is guaranteed."))).toBe(false);
  });

  it("accepts appears", () => {
    expect(validator.validate(base("This appears supported."))).toBe(true);
  });

  it("accepts supported", () => {
    expect(validator.validate(base("This is supported by evidence."))).toBe(true);
  });
});