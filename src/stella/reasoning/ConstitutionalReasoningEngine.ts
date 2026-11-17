// src/stella/reasoning/ConstitutionalReasoningEngine.ts
import type { ReasoningInsight } from "../../app/stella/contracts/ReasoningInsight";
import { InsightValidator } from "./InsightValidator";

export class ConstitutionalReasoningEngine {
  constructor(private readonly validator = new InsightValidator()) {}

  reason(
    themes: string[],
    situations: string[],
    goals: string[],
    projects: string[]
  ): ReasoningInsight[] {
    const insights: ReasoningInsight[] = [];

    for (const theme of themes) {
      for (const situation of situations) {
        insights.push({
          insight: `The recurring theme of ${theme} appears within the ${situation} situation.`,
          supportingThemes: [theme],
          supportingSituations: [situation],
          supportingGoals: [],
          supportingProjects: [],
          confidence: "medium",
        });
      }
    }

    for (const situation of situations) {
      for (const goal of goals) {
        insights.push({
          insight: `The ${situation} situation appears related to the goal of ${goal}.`,
          supportingThemes: [],
          supportingSituations: [situation],
          supportingGoals: [goal],
          supportingProjects: [],
          confidence: "high",
        });
      }
    }

    for (const goal of goals) {
      for (const project of projects) {
        insights.push({
          insight: `The ${project} project appears to support the ${goal} goal.`,
          supportingThemes: [],
          supportingSituations: [],
          supportingGoals: [goal],
          supportingProjects: [project],
          confidence: "high",
        });
      }
    }

    if (themes.length && situations.length && goals.length && projects.length) {
      insights.push({
        insight: `${themes[0]} appears consistently across the ${projects[0]} project, ${goals[0]} goal, and ${situations[0]} situation.`,
        supportingThemes: [themes[0]],
        supportingSituations: [situations[0]],
        supportingGoals: [goals[0]],
        supportingProjects: [projects[0]],
        confidence: "high",
      });
    }

    return insights.filter((insight) => this.validator.validate(insight));
  }
}