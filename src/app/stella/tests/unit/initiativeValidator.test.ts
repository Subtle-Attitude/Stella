// src/app/stella/tests/unit/initiativeValidator.test.ts
import { describe, it, expect } from "vitest";
import { InitiativeValidator } from "../../../../stella/initiative/InitiativeValidator";

describe("InitiativeValidator", () => {
  const validator = new InitiativeValidator();

  it("rejects destiny", () => {
    expect(validator.validate("Your destiny is clear.")).toBe(false);
  });

  it("rejects must", () => {
    expect(validator.validate("You must do this.")).toBe(false);
  });

  it("accepts appears", () => {
    expect(validator.validate("This appears supported.")).toBe(true);
  });

  it("accepts would it be useful", () => {
    expect(validator.validate("Would it be useful to explore?")).toBe(true);
  });
});