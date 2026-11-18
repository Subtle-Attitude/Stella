// src/app/stella/tests/unit/attunementValidator.test.ts
import { describe, it, expect } from "vitest";
import { AttunementValidator } from "../../../../stella/attunement/AttunementValidator";

describe("AttunementValidator", () => {
  const validator = new AttunementValidator();

  it("rejects you must", () => {
    expect(validator.validate("You must do this.")).toBe(false);
  });

  it("rejects clearly this means", () => {
    expect(validator.validate("Clearly this means something.")).toBe(false);
  });

  it("accepts perhaps", () => {
    expect(validator.validate("Perhaps this is worth exploring.")).toBe(true);
  });

  it("accepts one possible interpretation", () => {
    expect(validator.validate("One possible interpretation is this.")).toBe(true);
  });
});