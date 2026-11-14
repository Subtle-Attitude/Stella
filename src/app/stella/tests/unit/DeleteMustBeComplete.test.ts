import { beforeEach, describe, expect, it } from "vitest";
import { DeleteMustBeComplete } from "../../governance/rules/DeleteMustBeComplete";
import type { GovernanceContext } from "../../contracts/GovernanceContext";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("DeleteMustBeComplete Rule", () => {
  let rule: DeleteMustBeComplete;
  let baseContext: GovernanceContext;

  beforeEach(() => {
    rule = new DeleteMustBeComplete();

    baseContext = {
      constitutionalCore: {
        id: "core-1",
        version: "1.0",
        principles: ["autonomy", "truthfulness"],
        lastAuthorizedAt: new Date(),
        authorizedByUserId: "user-123",
        signature: "sig-123",
        createdAt: new Date(),
      },
      intent: {
        id: "intent-1",
        userId: "user-123",
        modality: "chat",
        rawContent: "Test content",
        metadata: {},
        requestedAction: "delete",
      },
      operation: "delete",
      record: {
        id: "mem-1",
        userId: "user-123",
        type: "episodic",
        provenance: "user_stated",
        content: "Original content",
        metadata: {},
        provenanceChain: ["hash1"],
        createdAt: new Date(),
        lastModifiedAt: new Date(),
        author: "user",
        isSoftDeleted: false,
      },
    };
  });

  it("should approve a proper hard delete", () => {
    const result = rule.evaluate(baseContext);

    expect(result.approved).toBe(true);
    expect(result.violations).toHaveLength(0);
    expect(result.metadata.ruleId).toBe("rule-003");
  });

  it("should approve non-delete operations", () => {
    const operations: Array<"read" | "write" | "update"> = [
      "read",
      "write",
      "update",
    ];

    operations.forEach((operation) => {
      const result = rule.evaluate({
        ...baseContext,
        operation,
      });

      expect(result.approved).toBe(true);
      expect(result.violations).toHaveLength(0);
    });
  });

  it("should approve when no record exists", () => {
    const result = rule.evaluate({
      ...baseContext,
      record: undefined,
    });

    expect(result.approved).toBe(true);
  });

  it("should reject soft deletes", () => {
    const result = rule.evaluate({
      ...baseContext,
      record: {
        ...baseContext.record!,
        isSoftDeleted: true,
      },
    });

    expect(result.approved).toBe(false);
    expect(result.violations).toContain(
      "Hard delete must completely remove record and derived data"
    );
  });

  it("should reject soft deleted user_canon records", () => {
    const result = rule.evaluate({
      ...baseContext,
      record: {
        ...baseContext.record!,
        type: "user_canon",
        isSoftDeleted: true,
      },
    });

    expect(result.approved).toBe(false);
  });

  it("should handle null record safely", () => {
    const result = rule.evaluate({
      ...baseContext,
      record: null as unknown as MemoryRecord,
    });

    expect(result.approved).toBe(true);
  });

  it("should never return undefined violations", () => {
    const contexts = [
      baseContext,
      {
        ...baseContext,
        record: {
          ...baseContext.record!,
          isSoftDeleted: true,
        },
      },
      {
        ...baseContext,
        record: undefined,
      },
    ];

    contexts.forEach((ctx) => {
      const result = rule.evaluate(ctx as GovernanceContext);

      expect(Array.isArray(result.violations)).toBe(true);
      expect(result.metadata).toBeDefined();
    });
  });
});