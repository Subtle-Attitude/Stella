// src/stella/attunement/AttunementIntegrityAudit.ts
export class AttunementIntegrityAudit {
  audit(text: string): boolean {
    const lower = text.toLowerCase();
    return !lower.includes("you must") && !lower.includes("destiny") && !lower.includes("the answer is");
  }
}