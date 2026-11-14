import { describe, it, expect } from "vitest";
import { ProvenanceEngine } from "../../../../stella/provenance/ProvenanceEngine";
import { hashRecord } from "../../../../stella/provenance/hash";

describe("ProvenanceEngine", () => {
  const engine = new ProvenanceEngine();

  it("rejects ai_interpretation in user_canon", () => {
    const result = engine.validateAndChain({
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
    const result = engine.validateAndChain({
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
});