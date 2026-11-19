// src/stella/initiative/ReflectionOpportunityEngine.ts
export class ReflectionOpportunityEngine {
  identify(text: string): string | null {
    const lower = text.toLowerCase();
    if (lower.includes("same") || lower.includes("keep") || lower.includes("recurring") || lower.includes("pattern")) {
      return "Recurring Pattern";
    }
    if (lower.includes("conflicting") || lower.includes("tension") || lower.includes("balance")) {
      return "Polarity Opportunity";
    }
    return null;
  }
}