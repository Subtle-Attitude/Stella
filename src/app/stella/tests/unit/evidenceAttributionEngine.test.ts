// src/app/stella/tests/unit/evidenceAttributionEngine.test.ts
import { describe, it, expect } from "vitest";
import { EvidenceAttributionEngine } from "../../../../stella/explainability/EvidenceAttributionEngine";

describe("EvidenceAttributionEngine", () => {
  const engine = new EvidenceAttributionEngine();

  it("returns supporting evidence", () => {
    expect(engine.attribute("Sustainable Growth", ["Growth", "Stability"])).toEqual(["Growth", "Stability"]);
  });

  it("handles missing evidence", () => {
    expect(engine.attribute("test", [])).toHaveLength(0);
  });
});