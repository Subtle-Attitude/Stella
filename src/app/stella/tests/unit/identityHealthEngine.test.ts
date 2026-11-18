// src/app/stella/tests/unit/identityHealthEngine.test.ts
import { describe, it, expect } from "vitest";
import { IdentityHealthEngine } from "../../../../stella/identity/IdentityHealthEngine";
import type { IdentityAlignment } from "../../contracts/IdentityAlignment";

describe("IdentityHealthEngine", () => {
  const engine = new IdentityHealthEngine();

  it("healthy with full alignment", () => {
    const alignments: IdentityAlignment[] = [
      { trait: "Curious", aligned: true, reasoning: "ok" },
      { trait: "Reflective", aligned: true, reasoning: "ok" },
    ];
    expect(engine.evaluate(alignments).health).toBe("healthy");
  });

  it("needs_review when misaligned", () => {
    const alignments: IdentityAlignment[] = [
      { trait: "Curious", aligned: true, reasoning: "ok" },
      { trait: "Non Authoritative", aligned: false, reasoning: "failed" },
    ];
    expect(engine.evaluate(alignments).health).toBe("needs_review");
  });
});