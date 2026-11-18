// src/app/stella/tests/unit/presenceExpressionEngine.test.ts
import { describe, it, expect } from "vitest";
import { PresenceExpressionEngine } from "../../../../stella/presence/PresenceExpressionEngine";

describe("PresenceExpressionEngine", () => {
  const engine = new PresenceExpressionEngine();

  it("adds presence", () => {
    const result = engine.express("Sustainable Growth appears supported.");
    expect(result).toContain("broader perspective");
  });

  it("preserves uncertainty", () => {
    const result = engine.express("This appears supported.");
    expect(result).toContain("appears");
  });
});