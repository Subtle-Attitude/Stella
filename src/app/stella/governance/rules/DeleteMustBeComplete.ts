import type { GovernanceContext } from '../../contracts/GovernanceContext';

export interface RuleResult {
  approved: boolean;
  violations: string[];
  metadata: { ruleId: string };
}

export class DeleteMustBeComplete {
  private readonly ruleId = 'rule-003';

  evaluate(context: GovernanceContext): RuleResult {
    const metadata = { ruleId: this.ruleId };

    // Safe defaults for missing context
    if (!context || typeof context !== 'object') {
      return { approved: true, violations: [], metadata };
    }

    const operation = context.operation;
    const record = context.record;

    // Only care about delete operations that have a record
    if (operation !== 'delete' || !record) {
      return { approved: true, violations: [], metadata };
    }

    // Reject soft deletes being treated as complete hard deletes
    if (record.isSoftDeleted === true) {
      return {
        approved: false,
        violations: ['Hard delete must completely remove record and derived data'],
        metadata
      };
    }

    // Proper hard delete (isSoftDeleted false or missing)
    return { approved: true, violations: [], metadata };
  }
}