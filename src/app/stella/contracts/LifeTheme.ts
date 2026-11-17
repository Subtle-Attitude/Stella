// src/app/stella/contracts/LifeTheme.ts
export interface LifeTheme {
  id: string;
  name: string;
  description: string;
  source: "user_declared" | "user_confirmed" | "observed_pattern";
  supportingValues: string[];
  supportingIdentityConstructs: string[];
  supportingThemes: string[];
  supportingMemoryIds: string[];
  createdAt: Date;
}