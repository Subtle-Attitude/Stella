// src/app/stella/tests/unit/explainabilityHealthEngine.test.ts
import { describe, it, expect } from "vitest";
import { ExplainabilityHealthEngine } from "../../../../stella/explainability/ExplainabilityHealthEngine";

describe("ExplainabilityHealthEngine", () => {
  const engine = new ExplainabilityHealthEngine();

  it("healthy with full coverage", () => {
    expect(engine.evaluate(5, 5).health).toBe("healthy");
  });

  it("needs_review with missing coverage", () => {
    expect(engine.evaluate(5, 3).health).toBe("needs_review");
  });
});