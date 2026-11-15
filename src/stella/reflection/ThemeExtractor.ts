import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";

export class ThemeExtractor {
  extractThemes(memories: MemoryRecord[]): string[] {
    if (memories.length === 0) {
      return [];
    }

    const themes = new Set<string>();

    for (const memory of memories) {
      const text =
        typeof memory.content === "string"
          ? memory.content.toLowerCase()
          : "";

      // Sprint 11:
      // Simple keyword-based thematic grouping.
      // Future Sprint:
      // Replace with semantic clustering and topic synthesis.

      if (
        text.includes("journal") ||
        text.includes("reflect") ||
        text.includes("writing")
      ) {
        themes.add("creative self-reflection");
      }

      if (
        text.includes("goal") ||
        text.includes("plan") ||
        text.includes("roadmap")
      ) {
        themes.add("intentional growth");
      }

      if (
        text.includes("relationship") ||
        text.includes("family") ||
        text.includes("friend")
      ) {
        themes.add("human connection");
      }
    }

    return [...themes];
  }
}