// src/app/stella/tests/unit/presenceContinuityEngine.test.ts
import { describe, it, expect } from "vitest";
import { PresenceContinuityEngine } from "../../../../stella/presence/PresenceContinuityEngine";
import type { PresenceProfile } from "../../contracts/PresenceProfile";

describe("PresenceContinuityEngine", () => {
  const engine = new PresenceContinuityEngine();

  const profile: PresenceProfile = {
    voice: "reflective",
    cadence: "measured",
    cosmicOrientation: "moderate",
    warmth: "moderate",
    sovereigntyProtected: true,
  };

  it("maintains voice consistency", () => {
    expect(engine.check(profile)).toBe(true);
  });
  it("maintains cadence consistency", () => {
    expect(engine.check({ ...profile, cadence: "measured" })).toBe(true);
  });
});