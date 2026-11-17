// src/app/stella/tests/unit/lifeThemeExtractor.test.ts
import { describe, it, expect } from "vitest";
import { LifeThemeExtractor } from "../../../../stella/lifethemes/LifeThemeExtractor";

describe("LifeThemeExtractor", () => {
  const extractor = new LifeThemeExtractor();

  it("maps Sun Dancer + Belonging → Interconnection", () => {
    const result = extractor.extract(["Belonging"], ["Sun Dancer"]);
    expect(result[0].name).toBe("Interconnection");
  });

  it("maps Wayfinder + Growth → Exploration", () => {
    const result = extractor.extract(["Growth", "Curiosity"], ["Wayfinder"]);
    expect(result[0].name).toBe("Exploration");
  });

  it("maps Growth + Resilience → Transformation", () => {
    const result = extractor.extract(["Growth", "Resilience"], []);
    expect(result[0].name).toBe("Transformation");
  });

  it("returns empty for unrelated", () => {
    expect(extractor.extract(["Tea"], []).length).toBe(0);
  });
});