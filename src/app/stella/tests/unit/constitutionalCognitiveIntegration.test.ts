import { describe, it, expect } from "vitest";

import { ConstitutionalMemoryCoordinator }
  from "../../../../cognitive/integration/ConstitutionalMemoryCoordinator";

import type { MemoryRecord }
  from "../../contracts/MemoryRecord";

describe(
  "ConstitutionalMemoryCoordinator",
  () => {
    const coordinator =
      new ConstitutionalMemoryCoordinator();

    const base = (
      overrides: Partial<MemoryRecord> = {}
    ): MemoryRecord => ({
      id: "m1",
      userId: "u1",
      type: "episodic",
      provenance: "ai_interpretation",
      content: "test",
      metadata: {},
      provenanceChain: [],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "stella",
      isSoftDeleted: false,
      ...overrides,
    });

    it(
      "retrieve returns array",
      async () => {
        const result =
          await coordinator.retrieve(
            "session"
          );

        expect(
          Array.isArray(result)
        ).toBe(true);
      }
    );

    it(
      "challenge routes through sovereignty",
      async () => {
        const record =
          base();

        const result =
          await coordinator.challenge(
            record
          );

        expect(
          result.metadata.challenged
        ).toBe(true);
      }
    );

    it(
      "correct preserves provenance and appends lineage",
      async () => {
        const record =
          base({
            provenance:
              "user_stated",
            author: "user",
            content: "old",
          });

        const result =
          await coordinator.correct(
            record,
            "new"
          );

        expect(
          result.content
        ).toBe("new");

        expect(
          result.provenance
        ).toBe("user_stated");

        expect(
          result.provenanceChain.length
        ).toBeGreaterThan(
          record.provenanceChain.length
        );
      }
    );
  }
);