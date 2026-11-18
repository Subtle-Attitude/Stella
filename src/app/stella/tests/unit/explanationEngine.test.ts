// src/app/stella/tests/unit/explanationEngine.test.ts
import { describe, it, expect } from "vitest";
import { ExplanationEngine } from "../../../../stella/explainability/ExplanationEngine";
import type { TraceNode } from "../../contracts/TraceNode";

describe("ExplanationEngine", () => {
  const engine = new ExplanationEngine();

  const nodes: TraceNode[] = [
    { id: "1", type: "theme", label: "Growth" },
    { id: "2", type: "narrative", label: "Exploration" },
  ];

  it("uses constitutional language", () => {
    const text = engine.explain("Sustainable Growth", nodes);
    expect(text).toContain("appears supported by");
    expect(text).toContain("Growth");
  });

  it("includes evidence", () => {
    const text = engine.explain("Sustainable Growth", nodes);
    expect(text).toContain("Exploration");
  });
});