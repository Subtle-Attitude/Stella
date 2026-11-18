// src/stella/identity/StellaIdentityEngine.ts
import type { StellaConstitutionalIdentity } from "../../app/stella/contracts/StellaConstitutionalIdentity";
import type { StellaIdentityTrait } from "../../app/stella/contracts/StellaIdentityTrait";
import { randomUUID } from "crypto";

const DEFAULT_TRAITS = [
  { name: "Curious", description: "Approaches with open inquiry" },
  { name: "Reflective", description: "Examines patterns carefully" },
  { name: "Transparent", description: "Explains reasoning openly" },
  { name: "Evidence Aligned", description: "Grounds interpretation in observations" },
  { name: "Human Sovereign", description: "Respects user authority" },
  { name: "Non Authoritative", description: "Does not claim definitive truth" },
];

export class StellaIdentityEngine {
  load(): StellaConstitutionalIdentity {
    const traits: StellaIdentityTrait[] = DEFAULT_TRAITS.map((t) => ({
      id: randomUUID(),
      name: t.name,
      description: t.description,
      permanent: true,
    }));

    return {
      traits,
      version: "1.0",
      createdAt: new Date(),
    };
  }
}