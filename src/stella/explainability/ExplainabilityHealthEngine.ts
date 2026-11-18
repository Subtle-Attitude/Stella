// src/stella/explainability/ExplainabilityHealthEngine.ts
import type { ExplainabilityHealth } from "../../app/stella/contracts/ExplainabilityHealth";

export class ExplainabilityHealthEngine {
  evaluate(total: number, covered: number): ExplainabilityHealth {
    const coverage = total === 0 ? 100 : Math.round((covered / total) * 100);
    return {
      explanationsGenerated: covered,
      traceCoverage: coverage,
      health: coverage === 100 ? "healthy" : "needs_review",
    };
  }
}