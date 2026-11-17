// src/stella/values/ValuePrincipleValidator.ts
import type { ValuePrinciple } from "../../app/stella/contracts/ValuePrinciple";

const IDENTITY_LABELS = new Set(["sun dancer", "dream keeper", "wayfinder"]);

export class ValuePrincipleValidator {
  validate(principle: ValuePrinciple, existing: ValuePrinciple[] = []): boolean {
    if (!principle.name.trim()) return false;
    if (IDENTITY_LABELS.has(principle.name.toLowerCase())) return false;
    if (principle.source === "observed_pattern") return false; // AI cannot declare
    const duplicate = existing.find(
      (p) => p.name.toLowerCase() === principle.name.toLowerCase() && p.status === "active" && p.id !== principle.id
    );
    return !duplicate;
  }
}