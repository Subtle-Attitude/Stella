// src/stella/audit/ConstitutionalHealthEngine.ts
import type { ConstitutionalAudit } from "../../app/stella/contracts/ConstitutionalAudit";
import type { ConstitutionalHealth } from "../../app/stella/contracts/ConstitutionalHealth";

export class ConstitutionalHealthEngine {
  summarize(audits: ConstitutionalAudit[]): ConstitutionalHealth {
    const passed = audits.filter((a) => a.passed).length;
    const failed = audits.length - passed;
    return {
      auditsPassed: passed,
      auditsFailed: failed,
      health: failed === 0 ? "healthy" : "needs_review",
    };
  }
}