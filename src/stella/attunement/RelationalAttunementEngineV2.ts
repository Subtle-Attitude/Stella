// src/stella/attunement/RelationalAttunementEngineV2.ts
import { ContextDetectionEngine } from "./ContextDetectionEngine";
import { QuestionSelectionEngine } from "./QuestionSelectionEngine";

export class RelationalAttunementEngineV2 {
  private readonly detector = new ContextDetectionEngine();
  private readonly questions = new QuestionSelectionEngine();

  attune(text: string, input: string): string {
    const context = this.detector.detect(input);
    const question = this.questions.select(context);
    if (context === "reflection") {
      return `${text}\n\nViewed from a broader perspective, that pattern may reflect an ongoing effort to balance expansion with stability.\n\n${question}`;
    }
    if (context === "planning") {
      return `${text}\n\nRecommended next focus: maintain balance between expansion and sustainability.`;
    }
    return `${text}\n\n${question}`;
  }
}