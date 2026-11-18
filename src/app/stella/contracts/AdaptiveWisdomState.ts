export interface AdaptiveWisdomState {
  subject: string;

  previousConfidence:
    | "low"
    | "medium";

  currentConfidence:
    | "low"
    | "medium";

  change:
    | "increased"
    | "decreased"
    | "unchanged";
}