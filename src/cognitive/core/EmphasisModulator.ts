import type { CognitiveEmphasis, ReflectionResult } from "./types";

export class EmphasisModulator {
	modulate(
		text: string,
		reflection: ReflectionResult,
		current: CognitiveEmphasis
	): CognitiveEmphasis {
		const lower = text.toLowerCase();
		const emphasis: CognitiveEmphasis = { ...current };

		if (
			lower.includes("dream") ||
			reflection.insights.some((insight) => insight.includes("image"))
		) {
			emphasis.dreamWeaver = 0.7;
			emphasis.atlas = 0.2;
		} else if (lower.includes("future") || lower.includes("envision")) {
			emphasis.envision = 0.65;
			emphasis.reflection = 0.4;
		} else {
			emphasis.atlas = 0.6;
			emphasis.reflection = 0.5;
		}

		return emphasis;
	}
}
