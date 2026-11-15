// src/stella/projects/ProjectRegistry.ts
import type { ProjectProfile } from "../../app/stella/contracts/ProjectProfile";

export class ProjectRegistry {
  private readonly projects = new Map<string, ProjectProfile>();

  record(
    project: string,
    goal?: string,
    theme?: string,
    seenAt: Date = new Date()
  ): ProjectProfile {
    const key = project.toLowerCase();
    const existing = this.projects.get(key);

    if (!existing) {
      const created: ProjectProfile = {
        project,
        goals: goal ? [goal] : [],
        associatedThemes: theme ? [theme] : [],
        firstSeen: seenAt,
        lastSeen: seenAt,
        status: "identified",
      };
      this.projects.set(key, created);
      return created;
    }

    const updated: ProjectProfile = {
      ...existing,
      lastSeen: seenAt,
      goals:
        goal && !existing.goals.includes(goal)
          ? [...existing.goals, goal]
          : existing.goals,
      associatedThemes:
        theme && !existing.associatedThemes.includes(theme)
          ? [...existing.associatedThemes, theme]
          : existing.associatedThemes,
    };

    this.projects.set(key, updated);
    return updated;
  }

  updateStatus(
    project: string,
    status: ProjectProfile["status"]
  ): ProjectProfile | undefined {
    const key = project.toLowerCase();
    const existing = this.projects.get(key);
    if (!existing) return undefined;

    const updated: ProjectProfile = {
      ...existing,
      status,
    };

    this.projects.set(key, updated);
    return updated;
  }

  get(project: string): ProjectProfile | undefined {
    return this.projects.get(project.toLowerCase());
  }

  all(): ProjectProfile[] {
    return Array.from(this.projects.values());
  }
}