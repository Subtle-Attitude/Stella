// src/stella/lifethemes/LifeThemeNarrativeBuilder.ts
import type { LifeTheme } from "../../app/stella/contracts/LifeTheme";

export class LifeThemeNarrativeBuilder {
  build(theme: LifeTheme): string {
    const values = theme.supportingValues.join(" and ");
    const constructs = theme.supportingIdentityConstructs.join(" and ");
    return `A recurring narrative pattern may be interpreted as ${theme.name}. This theme appears alongside the values of ${values} and the identity construct ${constructs}.`;
  }
}