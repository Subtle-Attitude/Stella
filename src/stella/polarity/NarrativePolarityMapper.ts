// src/stella/polarity/NarrativePolarityMapper.ts
import type { Polarity } from "../../app/stella/contracts/Polarity";

export class NarrativePolarityMapper {
  map(values: string[], polarities: Polarity[]): string[] {
    return polarities
      .filter((p) => values.includes(p.valueA) || values.includes(p.valueB))
      .map((p) => `${p.valueA} ↔ ${p.valueB}`);
  }
}