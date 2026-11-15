import type { RelationshipProfile } from "../../app/stella/contracts/RelationshipProfile";

export class RelationshipRegistry {
  private readonly relationships = new Map<
    string,
    RelationshipProfile
  >();

  record(
    entity: string,
    theme?: string,
    seenAt: Date = new Date()
  ): RelationshipProfile {
    const key = entity.toLowerCase();

    const existing =
      this.relationships.get(key);

    if (!existing) {
      const created: RelationshipProfile = {
        entity,
        frequency: 1,
        firstSeen: seenAt,
        lastSeen: seenAt,
        associatedThemes:
          theme ? [theme] : [],
      };

      this.relationships.set(
        key,
        created
      );

      return created;
    }

    const updated: RelationshipProfile = {
      ...existing,
      frequency:
        existing.frequency + 1,
      lastSeen: seenAt,
      associatedThemes: theme &&
        !existing.associatedThemes.includes(theme)
          ? [
              ...existing.associatedThemes,
              theme,
            ]
          : existing.associatedThemes,
    };

    this.relationships.set(
      key,
      updated
    );

    return updated;
  }

  get(
    entity: string
  ): RelationshipProfile | undefined {
    return this.relationships.get(
      entity.toLowerCase()
    );
  }

  all(): RelationshipProfile[] {
    return Array.from(
      this.relationships.values()
    );
  }
}