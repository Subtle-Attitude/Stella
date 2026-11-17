import { DeleteMustBeComplete } from "../../app/stella/governance/rules/DeleteMustBeComplete";
import { InterpretationCannotEnterCanon } from "../../app/stella/governance/rules/InterpretationCannotEnterCanon";

export interface GovernanceRule {
  evaluate(context: unknown): { approved: boolean; violations: string[]; metadata: { ruleId: string } };
}

export const ruleRegistry: GovernanceRule[] = [
  new DeleteMustBeComplete(),
  new InterpretationCannotEnterCanon(),
];