// src/stella/initiative/InitiativeRestraintEngine.ts
export class InitiativeRestraintEngine {
  shouldRestrain(text: string): boolean {
    const lower = text.toLowerCase();
    return lower.includes("just summarize") || lower.includes("just answer") || lower.includes("be brief");
  }
}