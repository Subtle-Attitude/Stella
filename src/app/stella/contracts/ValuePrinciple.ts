// src/app/stella/contracts/ValuePrinciple.ts
export interface ValuePrinciple {
  id: string;
  name: string;
  description: string;
  source: "user_declared" | "user_confirmed" | "observed_pattern";
  status: "active" | "archived";
  supportingMemoryIds: string[];
  supportingThemes: string[];
  supportingIdentityConstructs: string[];
  createdAt: Date;
}