// src/app/stella/tests/unit/attunementProfileEngine.test.ts
import { describe, it, expect } from "vitest";
import { AttunementProfileEngine } from "../../../../stella/attunement/AttunementProfileEngine";

describe("AttunementProfileEngine", () => {
  const engine = new AttunementProfileEngine();

  it("maps planning profile", () => {
    const profile = engine.map("planning");
    expect(profile.verbosity).toBe("concise");
    expect(profile.cadence).toBe("direct");
  });

  it("maps reflection profile", () => {
    const profile = engine.map("reflection");
    expect(profile.verbosity).toBe("spacious");
    expect(profile.questioning).toBe("reflective");
  });
});