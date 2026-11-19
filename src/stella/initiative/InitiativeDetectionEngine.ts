// src/stella/initiative/InitiativeDetectionEngine.ts

import type { InitiativeLevel } from "../../app/stella/contracts/InitiativeLevel";

export class InitiativeDetectionEngine {
  detect(text: string): InitiativeLevel {
    const lower = text.toLowerCase();

    if (
      lower.includes("summarize") ||
      lower.includes("just answer") ||
      lower.includes("be brief")
    ) {
      return "silent";
    }

    if (
      lower.includes("fix") ||
      lower.includes("bug") ||
      lower.includes("error") ||
      lower.includes("help me")
    ) {
      return "minimal";
    }

    if (
      lower.includes("pattern") ||
      lower.includes("keep") ||
      lower.includes("same") ||
      lower.includes("recurring")
    ) {
      return "reflective";
    }

    return "silent";
  }
}