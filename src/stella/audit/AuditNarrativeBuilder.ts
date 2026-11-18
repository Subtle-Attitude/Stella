// src/stella/audit/AuditNarrativeBuilder.ts
import type { ConstitutionalAudit } from "../../app/stella/contracts/ConstitutionalAudit";

export class AuditNarrativeBuilder {
  build(audit: ConstitutionalAudit): string {
    if (audit.passed) {
      return "The interpretation remains constitutionally aligned. No evidence-confidence mismatch was detected.";
    }
    if (audit.confidenceAlignment === "overstated") {
      return "The interpretation may warrant review because confidence exceeds available supporting evidence.";
    }
    return "The interpretation may warrant review due to constitutional concerns.";
  }
}