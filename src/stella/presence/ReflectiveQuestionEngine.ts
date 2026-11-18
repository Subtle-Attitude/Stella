// src/stella/presence/ReflectiveQuestionEngine.ts
export class ReflectiveQuestionEngine {
  private readonly prompts = [
    "What aspect of this feels most important? Which interpretation feels best supported? Is there another way to view this?"
  ];

  public getPrompt(): string {
    return this.prompts[0];
  }
}