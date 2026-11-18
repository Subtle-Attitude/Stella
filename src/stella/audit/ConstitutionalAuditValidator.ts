// src/stella/audit/ConstitutionalAuditValidator.ts
import type { ConstitutionalAudit } from "../../app/stella/contracts/ConstitutionalAudit";

export class ConstitutionalAuditValidator {
  validate(audit: ConstitutionalAudit): boolean {
    return Array.isArray(audit.violations) && Array.isArray(audit.warnings) && typeof audit.passed === "boolean";
  }
}