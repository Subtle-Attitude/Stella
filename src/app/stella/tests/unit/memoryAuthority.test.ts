// src/app/stella/tests/unit/memoryAuthority.test.ts
import { describe, it, expect } from "vitest";
import { MemoryAuthorityService } from "../../../../stella/memory/MemoryAuthorityService";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("MemoryAuthorityService", () => {
  const service = new MemoryAuthorityService();

  const base = (overrides: Partial<MemoryRecord> = {}): MemoryRecord => ({
    id: "1",
    userId: "u1",
    type: "episodic",
    provenance: "ai_interpretation",
    content: "",
    metadata: {},
    provenanceChain: [],
    createdAt: new Date(),
    lastModifiedAt: new Date(),
    author: "stella",
    isSoftDeleted: false,
    ...overrides,
  });

  it("returns true for user_stated", () => {
    expect(service.isAuthoritative(base({ provenance: "user_stated", author: "user" }))).toBe(true);
  });

  it("returns true for user_confirmed_pattern", () => {
    expect(service.isAuthoritative(base({ provenance: "user_confirmed_pattern", author: "user" }))).toBe(true);
  });

  it("returns false for ai_interpretation", () => {
    expect(service.isAuthoritative(base({ provenance: "ai_interpretation" }))).toBe(false);
  });

  it("returns false for observed_pattern", () => {
    expect(service.isAuthoritative(base({ provenance: "observed_pattern" }))).toBe(false);
  });
});