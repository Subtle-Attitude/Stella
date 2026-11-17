// src/stella/narrative/NarrativeArcBuilder.ts
import type { NarrativeArc } from "../../app/stella/contracts/NarrativeArc";

export class NarrativeArcBuilder {
  build(themes: string[]): NarrativeArc {
    if (themes.length === 0) {
      return { themes: [], transitions: [], confidence: "low" };
    }
    const transitions = themes.slice(0, -1).map((t, i) => `${t} → ${themes[i + 1]}`);
    return {
      themes,
      transitions,
      confidence: themes.length > 1 ? "medium" : "low",
    };
  }
}