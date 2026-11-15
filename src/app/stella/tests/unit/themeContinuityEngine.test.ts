// src/app/stella/tests/unit/themeContinuityEngine.test.ts
import { describe, it, expect } from "vitest";
import { ThemeContinuityEngine } from "../../../../stella/themes/ThemeContinuityEngine";
import type { ThemeProfile } from "../../contracts/ThemeProfile";

describe("ThemeContinuityEngine", () => {
  const engine = new ThemeContinuityEngine();

  const profile = (frequency: number): ThemeProfile => ({
    theme: "test",
    frequency,
    firstSeen: new Date(),
    lastSeen: new Date(),
  });

  it("classifies isolated", () => {
    expect(engine.classify(profile(1))).toBe("isolated");
  });

  it("classifies emerging", () => {
    expect(engine.classify(profile(3))).toBe("emerging");
  });

  it("classifies persistent", () => {
    expect(engine.classify(profile(5))).toBe("persistent");
  });
});