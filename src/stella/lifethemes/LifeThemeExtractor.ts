// src/stella/lifethemes/LifeThemeExtractor.ts
import type { LifeThemeCandidate } from "../../app/stella/contracts/LifeThemeCandidate";

export class LifeThemeExtractor {
  extract(values: string[], constructs: string[]): LifeThemeCandidate[] {
    const candidates: LifeThemeCandidate[] = [];
    const lowerValues = values.map((v) => v.toLowerCase());
    const lowerConstructs = constructs.map((c) => c.toLowerCase());

    if (lowerValues.includes("growth") && lowerValues.includes("curiosity") && lowerConstructs.includes("wayfinder")) {
      candidates.push({ name: "Exploration", confidence: "medium", evidence: ["Growth", "Curiosity", "Wayfinder"] });
    }
    if (lowerValues.includes("belonging") && lowerConstructs.includes("sun dancer")) {
      candidates.push({ name: "Interconnection", confidence: "medium", evidence: ["Belonging", "Sun Dancer"] });
    }
    if (lowerValues.includes("stewardship") && lowerValues.includes("belonging")) {
      candidates.push({ name: "Stewardship", confidence: "medium", evidence: ["Stewardship", "Belonging"] });
    }
    if (lowerValues.includes("creativity") && lowerValues.includes("growth")) {
      candidates.push({ name: "Creative Expression", confidence: "medium", evidence: ["Creativity", "Growth"] });
    }
    if (lowerValues.includes("growth") && lowerValues.includes("resilience")) {
      candidates.push({ name: "Transformation", confidence: "medium", evidence: ["Growth", "Resilience"] });
    }

    return candidates;
  }
}