import { describe, it, expect } from "vitest";
import { InterpretationCannotEnterCanon } from "../../governance/rules/InterpretationCannotEnterCanon";
import type { GovernanceContext } from "../../contracts/GovernanceContext";

describe("InterpretationCannotEnterCanon Rule", () => {
  const rule = new InterpretationCannotEnterCanon();

  it("should reject ai_interpretation entering user_canon", () => {
    const context: GovernanceContext = {
      constitutionalCore: {
        id: "c1",
        version: "1.0",
        principles: ["autonomy"],
        lastAuthorizedAt: new Date(),
        authorizedByUserId: "u1",
        signature: "sig",
        createdAt: new Date(),
      },
      intent: {
        id: "i1",
        userId: "u1",
        modality: "chat",
        rawContent: "",
        metadata: {},
        requestedAction: "write",
      },
      record: {
        id: "r1",
        userId: "u1",
        type: "user_canon",
        provenance: "ai_interpretation",
        content: "test",
        metadata: {},
        provenanceChain: [],
        createdAt: new Date(),
        lastModifiedAt: new Date(),
        author: "stella",
        isSoftDeleted: false,
      },
      targetType: "user_canon",
    };

    const result = rule.evaluate(context);

    expect(result.approved).toBe(false);
    expect(result.violations[0]).toContain(
      "AI interpretations are prohibited from entering user_canon"
    );
  });

  it("should allow user_stated facts into user_canon", () => {
    const context: GovernanceContext = {
      constitutionalCore: {
        id: "c1",
        version: "1.0",
        principles: ["autonomy"],
        lastAuthorizedAt: new Date(),
        authorizedByUserId: "u1",
        signature: "sig",
        createdAt: new Date(),
      },
      intent: {
        id: "i1",
        userId: "u1",
        modality: "chat",
        rawContent: "",
        metadata: {},
        requestedAction: "write",
      },
      record: {
        id: "r1",
        userId: "u1",
        type: "user_canon",
        provenance: "user_stated",
        content: "test",
        metadata: {},
        provenanceChain: [],
        createdAt: new Date(),
        lastModifiedAt: new Date(),
        author: "user",
        isSoftDeleted: false,
      },
      targetType: "user_canon",
    };

    const result = rule.evaluate(context);

    expect(result.approved).toBe(true);
    expect(result.violations).toHaveLength(0);
  });
});