export class NextActionEngine {
  suggest(
    project: string,
    goal: string
  ): string[] {
    const lower =
      `${project} ${goal}`.toLowerCase();

    if (
      lower.includes("atlas") ||
      lower.includes("launch")
    ) {
      return [
        "review launch checklist",
        "verify onboarding flow",
        "test user experience",
      ];
    }

    if (
      lower.includes("stella") ||
      lower.includes("build")
    ) {
      return [
        "review current architecture",
        "identify remaining sprint work",
        "verify unit tests",
      ];
    }

    // Sprint 17+
    // Replace keyword matching with
    // goal-aware planning heuristics.

    return [
      "review project progress",
    ];
  }
}