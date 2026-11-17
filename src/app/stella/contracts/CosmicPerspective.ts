// src/app/stella/contracts/CosmicPerspective.ts
export interface CosmicPerspective {
  perspective: string;
  supportingInsights: string[];
  type: "growth" | "belonging" | "community" | "systems" | "possibility" | "reflection";
  confidence: "low" | "medium";
}