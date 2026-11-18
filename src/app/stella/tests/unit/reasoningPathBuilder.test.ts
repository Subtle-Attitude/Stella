// src/app/stella/tests/unit/reasoningPathBuilder.test.ts
import { describe, it, expect } from "vitest";
import { ReasoningPathBuilder } from "../../../../stella/explainability/ReasoningPathBuilder";

describe("ReasoningPathBuilder", () => {
  const builder = new ReasoningPathBuilder();

  it("calculates path length", () => {
    const path = builder.build("Sustainable Growth", ["Growth", "Exploration", "Sustainable Growth"]);
    expect(path.length).toBe(3);
  });

  it("preserves path sequence", () => {
    const path = builder.build("test", ["A", "B"]);
    expect(path.path).toEqual(["A", "B"]);
  });
});