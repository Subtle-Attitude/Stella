import type { InitiativeLevel } from "./InitiativeLevel";

export interface InitiativeDecision {
  level: InitiativeLevel;
  trigger: string;
  explanation: string;
}