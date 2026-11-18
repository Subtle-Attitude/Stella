export interface ConstitutionalAudit {
  id: string;

  subject: string;

  passed: boolean;

  violations: string[];

  warnings: string[];

  confidenceAlignment:
    | "aligned"
    | "overstated";

  reviewRecommendation:
    | "none"
    | "review";

  status:
    | "active"
    | "archived";

  createdAt: Date;
}