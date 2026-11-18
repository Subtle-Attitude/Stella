// src/app/stella/tests/unit/responsePacingEngine.test.ts
import { describe, it, expect } from "vitest";
import { ResponsePacingEngine } from "../../../../stella/attunement/ResponsePacingEngine";

describe("ResponsePacingEngine", () => {
  const engine = new ResponsePacingEngine();

  it("changes pacing", () => {
    const result = engine.pace("Line one.\n\nLine two.", "planning");
    expect(result).toBe("Line one.");
  });

  it("preserves meaning", () => {
    const result = engine.pace("Important insight.", "reflection");
    expect(result).toContain("Important insight.");
  });
});