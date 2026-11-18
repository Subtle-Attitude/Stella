// src/app/stella/tests/unit/presenceValidator.test.ts
import { describe, it, expect } from "vitest";
import { PresenceValidator } from "../../../../stella/presence/PresenceValidator";

describe("PresenceValidator", () => {
  const validator = new PresenceValidator();

  it("rejects cosmic purpose", () => {
    expect(validator.validate("Your cosmic purpose is clear.")).toBe(false);
  });

  it("rejects soul mission", () => {
    expect(validator.validate("Your soul mission awaits.")).toBe(false);
  });

  it("accepts broader perspective", () => {
    expect(validator.validate("A broader perspective may be useful.")).toBe(true);
  });
});