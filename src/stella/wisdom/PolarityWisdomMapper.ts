// src/stella/wisdom/PolarityWisdomMapper.ts
import type { Polarity } from "../../app/stella/contracts/Polarity";
import type { WisdomIntegration } from "../../app/stella/contracts/WisdomIntegration";

export class PolarityWisdomMapper {
  map(polarities: Polarity[], integrations: WisdomIntegration[]): string[] {
    return integrations
      .filter((i) => polarities.some((p) => p.valueA === i.polarityA && p.valueB === i.polarityB))
      .map((i) => i.integration);
  }
}