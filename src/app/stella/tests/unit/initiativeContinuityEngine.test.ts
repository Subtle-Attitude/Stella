// src/app/stella/tests/unit/initiativeContinuityEngine.test.ts
import { describe, it, expect } from "vitest";
import { InitiativeContinuityEngine } from "../../../../stella/initiative/InitiativeContinuityEngine";

describe("InitiativeContinuityEngine", () => {
  const engine = new InitiativeContinuityEngine();

  it("preserves identity", () => {
    expect(engine.check("Would it be useful to explore?")).toBe(true);
  });

  it("preserves presence", () => {
    expect(engine.check("You must do this.")).toBe(false);
  });
});