// src/app/stella/contracts/RuntimeResponse.ts
import type { InitiativeLevel } from "./InitiativeLevel";

export interface RuntimeResponse {
  response: string;
  initiativeLevel: InitiativeLevel;
}