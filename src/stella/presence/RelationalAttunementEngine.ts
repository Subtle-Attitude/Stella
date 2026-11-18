// src/stella/presence/RelationalAttunementEngine.ts
export class RelationalAttunementEngine {
  attune(text: string, context: "planning" | "reflection" | "problem"): string {
    if (context === "planning") return text.split("\n")[0];
    if (context === "reflection") return text;
    return text;
  }
}