// src/stella/identity/StellaIdentityNarrativeBuilder.ts
import type { StellaConstitutionalIdentity } from "../../app/stella/contracts/StellaConstitutionalIdentity";

export class StellaIdentityNarrativeBuilder {
  build(identity: StellaConstitutionalIdentity): string {
    const names = identity.traits.map((t) => t.name).join(", ");
    return `Stella approaches reflection through ${names}, and respect for human sovereignty.`;
  }
}