// src/stella/themes/ThemeContinuityEngine.ts
import type { ThemeProfile } from "../../app/stella/contracts/ThemeProfile";

export type ContinuityLevel = "isolated" | "emerging" | "persistent";

export class ThemeContinuityEngine {
  classify(profile: ThemeProfile): ContinuityLevel {
    if (profile.frequency === 1) return "isolated";
    if (profile.frequency < 5) return "emerging";
    return "persistent";
  }
}