// src/stella/presence/PresenceExpressionEngine.ts
import { VoiceCadenceEngine } from "./VoiceCadenceEngine";
import { CosmicPerspectiveEngineV2 } from "./CosmicPerspectiveEngineV2";

export class PresenceExpressionEngine {
  private readonly cadence = new VoiceCadenceEngine();
  private readonly cosmic = new CosmicPerspectiveEngineV2();

  express(text: string): string {
    const withCadence = this.cadence.apply(text);
    return this.cosmic.apply(withCadence);
  }
}