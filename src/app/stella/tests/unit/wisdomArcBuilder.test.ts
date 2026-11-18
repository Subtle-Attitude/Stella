// src/app/stella/tests/unit/wisdomArcBuilder.test.ts
import { describe, it, expect } from "vitest";
import { WisdomArcBuilder } from "../../../../stella/wisdom/WisdomArcBuilder";

describe("WisdomArcBuilder", () => {
  const builder = new WisdomArcBuilder();

  it("builds integration arc", () => {
    const arc = builder.build(["Growth ↔ Stability"], ["Sustainable Growth"]);
    expect(arc.integrations).toContain("Sustainable Growth");
  });

  it("handles empty", () => {
    const arc = builder.build([], []);
    expect(arc.integrations).toHaveLength(0);
  });
});