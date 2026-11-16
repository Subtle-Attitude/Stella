// src/stella/situations/SituationContinuityEngine.ts
import type { SituationProfile } from "../../app/stella/contracts/SituationProfile";

export type SituationContinuity = "isolated" | "emerging" | "persistent";

export class SituationContinuityEngine {
  classify(profile: SituationProfile): SituationContinuity {
    const signal = profile.associatedThemes.length + profile.associatedRelationships.length;
    if (signal <= 1) return "isolated";
    if (signal <= 3) return "emerging";
    return "persistent";
  }
}