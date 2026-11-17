// src/stella/polarity/PolarityValidator.ts

import type { Polarity }
  from "../../app/stella/contracts/Polarity";

const FORBIDDEN = [
  "good vs evil",
  "winner vs loser",
  "right vs wrong",
  "healthy vs unhealthy",
];

export class PolarityValidator {
  validate(
    polarity: Polarity
  ): boolean {
    const description =
      polarity.description
        .toLowerCase();

    if (
      FORBIDDEN.some(
        phrase =>
          description.includes(
            phrase
          )
      )
    ) {
      return false;
    }

    return (
      polarity.valueA
        .trim()
        .length > 0 &&
      polarity.valueB
        .trim()
        .length > 0 &&
      polarity.valueA
        .toLowerCase() !==
      polarity.valueB
        .toLowerCase()
    );
  }
}