// src/app/stella/tests/unit/initiativeDecisionEngine.test.ts
import { describe, it, expect } from "vitest";
import { InitiativeDecisionEngine } from "../../../../stella/initiative/InitiativeDecisionEngine";

describe("InitiativeDecisionEngine", () => {
  const engine = new InitiativeDecisionEngine();

  it("produces reflective initiative", () => {
    const decision = engine.decide("I keep encountering this pattern.");
    expect(decision.level).toBe("reflective");
    expect(decision.trigger).toBe("recurring_pattern");
  });
});