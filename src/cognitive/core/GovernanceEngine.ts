import type { ReflectionResult, StellaSelf } from "./types";
import type { GovernanceContext } from "../../app/stella/contracts/GovernanceContext";
import {
  GovernanceEngine as ConstitutionalGovernanceEngine,
} from "../../stella/governance/GovernanceEngine";

export type GovernanceResult = {
  decision: "PASS" | "BLOCK";
  reason?: string;
  consentGranted: boolean;
};

export class GovernanceEngine {
  private readonly governance =
    new ConstitutionalGovernanceEngine();

  async evaluate(
    text: string,
    reflection: ReflectionResult,
    self: StellaSelf,
  ): Promise<GovernanceResult> {

    const context: GovernanceContext = {
      operation: "response-generation",
      text,
      reflection,
      self,
    } as GovernanceContext;

    const result =
      await this.governance.evaluate(context);

    return {
      decision: result.approved ? "PASS" : "BLOCK",
      reason:
        result.violations.length > 0
          ? result.violations.join("; ")
          : undefined,
      consentGranted: result.approved,
    };
  }
}