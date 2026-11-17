// src/stella/perspective/CosmicPerspectiveEngine.ts
import type { ReasoningInsight } from "../../app/stella/contracts/ReasoningInsight";
import type { CosmicPerspective } from "../../app/stella/contracts/CosmicPerspective";
import { PerspectiveValidator } from "./PerspectiveValidator";

export class CosmicPerspectiveEngine {
  constructor(private readonly validator = new PerspectiveValidator()) {}

  generate(insights: ReasoningInsight[]): CosmicPerspective[] {
    const perspectives: CosmicPerspective[] = [];
    const texts = insights.map((i) => i.insight.toLowerCase());

    if (texts.some((t) => t.includes("growth"))) {
      perspectives.push({
        perspective: "One way to view this pattern is as evidence of sustained growth-oriented effort.",
        supportingInsights: insights.map((i) => i.insight),
        type: "growth",
        confidence: "medium",
      });
    }

    if (insights.length >= 2) {
      perspectives.push({
        perspective: "This pattern may reflect how personal growth often emerges within larger relationships, communities, and environments.",
        supportingInsights: insights.map((i) => i.insight),
        type: "belonging",
        confidence: "medium",
      });
    }

    if (texts.some((t) => t.includes("relationship") || t.includes("goal"))) {
      perspectives.push({
        perspective: "A community-oriented perspective might note that many long-term goals are strengthened by supportive relationships and collaboration.",
        supportingInsights: insights.map((i) => i.insight),
        type: "community",
        confidence: "medium",
      });
    }

    if (texts.length >= 3) {
      perspectives.push({
        perspective: "A systems perspective could view these patterns as reinforcing parts of a larger ongoing process.",
        supportingInsights: insights.map((i) => i.insight),
        type: "systems",
        confidence: "medium",
      });
    }

    if (texts.some((t) => t.includes("project"))) {
      perspectives.push({
        perspective: "It may be worth considering what new opportunities could emerge if these efforts continue successfully.",
        supportingInsights: insights.map((i) => i.insight),
        type: "possibility",
        confidence: "low",
      });
    }

    if (perspectives.length === 0) {
      perspectives.push({
        perspective: "This pattern may be worth revisiting over time to observe how it changes.",
        supportingInsights: insights.map((i) => i.insight),
        type: "reflection",
        confidence: "low",
      });
    }

    return perspectives.filter((p) => this.validator.validate(p));
  }
}