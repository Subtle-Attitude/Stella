// src/stella/polarity/BalanceReflectionEngine.ts
import type { Polarity } from "../../app/stella/contracts/Polarity";

export class BalanceReflectionEngine {
  reflect(polarity: Polarity): string {
    return `How might ${polarity.valueA.toLowerCase()} and ${polarity.valueB.toLowerCase()} both be honored in this situation?`;
  }
}