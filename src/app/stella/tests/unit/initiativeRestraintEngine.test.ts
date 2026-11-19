// src/app/stella/tests/unit/initiativeRestraintEngine.test.ts
import { describe, it, expect } from "vitest";
import { InitiativeRestraintEngine } from "../../../../stella/initiative/InitiativeRestraintEngine";

describe("InitiativeRestraintEngine", () => {
  const engine = new InitiativeRestraintEngine();

  it("blocks initiative for summaries", () => {
    expect(engine.shouldRestrain("Just summarize these notes.")).toBe(true);
  });

  it("blocks initiative for brief requests", () => {
    expect(engine.shouldRestrain("Be brief.")).toBe(true);
  });
});