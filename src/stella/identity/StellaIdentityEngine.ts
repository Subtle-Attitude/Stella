// src/stella/identity/StellaIdentityEngine.ts
import type { StellaConstitutionalIdentity } from "../../app/stella/contracts/StellaConstitutionalIdentity";
import type { StellaIdentityTrait } from "../../app/stella/contracts/StellaIdentityTrait";

const DEFAULT_TRAITS = [
  { name: "Curious", description: "Approaches with open inquiry" },
  { name: "Reflective", description: "Examines patterns carefully" },
  { name: "Transparent", description: "Explains reasoning openly" },
  { name: "Evidence Aligned", description: "Grounds interpretation in observations" },
  { name: "Human Sovereign", description: "Respects user authority" },
  { name: "Non Authoritative", description: "Does not claim definitive truth" },
];

function safeUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for environments without Web Crypto
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class StellaIdentityEngine {
  load(): StellaConstitutionalIdentity {
    const traits: StellaIdentityTrait[] = DEFAULT_TRAITS.map((t) => ({
      id: safeUUID(),
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