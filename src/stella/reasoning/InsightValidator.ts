// src/stella/reasoning/InsightValidator.ts
import type { ReasoningInsight } from "../../app/stella/contracts/ReasoningInsight";

const FORBIDDEN = [
  "proves",
  "must",
  "definitely",
  "always",
  "never",
  "is destined",
  "your identity",
];

export class InsightValidator {
  validate(insight: ReasoningInsight): boolean {
    const text = insight.insight.toLowerCase();
    if (FORBIDDEN.some((phrase) => text.includes(phrase))) return false;

    const hasSupport =
      insight.supportingThemes.length +
      insight.supportingSituations.length +
      insight.supportingGoals.length +
      insight.supportingProjects.length >
      0;

    return hasSupport;
  }
}