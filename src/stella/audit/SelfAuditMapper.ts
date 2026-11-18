// src/stella/audit/SelfAuditMapper.ts
import type { MetaReflection } from "../../app/stella/contracts/MetaReflection";
import type { ConstitutionalAudit } from "../../app/stella/contracts/ConstitutionalAudit";

export class SelfAuditMapper {
  map(reflections: MetaReflection[], audits: ConstitutionalAudit[]): { subject: string; passed: boolean }[] {
    return reflections.map((r) => {
      const audit = audits.find((a) => a.subject === r.subject);
      return { subject: r.subject, passed: audit?.passed ?? false };
    });
  }
}