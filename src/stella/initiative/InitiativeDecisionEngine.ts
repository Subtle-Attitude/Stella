import type { InitiativeDecision }
  from "../../app/stella/contracts/InitiativeDecision";

import { InitiativeDetectionEngine }
  from "./InitiativeDetectionEngine";

import { ReflectionOpportunityEngine }
  from "./ReflectionOpportunityEngine";

export class InitiativeDecisionEngine {
  private readonly detector =
    new InitiativeDetectionEngine();

  private readonly opportunities =
    new ReflectionOpportunityEngine();

  decide(
    text: string
  ): InitiativeDecision {
    const level =
      this.detector.detect(text);

    const opportunity =
      this.opportunities.identify(
        text
      );

    return {
      level,
      trigger:
        opportunity
          ?.toLowerCase()
          .replaceAll(
            " ",
            "_"
          ) ?? "none",
      explanation:
        opportunity
          ? `${opportunity} detected.`
          : "No initiative warranted.",
    };
  }
}