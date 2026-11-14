// src/app/stella/tests/unit/provenance.test.ts
import { describe, it, expect } from "vitest";
import { ProvenanceEngine } from "../../../../stella/provenance/ProvenanceEngine";
import { hashRecord } from "../../../../stella/provenance/hash";

describe("ProvenanceEngine", () => {
  const engine = new ProvenanceEngine();

  it("rejects ai_interpretation in user_canon", () => {
    const result = engine.validateTransition({
      id: "1",
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
    });
    expect(result.valid).toBe(false);
    expect(result.violations[0]).toContain("AI interpretations are prohibited");
  });

  it("accepts user_stated in user_canon and produces a hash", () => {
    const result = engine.validateTransition({
      id: "1",
      userId: "u1",
      type: "user_canon",
      provenance: "user_stated",
      content: "I like coffee",
      metadata: {},
      provenanceChain: [],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "user",
      isSoftDeleted: false,
    });
    expect(result.valid).toBe(true);
    expect(result.newHash).toBe(hashRecord("I like coffee", null));
  });

  it("appends hash to chain", () => {
    const record = {
      id: "1",
      userId: "u1",
      type: "episodic" as const,
      provenance: "user_stated" as const,
      content: "hello",
      metadata: {},
      provenanceChain: ["abc"],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "user" as const,
      isSoftDeleted: false,
    };
    const updated = engine.appendToChain(record, "def");
    expect(updated.provenanceChain).toEqual(["abc", "def"]);
  });

  it("verifies a valid chain", () => {
    const content = "hello";
    const h1 = hashRecord(content, null);
    const h2 = hashRecord(content, h1);
    const record = {
      id: "1",
      userId: "u1",
      type: "episodic" as const,
      provenance: "user_stated" as const,
      content,
      metadata: {},
      provenanceChain: [h1, h2],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "user" as const,
      isSoftDeleted: false,
    };
    expect(engine.verifyChainIntegrity(record)).toBe(true);
  });

  it("detects a broken chain", () => {
    const record = {
      id: "1",
      userId: "u1",
      type: "episodic" as const,
      provenance: "user_stated" as const,
      content: "hello",
      metadata: {},
      provenanceChain: ["badhash"],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "user" as const,
      isSoftDeleted: false,
    };
    expect(engine.verifyChainIntegrity(record)).toBe(false);
  });
});