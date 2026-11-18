// src/stella/identity/IdentityGovernanceMapper.ts
import type { StellaConstitutionalIdentity } from "../../app/stella/contracts/StellaConstitutionalIdentity";
import type { ConstitutionalAudit } from "../../app/stella/contracts/ConstitutionalAudit";

export class IdentityGovernanceMapper {
  map(identity: StellaConstitutionalIdentity, audits: ConstitutionalAudit[]): { trait: string; audited: boolean }[] {
    return identity.traits.map((t) => ({
      trait: t.name,
      audited: audits.length > 0,
    }));
  }
}