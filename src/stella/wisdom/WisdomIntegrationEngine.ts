// src/stella/wisdom/WisdomIntegrationEngine.ts
import type { WisdomCandidate } from "../../app/stella/contracts/WisdomCandidate";

export class WisdomIntegrationEngine {
  detect(polarities: { valueA: string; valueB: string }[], values: string[] = []): WisdomCandidate[] {
    const candidates: WisdomCandidate[] = [];
    const lowerValues = values.map((v) => v.toLowerCase());

    for (const p of polarities) {
      const a = p.valueA.toLowerCase();
      const b = p.valueB.toLowerCase();

      if ((a === "growth" && b === "stability") || (a === "stability" && b === "growth")) {
        candidates.push({
          polarityA: "Growth",
          polarityB: "Stability",
          integration: "Sustainable Growth",
          confidence: "medium",
          evidence: ["Growth", "Stability", ...(lowerValues.includes("stewardship") ? ["Stewardship"] : [])],
        });
      }
      if ((a === "belonging" && b === "autonomy") || (a === "autonomy" && b === "belonging")) {
        candidates.push({
          polarityA: "Belonging",
          polarityB: "Autonomy",
          integration: "Interdependent Independence",
          confidence: "medium",
          evidence: ["Belonging", "Autonomy"],
        });
      }
      if ((a === "creativity" && b === "structure") || (a === "structure" && b === "creativity")) {
        candidates.push({
          polarityA: "Creativity",
          polarityB: "Structure",
          integration: "Creative Discipline",
          confidence: "medium",
          evidence: ["Creativity", "Structure"],
        });
      }
      if ((a === "exploration" && b === "stewardship") || (a === "stewardship" && b === "exploration")) {
        candidates.push({
          polarityA: "Exploration",
          polarityB: "Stewardship",
          integration: "Responsible Discovery",
          confidence: "medium",
          evidence: ["Exploration", "Stewardship"],
        });
      }
      if ((a === "reflection" && b === "action") || (a === "action" && b === "reflection")) {
        candidates.push({
          polarityA: "Reflection",
          polarityB: "Action",
          integration: "Intentional Action",
          confidence: "low",
          evidence: ["Reflection", "Action"],
        });
      }
    }

    return candidates;
  }
}