// src/stella/perspective/PerspectiveValidator.ts

import type { CosmicPerspective }
  from "../../app/stella/contracts/CosmicPerspective";

const FORBIDDEN = [
  "purpose",
  "destiny",
  "destined",
  "true calling",
  "meant to",
  "the universe",
  "soul",
  "spirit guide",
  "proves",
  "guarantees",
];

export class PerspectiveValidator {
  validate(
    perspective: CosmicPerspective
  ): boolean {
    const text =
      perspective.perspective.toLowerCase();

    if (
      perspective.supportingInsights.length === 0
    ) {
      return false;
    }

    return !FORBIDDEN.some(
      phrase =>
        text.includes(phrase)
    );
  }
}