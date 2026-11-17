// src/stella/narrative/NarrativeEvolutionNarrativeBuilder.ts
import type { NarrativeEvolution } from "../../app/stella/contracts/NarrativeEvolution";

export class NarrativeEvolutionNarrativeBuilder {
  build(evolution: NarrativeEvolution): string {
    return `A possible narrative evolution appears to connect ${evolution.sourceTheme} with ${evolution.evolvedTheme}. This evolution is supported by ${evolution.evidence.join(" and ")}.`;
  }
}