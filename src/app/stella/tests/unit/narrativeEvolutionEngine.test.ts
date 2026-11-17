// src/app/stella/tests/unit/narrativeEvolutionEngine.test.ts
import { describe, it, expect } from "vitest";
import { NarrativeEvolutionEngine } from "../../../../stella/narrative/NarrativeEvolutionEngine";

describe("NarrativeEvolutionEngine", () => {
  const engine = new NarrativeEvolutionEngine();

  it("detects Exploration → Stewardship", () => {
    const result = engine.detect(["Exploration"], ["Stewardship"]);
    expect(result[0].evolvedTheme).toBe("Stewardship");
  });

  it("detects Interconnection → Community Building", () => {
    const result = engine.detect(["Interconnection"], ["Belonging"]);
    expect(result[0].evolvedTheme).toBe("Community Building");
  });

  it("detects Transformation → Stewardship", () => {
    const result = engine.detect(["Transformation"], ["Resilience", "Growth"]);
    expect(result[0].evolvedTheme).toBe("Stewardship");
  });

  it("returns empty for unrelated", () => {
    expect(engine.detect(["Unrelated"], []).length).toBe(0);
  });
});