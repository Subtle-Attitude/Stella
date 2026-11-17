// src/stella/lifethemes/IdentityLifeThemeMapper.ts
import type { IdentityConstruct } from "../../app/stella/contracts/IdentityConstruct";
import type { ValuePrinciple } from "../../app/stella/contracts/ValuePrinciple";
import type { LifeTheme } from "../../app/stella/contracts/LifeTheme";

export class IdentityLifeThemeMapper {
  map(construct: IdentityConstruct, values: ValuePrinciple[], themes: LifeTheme[]): string[] {
    return themes
      .filter((t) => t.supportingIdentityConstructs.includes(construct.id) || t.supportingValues.some((v) => values.some((val) => val.name === v)))
      .map((t) => t.name);
  }
}