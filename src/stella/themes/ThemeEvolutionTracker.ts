// src/stella/themes/ThemeEvolutionTracker.ts
import type { ThemeProfile } from "../../app/stella/contracts/ThemeProfile";

export class ThemeEvolutionTracker {
  durationDays(profile: ThemeProfile, now: Date = new Date()): number {
    const ms = now.getTime() - profile.firstSeen.getTime();
    return Math.floor(ms / (1000 * 60 * 60 * 24));
  }

  summary(profile: ThemeProfile, now: Date = new Date()): string {
    const days = this.durationDays(profile, now);
    return `${profile.theme} seen ${profile.frequency} times, active for ${days} days`;
  }
}