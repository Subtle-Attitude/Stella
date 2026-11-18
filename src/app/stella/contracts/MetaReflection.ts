// src/app/stella/contracts/MetaReflection.ts

export interface MetaReflection {
  id: string;

  subject: string;

  confidence:
    | "low"
    | "medium";

  evidenceStrength:
    | "limited"
    | "moderate"
    | "strong";

  reviewStatus:
    | "emerging"
    | "stable";

  explanation: string;

  supportingEvidence: string[];

  status:
    | "active"
    | "archived";

  createdAt: Date;
}
