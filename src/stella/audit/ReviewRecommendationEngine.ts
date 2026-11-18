import type {
  ConstitutionalAudit,
} from "../../app/stella/contracts/ConstitutionalAudit";

export class ReviewRecommendationEngine {
  recommend(
    audit: ConstitutionalAudit
  ):
    | "none"
    | "review" {

    if (
      audit.violations.length > 0 ||
      audit.confidenceAlignment ===
      "overstated"
    ) {
      return "review";
    }

    return "none";
  }
}