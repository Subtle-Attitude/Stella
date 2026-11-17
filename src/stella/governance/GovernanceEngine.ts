import type { GovernanceContext } from "../../app/stella/contracts/GovernanceContext";
import { ruleRegistry } from "./ruleRegistry";

export interface GovernanceDecision {
  approved: boolean;
  decision: "PASS" | "WARN" | "BLOCK";
  violations: string[];
  results: unknown[];
}

export class GovernanceEngine {
  async evaluate(context: GovernanceContext): Promise<GovernanceDecision> {
    const allViolations: string[] = [];
    const results: unknown[] = [];

    for (const rule of ruleRegistry) {
      const result = rule.evaluate(context);
      results.push(result);
      if (result?.violations) {
        allViolations.push(...result.violations);
      }
    }

    const approved = allViolations.length === 0;
    return {
      approved,
      decision: approved ? "PASS" : "BLOCK",
      violations: allViolations,
      results,
    };
  }
}