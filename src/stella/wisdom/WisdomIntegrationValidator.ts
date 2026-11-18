// src/stella/wisdom/WisdomIntegrationValidator.ts

import type { WisdomIntegration }
  from "../../app/stella/contracts/WisdomIntegration";

const FORBIDDEN = [
  "ultimate truth",
  "perfect balance",
  "enlightenment",
  "final purpose",
  "one correct path",
  "the answer is",
  "you should",
];

export class WisdomIntegrationValidator {
  validate(
    integration: WisdomIntegration
  ): boolean {
    const text = `
      ${integration.integration}
      ${integration.description}
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
      integration.integration
        .trim()
        .length > 0
    );
  }
}