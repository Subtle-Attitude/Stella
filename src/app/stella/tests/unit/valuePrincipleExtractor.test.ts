// src/app/stella/tests/unit/valuePrincipleExtractor.test.ts
import { describe, it, expect } from "vitest";
import { ValuePrincipleExtractor } from "../../../../stella/values/ValuePrincipleExtractor";

describe("ValuePrincipleExtractor", () => {
  const extractor = new ValuePrincipleExtractor();

  it("extracts growth", () => {
    expect(extractor.extract("Growth is important to me")[0].name).toBe("Growth");
  });

  it("extracts stewardship", () => {
    expect(extractor.extract("I deeply value stewardship")[0].name).toBe("Stewardship");
  });

  it("extracts belonging", () => {
    expect(extractor.extract("Belonging matters to me")[0].name).toBe("Belonging");
  });

  it("ignores unrelated", () => {
    expect(extractor.extract("I like tea").length).toBe(0);
  });
});