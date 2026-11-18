// src/app/stella/tests/unit/wisdomIntegrationEngine.test.ts
import { describe, it, expect } from "vitest";
import { WisdomIntegrationEngine } from "../../../../stella/wisdom/WisdomIntegrationEngine";

describe("WisdomIntegrationEngine", () => {
  const engine = new WisdomIntegrationEngine();

  it("maps Growth ↔ Stability → Sustainable Growth", () => {
    const result = engine.detect([{ valueA: "Growth", valueB: "Stability" }]);
    expect(result[0].integration).toBe("Sustainable Growth");
  });

  it("maps Belonging ↔ Autonomy → Interdependent Independence", () => {
    const result = engine.detect([{ valueA: "Belonging", valueB: "Autonomy" }]);
    expect(result[0].integration).toBe("Interdependent Independence");
  });

  it("maps Creativity ↔ Structure → Creative Discipline", () => {
    const result = engine.detect([{ valueA: "Creativity", valueB: "Structure" }]);
    expect(result[0].integration).toBe("Creative Discipline");
  });

  it("returns empty for unrelated", () => {
    expect(engine.detect([{ valueA: "Tea", valueB: "Coffee" }]).length).toBe(0);
  });
});