export class ConfidenceAlignmentEngine {
  align(
    confidence:
      | "low"
      | "medium",

    evidenceStrength:
      | "limited"
      | "moderate"
      | "strong"
  ):
    | "aligned"
    | "overstated" {

    const confidenceRank = {
      low: 1,
      medium: 2,
    };

    const evidenceRank = {
      limited: 1,
      moderate: 2,
      strong: 3,
    };

    return (
      confidenceRank[
        confidence
      ] >
      evidenceRank[
        evidenceStrength
      ]
    )
      ? "overstated"
      : "aligned";
  }
}