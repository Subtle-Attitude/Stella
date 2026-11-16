// src/app/stella/tests/unit/situationContinuityEngine.test.ts
import { describe, it, expect } from "vitest";
import { SituationContinuityEngine } from "../../../../stella/situations/SituationContinuityEngine";
import type { SituationProfile } from "../../contracts/SituationProfile";

describe("SituationContinuityEngine", () => {
  const engine = new SituationContinuityEngine();

  const profile = (themes: string[], relationships: string[]): SituationProfile => ({
    situation: "test",
    associatedThemes: themes,
    associatedRelationships: relationships,
    firstSeen: new Date(),
    lastSeen: new Date(),
    status: "active",
  });

  it("classifies isolated", () => {
    expect(engine.classify(profile(["a"], []))).toBe("isolated");
  });

  it("classifies emerging", () => {
    expect(engine.classify(profile(["a", "b"], ["c"]))).toBe("emerging");
  });

  it("classifies persistent", () => {
    expect(engine.classify(profile(["a", "b"], ["c", "d"]))).toBe("persistent");
  });
});