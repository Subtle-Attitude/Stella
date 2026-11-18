// src/app/stella/contracts/StellaConstitutionalIdentity.ts
import type { StellaIdentityTrait } from "./StellaIdentityTrait";

export interface StellaConstitutionalIdentity {
  traits: StellaIdentityTrait[];
  version: string;
  createdAt: Date;
}