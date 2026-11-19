// src/stella/initiative/InitiativeExecutionEngine.ts

import type { InitiativeLevel } from "../../app/stella/contracts/InitiativeLevel";

import { InitiativeDetectionEngine } from "./InitiativeDetectionEngine";
import { PatternSurfacingEngine } from "./PatternSurfacingEngine";
import { ReflectionInvitationEngine } from "./ReflectionInvitationEngine";

export class InitiativeExecutionEngine {
  private readonly detector: {
    detect(input: string): InitiativeLevel;
  };

  private readonly surfacer = new PatternSurfacingEngine();
  private readonly inviter = new ReflectionInvitationEngine();

  constructor(
    detector: { detect(input: string): InitiativeLevel } =
      new InitiativeDetectionEngine()
  ) {
    this.detector = detector;
  }

  execute(input: string, baseResponse: string): string {
    const level = this.detector.detect(input);

    switch (level) {
      case "silent":
        return baseResponse;

      case "minimal":
        return `${baseResponse}

Would you like to inspect the next step?`;

      case "reflective": {
        const surface = this.surfacer.surface(input);
        const invite =
          this.inviter.invite("recurring_pattern");

        return `${baseResponse}

${surface}

${invite}`;
      }

      default:
        return baseResponse;
    }
  }
}