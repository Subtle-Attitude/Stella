// src/stella/situations/SituationRegistry.ts
import type { SituationProfile } from "../../app/stella/contracts/SituationProfile";

export class SituationRegistry {
  private readonly situations = new Map<string, SituationProfile>();

  record(
    situation: string,
    theme?: string,
    relationship?: string,
    seenAt: Date = new Date()
  ): SituationProfile {
    const key = situation.toLowerCase();
    const existing = this.situations.get(key);

    if (!existing) {
      const created: SituationProfile = {
        situation,
        associatedThemes: theme ? [theme] : [],
        associatedRelationships: relationship ? [relationship] : [],
        firstSeen: seenAt,
        lastSeen: seenAt,
        status: "active",
      };
      this.situations.set(key, created);
      return created;
    }

    const updated: SituationProfile = {
      ...existing,
      lastSeen: seenAt,
      associatedThemes:
        theme && !existing.associatedThemes.includes(theme)
          ? [...existing.associatedThemes, theme]
          : existing.associatedThemes,
      associatedRelationships:
        relationship && !existing.associatedRelationships.includes(relationship)
          ? [...existing.associatedRelationships, relationship]
          : existing.associatedRelationships,
    };

    this.situations.set(key, updated);
    return updated;
  }

  get(situation: string): SituationProfile | undefined {
    return this.situations.get(situation.toLowerCase());
  }

  all(): SituationProfile[] {
    return Array.from(this.situations.values());
  }

  updateStatus(
    situation: string,
    status: SituationProfile["status"]
  ): SituationProfile | undefined {
    const key = situation.toLowerCase();
    const existing = this.situations.get(key);
    if (!existing) return undefined;

    const updated: SituationProfile = { ...existing, status };
    this.situations.set(key, updated);
    return updated;
  }
}