// src/stella/values/IdentityValueMapper.ts
import type { IdentityConstruct } from "../../app/stella/contracts/IdentityConstruct";
import type { ValuePrinciple } from "../../app/stella/contracts/ValuePrinciple";

export class IdentityValueMapper {
  map(construct: IdentityConstruct, values: ValuePrinciple[]): string[] {
    const related = values
      .filter((v) => v.status === "active")
      .filter((v) => v.supportingIdentityConstructs.includes(construct.id) || v.name === "Belonging" || v.name === "Growth")
      .map((v) => v.name);
    return [...new Set(related)];
  }

  describe(constructName: string, valueNames: string[]): string {
    if (valueNames.length === 0) return `The user identifies with the ${constructName} construct.`;
    return `The user identifies with the ${constructName} construct. The values of ${valueNames.join(" and ")} appear alongside this construct.`;
  }
}