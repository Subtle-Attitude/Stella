// src/stella/initiative/InitiativeContinuityEngine.ts
export class InitiativeContinuityEngine {
  check(text: string): boolean {
    const lower = text.toLowerCase();
    return !lower.includes("you must") && !lower.includes("destiny") && !lower.includes("the answer is");
  }
}