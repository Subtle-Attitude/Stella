// src/stella/attunement/QuestionSelectionEngine.ts
export class QuestionSelectionEngine {
  select(context: string): string {
    if (context === "planning") return "What is the highest-priority outcome?";
    if (context === "reflection") return "What aspect of this feels most significant?";
    if (context === "problem_solving") return "What changed most recently?";
    return "What possibility feels most worth exploring?";
  }
}