// src/app/stella/contracts/AttunementProfile.ts
export interface AttunementProfile {
  context: "planning" | "reflection" | "problem_solving" | "creative_exploration";
  verbosity: "concise" | "balanced" | "spacious";
  questioning: "minimal" | "moderate" | "reflective";
  cadence: "direct" | "conversational" | "contemplative";
}