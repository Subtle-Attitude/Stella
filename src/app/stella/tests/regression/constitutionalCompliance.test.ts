declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (actual: any) => {
	toBe: (expected: any) => void;
	toContain: (expected: any) => void;
};

const registryModule = require('../../governance/ruleRegistry') as Record<string, any>;
const governanceRules = (() => {
	if (Array.isArray(registryModule.governanceRules)) {
		return registryModule.governanceRules;
	}

	if (Array.isArray(registryModule.default)) {
		return registryModule.default;
	}

	const rules: any[] = [];
	for (const value of Object.values(registryModule)) {
		if (Array.isArray(value)) {
			rules.push(...value);
		}
	}

	return rules;
})();

describe('Constitutional Compliance Regression', () => {
	it('should register all required governance rules', () => {
		expect(governanceRules.length).toBe(4);
		expect(governanceRules.map((rule: { name: string }) => rule.name)).toContain(
			'InterpretationCannotEnterCanon',
		);
	});
});
