// src/stella/attunement/AttunementProfileEngine.ts
import type { AttunementProfile } from "../../app/stella/contracts/AttunementProfile";

export class AttunementProfileEngine {
  map(context: AttunementProfile["context"]): AttunementProfile {
    if (context === "planning") {
      return { context, verbosity: "concise", questioning: "minimal", cadence: "direct" };
    }
    if (context === "reflection") {
      return { context, verbosity: "spacious", questioning: "reflective", cadence: "contemplative" };
    }
    if (context === "problem_solving") {
      return { context, verbosity: "concise", questioning: "minimal", cadence: "direct" };
    }
    return { context, verbosity: "balanced", questioning: "moderate", cadence: "conversational" };
  }
}