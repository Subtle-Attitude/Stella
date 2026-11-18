// src/stella/attunement/ResponsePacingEngine.ts
export class ResponsePacingEngine {
  pace(text: string, context: string): string {
    if (context === "planning" || context === "problem_solving") {
      return text.split("\n\n")[0];
    }
    return text;
  }
}