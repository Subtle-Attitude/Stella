// src/app/stella/tests/unit/traceabilityEngine.test.ts
import { describe, it, expect } from "vitest";
import { TraceabilityEngine } from "../../../../stella/explainability/TraceabilityEngine";

describe("TraceabilityEngine", () => {
  const engine = new TraceabilityEngine();

  it("creates trace chains", () => {
    const nodes = engine.build(["Growth", "Exploration", "Sustainable Growth"]);
    expect(nodes).toHaveLength(3);
    expect(nodes[0].label).toBe("Growth");
  });

  it("preserves order", () => {
    const nodes = engine.build(["A", "B", "C"]);
    expect(nodes[1].label).toBe("B");
  });

  it("handles empty input", () => {
    expect(engine.build([])).toHaveLength(0);
  });
});