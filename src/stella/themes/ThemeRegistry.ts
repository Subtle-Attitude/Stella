import type { ThemeProfile } from "../../app/stella/contracts/ThemeProfile";

export class ThemeRegistry {
  private readonly themes = new Map<
    string,
    ThemeProfile
  >();

  record(
    theme: string,
    seenAt: Date = new Date()
  ): ThemeProfile {
    const existing =
      this.themes.get(theme);

    if (!existing) {
      const created: ThemeProfile = {
        theme,
        frequency: 1,
        firstSeen: seenAt,
        lastSeen: seenAt,
      };

      this.themes.set(
        theme,
        created
      );

      return created;
    }

    const updated: ThemeProfile = {
      ...existing,
      frequency:
        existing.frequency + 1,
      lastSeen: seenAt,
    };

    this.themes.set(
      theme,
      updated
    );

    return updated;
  }

  get(
    theme: string
  ): ThemeProfile | undefined {
    return this.themes.get(theme);
  }

  all(): ThemeProfile[] {
    return Array.from(
      this.themes.values()
    );
  }
}
