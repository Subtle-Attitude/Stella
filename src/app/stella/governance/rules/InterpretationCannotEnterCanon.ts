import type { GovernanceContext } from '../../contracts/GovernanceContext';

export interface RuleResult {
  approved: boolean;
  violations: string[];
  metadata: { ruleId: string };
}

export class InterpretationCannotEnterCanon {
  private readonly ruleId = 'rule-004';

  evaluate(context: GovernanceContext): RuleResult {
    const metadata = { ruleId: this.ruleId };

    if (!context || typeof context !== 'object') {
      return { approved: true, violations: [], metadata };
    }

    const record = context.record;
    const targetType = (context as GovernanceContext & { targetType?: string }).targetType;

    // Only enforce when the target is user_canon and a record is present
    if (targetType !== 'user_canon' || !record) {
      return { approved: true, violations: [], metadata };
    }

    // Block AI interpretations from entering user_canon
    if (record.provenance === 'ai_interpretation') {
      return {
        approved: false,
        violations: ['AI interpretations are prohibited from entering user_canon'],
        metadata
      };
    }

    // Allow user-stated and other non-AI provenance
    return { approved: true, violations: [], metadata };
  }
}