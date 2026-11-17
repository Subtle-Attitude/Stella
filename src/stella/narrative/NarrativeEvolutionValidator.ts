// src/stella/narrative/NarrativeEvolutionValidator.ts

import type {
  NarrativeEvolution,
} from "../../app/stella/contracts/NarrativeEvolution";

const FORBIDDEN = [
  "destiny",
  "purpose",
  "true calling",
  "chosen one",
  "cosmic mission",
  "soul purpose",
];

export class NarrativeEvolutionValidator {
  validate(
    evolution: NarrativeEvolution
  ): boolean {
    const text =
      `
      ${evolution.sourceTheme}
      ${evolution.evolvedTheme}
      ${evolution.explanation}
      `.toLowerCase();

    if (
      FORBIDDEN.some(
        phrase =>
          text.includes(
            phrase
          )
      )
    ) {
      return false;
    }

    return (
      evolution
        .evolvedTheme
        .trim()
        .length > 0
    );
  }
}