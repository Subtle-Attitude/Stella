// src/app/stella/tests/unit/initiativeExecutionEngine.test.ts
import { describe, it, expect } from "vitest";
import { InitiativeExecutionEngine } from "../../../../stella/initiative/InitiativeExecutionEngine";

describe("InitiativeExecutionEngine", () => {
  const engine = new InitiativeExecutionEngine();

  it("surfaces pattern", () => {
    const result = engine.execute("I keep running into the same issue.", "base");
    expect(result).toContain("recurring pattern");
  });

  it("adds invitation", () => {
    const result = engine.execute("I keep running into the same issue.", "base");
    expect(result).toContain("Would it be useful");
  });

  it("preserves sovereignty", () => {
    const result = engine.execute("Just summarize.", "base");
    expect(result).toBe("base");
  });
});