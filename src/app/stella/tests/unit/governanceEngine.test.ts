import { describe, it, expect } from "vitest";
import { GovernanceEngine } from "../../../../stella/governance/GovernanceEngine";
import type { GovernanceContext } from "../../contracts/GovernanceContext";

describe("GovernanceEngine", () => {
  // Cast past the 3 required constructor args for this unit test
  const engine = new (GovernanceEngine as any)();

  it("blocks soft-delete treated as complete", async () => {
    const context: GovernanceContext = {
      operation: "delete",
      record: {
        id: "1",
        userId: "u1",
        type: "episodic",
        provenance: "user_stated",
        content: "x",
        metadata: {},
        provenanceChain: [],
        createdAt: new Date(),
        lastModifiedAt: new Date(),
        author: "user",
        isSoftDeleted: true,
      },
    };
    const decision = await engine.evaluate(context);
    expect(decision.approved).toBe(false);
    expect(decision.decision).toBe("BLOCK");
  });

  it("passes a clean hard-delete context", async () => {
    const context: GovernanceContext = {
      operation: "delete",
      record: {
        id: "1",
        userId: "u1",
        type: "episodic",
        provenance: "user_stated",
        content: "x",
        metadata: {},
        provenanceChain: [],
        createdAt: new Date(),
        lastModifiedAt: new Date(),
        author: "user",
        isSoftDeleted: false,
      },
    };
    const decision = await engine.evaluate(context);
    expect(decision.approved).toBe(true);
    expect(decision.decision).toBe("PASS");
  });
});