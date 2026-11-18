// src/stella/meta/MetaReflectionValidator.ts

import type {
  MetaReflection,
} from "../../app/stella/contracts/MetaReflection";

const FORBIDDEN = [
  "proven",
  "confirmed",
  "absolute",
  "certain",
  "guaranteed",
  "is true",
  "is correct",
];

export class MetaReflectionValidator {
  validate(
    reflection: MetaReflection
  ): boolean {
    const text =
      reflection.explanation
        .toLowerCase();

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
      reflection
        .explanation
        .trim()
        .length > 0
    );
  }
}