// src/app/stella/tests/unit/narrativeArcBuilder.test.ts
import { describe, it, expect } from "vitest";
import { NarrativeArcBuilder } from "../../../../stella/narrative/NarrativeArcBuilder";

describe("NarrativeArcBuilder", () => {
  const builder = new NarrativeArcBuilder();

  it("builds arc", () => {
    const arc = builder.build(["Exploration", "Interconnection", "Stewardship"]);
    expect(arc.themes).toHaveLength(3);
    expect(arc.transitions).toContain("Exploration → Interconnection");
  });

  it("handles empty", () => {
    const arc = builder.build([]);
    expect(arc.themes).toHaveLength(0);
  });
});