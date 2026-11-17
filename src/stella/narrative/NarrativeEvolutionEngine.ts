// src/stella/narrative/NarrativeEvolutionEngine.ts
import type { NarrativeEvolutionCandidate } from "../../app/stella/contracts/NarrativeEvolutionCandidate";

export class NarrativeEvolutionEngine {
  detect(themes: string[], values: string[]): NarrativeEvolutionCandidate[] {
    const candidates: NarrativeEvolutionCandidate[] = [];
    const lowerThemes = themes.map((t) => t.toLowerCase());
    const lowerValues = values.map((v) => v.toLowerCase());

    if (lowerThemes.includes("exploration") && lowerValues.includes("stewardship")) {
      candidates.push({
        sourceTheme: "Exploration",
        evolvedTheme: "Stewardship",
        confidence: "medium",
        evidence: ["Exploration", "Stewardship"],
      });
    }
    if (lowerThemes.includes("interconnection") && lowerValues.includes("belonging")) {
      candidates.push({
        sourceTheme: "Interconnection",
        evolvedTheme: "Community Building",
        confidence: "medium",
        evidence: ["Interconnection", "Belonging"],
      });
    }
    if (lowerThemes.includes("transformation") && lowerValues.includes("resilience") && lowerValues.includes("growth")) {
      candidates.push({
        sourceTheme: "Transformation",
        evolvedTheme: "Stewardship",
        confidence: "medium",
        evidence: ["Transformation", "Resilience", "Growth"],
      });
    }
    if (lowerThemes.includes("exploration") && lowerValues.includes("knowledge sharing")) {
      candidates.push({
        sourceTheme: "Exploration",
        evolvedTheme: "Teaching",
        confidence: "low",
        evidence: ["Exploration", "Knowledge Sharing"],
      });
    }

    return candidates;
  }
}