// src/app/stella/tests/unit/relationalAttunementEngineV2.test.ts
import { describe, it, expect } from "vitest";
import { RelationalAttunementEngineV2 } from "../../../../stella/attunement/RelationalAttunementEngineV2";

describe("RelationalAttunementEngineV2", () => {
  const engine = new RelationalAttunementEngineV2();

  it("adds reflective question", () => {
    const result = engine.attune("Sustainable Growth appears supported.", "I keep noticing this pattern.");
    expect(result).toContain("What aspect");
  });

  it("adds planning focus", () => {
    const result = engine.attune("Sustainable Growth appears supported.", "Help me prioritize next steps.");
    expect(result).toContain("Recommended next focus");
  });

  it("preserves original reasoning", () => {
    const result = engine.attune("Sustainable Growth appears supported.", "reflection");
    expect(result).toContain("Sustainable Growth appears supported.");
  });
});