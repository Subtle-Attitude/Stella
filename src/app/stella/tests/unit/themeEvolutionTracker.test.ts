// src/app/stella/tests/unit/themeEvolutionTracker.test.ts
import { describe, it, expect } from "vitest";
import { ThemeEvolutionTracker } from "../../../../stella/themes/ThemeEvolutionTracker";
import type { ThemeProfile } from "../../contracts/ThemeProfile";

describe("ThemeEvolutionTracker", () => {
  const tracker = new ThemeEvolutionTracker();

  it("calculates duration and recurrence", () => {
    const firstSeen = new Date("2026-01-01");
    const now = new Date("2026-03-25");
    const profile: ThemeProfile = {
      theme: "creative self-reflection",
      frequency: 14,
      firstSeen,
      lastSeen: now,
    };
    expect(tracker.durationDays(profile, now)).toBe(83);
    expect(tracker.summary(profile, now)).toContain("14 times");
    expect(tracker.summary(profile, now)).toContain("83 days");
  });
});