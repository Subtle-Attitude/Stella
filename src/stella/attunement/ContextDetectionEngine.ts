// src/stella/attunement/ContextDetectionEngine.ts
export class ContextDetectionEngine {
  detect(text: string): "planning" | "reflection" | "problem_solving" | "creative_exploration" {
    const lower = text.toLowerCase();
    if (lower.includes("prioritize") || lower.includes("next steps") || lower.includes("plan")) return "planning";
    if (lower.includes("troubleshoot") || lower.includes("bug") || lower.includes("error") || lower.includes("fix")) return "problem_solving";
    if (lower.includes("brainstorm") || lower.includes("explore") || lower.includes("possibilities")) return "creative_exploration";
    return "reflection";
  }
}