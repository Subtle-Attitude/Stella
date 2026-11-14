export interface GovernanceResult {
	readonly approved: boolean;
	readonly violations: string[];
	readonly metadata: Record<string, unknown>;
}
