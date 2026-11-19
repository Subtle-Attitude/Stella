// src/stella/initiative/InitiativeIntegrityAudit.ts
export class InitiativeIntegrityAudit {
  audit(text: string): boolean {
    const lower = text.toLowerCase();
    return !lower.includes("you must") && !lower.includes("destiny") && !lower.includes("clearly");
  }
}