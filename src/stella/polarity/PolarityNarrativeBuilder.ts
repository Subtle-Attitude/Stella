// src/stella/polarity/PolarityNarrativeBuilder.ts
import type { Polarity } from "../../app/stella/contracts/Polarity";

export class PolarityNarrativeBuilder {
  build(polarity: Polarity): string {
    return `A recurring polarity may exist between ${polarity.valueA} and ${polarity.valueB}. Both values appear repeatedly across memories and life themes, suggesting a dynamic balance rather than a contradiction.`;
  }
}