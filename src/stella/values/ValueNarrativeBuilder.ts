// src/stella/values/ValueNarrativeBuilder.ts
import type { ValuePrinciple } from "../../app/stella/contracts/ValuePrinciple";

export class ValueNarrativeBuilder {
  build(values: ValuePrinciple[]): string {
    const active = values.filter((v) => v.status === "active");
    if (active.length === 0) return "The user has not declared any active values.";
    const names = active.map((v) => v.name).join(", ");
    return `The user has declared the values: ${names}. These values appear across multiple themes and identity constructs.`;
  }
}