// src/app/stella/tests/unit/polarityDetectionEngine.test.ts
import { describe, it, expect } from "vitest";
import { PolarityDetectionEngine } from "../../../../stella/polarity/PolarityDetectionEngine";

describe("PolarityDetectionEngine", () => {
  const engine = new PolarityDetectionEngine();

  it("detects Growth ↔ Stability", () => {
    const result = engine.detect(["Growth", "Stability"]);
    expect(result[0].valueA).toBe("Growth");
    expect(result[0].valueB).toBe("Stability");
  });

  it("detects Belonging ↔ Autonomy", () => {
    const result = engine.detect(["Belonging", "Autonomy"]);
    expect(result[0].valueB).toBe("Autonomy");
  });

  it("detects Creativity ↔ Structure", () => {
    const result = engine.detect(["Creativity", "Structure"]);
    expect(result[0].valueA).toBe("Creativity");
  });

  it("returns empty when absent", () => {
    expect(engine.detect(["Tea"]).length).toBe(0);
  });
});