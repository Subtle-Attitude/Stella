// src/app/stella/tests/unit/adaptiveWisdomEngine.test.ts
import { describe, it, expect } from "vitest";
import { AdaptiveWisdomEngine } from "../../../../stella/meta/AdaptiveWisdomEngine";

describe("AdaptiveWisdomEngine", () => {
  const engine = new AdaptiveWisdomEngine();

  it("detects confidence increase", () => {
    const result = engine.compare("Sustainable Growth", "low", "medium");
    expect(result.change).toBe("increased");
  });

  it("detects no change", () => {
    const result = engine.compare("Sustainable Growth", "medium", "medium");
    expect(result.change).toBe("unchanged");
  });

  it("detects confidence decrease", () => {
    const result = engine.compare("Sustainable Growth", "medium", "low");
    expect(result.change).toBe("decreased");
  });
});