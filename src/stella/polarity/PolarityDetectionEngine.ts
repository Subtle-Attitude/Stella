// src/stella/polarity/PolarityDetectionEngine.ts
import type { PolarityCandidate } from "../../app/stella/contracts/PolarityCandidate";

export class PolarityDetectionEngine {
  detect(values: string[]): PolarityCandidate[] {
    const candidates: PolarityCandidate[] = [];
    const lower = values.map((v) => v.toLowerCase());

    if (lower.includes("growth") && (lower.includes("stability") || lower.includes("sustainability") || lower.includes("consistency"))) {
      candidates.push({ valueA: "Growth", valueB: "Stability", confidence: "medium", evidence: ["Growth", "Stability"] });
    }
    if (lower.includes("belonging") && (lower.includes("autonomy") || lower.includes("independence"))) {
      candidates.push({ valueA: "Belonging", valueB: "Autonomy", confidence: "medium", evidence: ["Belonging", "Autonomy"] });
    }
    if (lower.includes("creativity") && (lower.includes("structure") || lower.includes("organization") || lower.includes("routine"))) {
      candidates.push({ valueA: "Creativity", valueB: "Structure", confidence: "medium", evidence: ["Creativity", "Structure"] });
    }
    if (lower.includes("exploration") && lower.includes("stewardship")) {
      candidates.push({ valueA: "Exploration", valueB: "Stewardship", confidence: "medium", evidence: ["Exploration", "Stewardship"] });
    }
    if (lower.includes("reflection") && lower.includes("action")) {
      candidates.push({ valueA: "Reflection", valueB: "Action", confidence: "low", evidence: ["Reflection", "Action"] });
    }

    return candidates;
  }
}