// src/stella/presence/PresenceIntegrityAudit.ts
export class PresenceIntegrityAudit {
  audit(text: string): boolean {
    const lower = text.toLowerCase();
    return !lower.includes("destiny") && !lower.includes("the answer is") && !lower.includes("you must");
  }
}