// src/stella/goals/GoalRegistry.ts
import type { GoalProfile } from "../../app/stella/contracts/GoalProfile";

export class GoalRegistry {
  private readonly goals = new Map<string, GoalProfile>();

  record(
    goal: string,
    memoryId?: string,
    theme?: string,
    seenAt: Date = new Date()
  ): GoalProfile {
    const key = goal.toLowerCase();
    const existing = this.goals.get(key);

    if (!existing) {
      const created: GoalProfile = {
        goal,
        frequency: 1,
        firstSeen: seenAt,
        lastSeen: seenAt,
        status: "identified",
        associatedThemes: theme ? [theme] : [],
        supportingMemoryIds: memoryId ? [memoryId] : [],
      };
      this.goals.set(key, created);
      return created;
    }

    const updated: GoalProfile = {
      ...existing,
      frequency: existing.frequency + 1,
      lastSeen: seenAt,
      associatedThemes:
        theme && !existing.associatedThemes.includes(theme)
          ? [...existing.associatedThemes, theme]
          : existing.associatedThemes,
      supportingMemoryIds:
        memoryId && !existing.supportingMemoryIds.includes(memoryId)
          ? [...existing.supportingMemoryIds, memoryId]
          : existing.supportingMemoryIds,
    };

    this.goals.set(key, updated);
    return updated;
  }

  get(goal: string): GoalProfile | undefined {
    return this.goals.get(goal.toLowerCase());
  }

  all(): GoalProfile[] {
    return Array.from(this.goals.values());
  }
}