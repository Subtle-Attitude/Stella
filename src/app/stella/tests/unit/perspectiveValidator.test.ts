// src/app/stella/tests/unit/perspectiveValidator.test.ts
import { describe, it, expect } from "vitest";
import { PerspectiveValidator } from "../../../../stella/perspective/PerspectiveValidator";
import type { CosmicPerspective } from "../../contracts/CosmicPerspective";

describe("PerspectiveValidator", () => {
  const validator = new PerspectiveValidator();

  const base = (perspective: string): CosmicPerspective => ({
    perspective,
    supportingInsights: ["insight"],
    type: "reflection",
    confidence: "low",
  });

  it("accepts valid perspective", () => {
    expect(validator.validate(base("One way to view this is..."))).toBe(true);
  });

  it("rejects destiny", () => {
    expect(validator.validate(base("This is your destiny."))).toBe(false);
  });

  it("rejects purpose", () => {
    expect(validator.validate(base("Your true purpose is..."))).toBe(false);
  });

  it("rejects universe claims", () => {
    expect(validator.validate(base("The universe is telling you..."))).toBe(false);
  });

  it("rejects truth claims", () => {
    expect(validator.validate(base("This proves the connection."))).toBe(false);
  });

  it("rejects empty supporting insights", () => {
    const empty: CosmicPerspective = { ...base("valid"), supportingInsights: [] };
    expect(validator.validate(empty)).toBe(false);
  });
});