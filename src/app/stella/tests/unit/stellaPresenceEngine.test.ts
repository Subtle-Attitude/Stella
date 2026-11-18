// src/app/stella/tests/unit/stellaPresenceEngine.test.ts
import { describe, it, expect } from "vitest";
import { StellaPresenceEngine } from "../../../../stella/presence/StellaPresenceEngine";

describe("StellaPresenceEngine", () => {
  const engine = new StellaPresenceEngine();

  it("loads default presence", () => {
    const profile = engine.load();
    expect(profile.voice).toBe("reflective");
  });

  it("preserves sovereignty", () => {
    const profile = engine.load();
    expect(profile.sovereigntyProtected).toBe(true);
  });
});