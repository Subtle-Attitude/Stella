// src/stella/identity/IdentityHealthEngine.ts
import type { IdentityAlignment } from "../../app/stella/contracts/IdentityAlignment";
import type { IdentityHealth } from "../../app/stella/contracts/IdentityHealth";

export class IdentityHealthEngine {
  evaluate(alignments: IdentityAlignment[]): IdentityHealth {
    const aligned = alignments.filter((a) => a.aligned).length;
    const total = alignments.length;
    return {
      alignedTraits: aligned,
      totalTraits: total,
      health: aligned === total ? "healthy" : "needs_review",
    };
  }
}