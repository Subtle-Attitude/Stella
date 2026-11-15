import { describe, it, expect } from "vitest";

import { MemoryReflectionEngine }
  from "../../../../stella/reflection/MemoryReflectionEngine";

import type { MemoryRecord }
  from "../../contracts/MemoryRecord";

describe(
  "MemoryReflectionEngine",
  () => {
    const engine =
      new MemoryReflectionEngine();

    const base = (
      id: string,
      content: string
    ): MemoryRecord => ({
      id,
      userId: "u1",
      type: "episodic",
      provenance: "user_stated",
      content,
      metadata: {},
      provenanceChain: [],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      author: "user",
      isSoftDeleted: false,
    });

    it(
      "produces reflection context with source ids",
      () => {
        const memories = [
          base(
            "m1",
            "journaling practice"
          ),
          base(
            "m2",
            "reflection ritual"
          ),
        ];

        const context =
          engine.reflect(memories);

        expect(
          context.themes
        ).toContain(
          "creative self-reflection"
        );

        expect(
          context.supportingMemoryIds
        ).toEqual([
          "m1",
          "m2",
        ]);
      }
    );

    it(
      "returns empty reflection context for empty input",
      () => {
        const context =
          engine.reflect([]);

        expect(
          context.themes
        ).toEqual([]);

        expect(
          context.supportingMemoryIds
        ).toEqual([]);
      }
    );

    it(
      "deduplicates supporting ids",
      () => {
        const memories = [
          base(
            "m1",
            "journaling practice"
          ),
          base(
            "m1",
            "journaling practice"
          ),
        ];

        const context =
          engine.reflect(memories);

        expect(
          context.supportingMemoryIds
        ).toEqual(["m1"]);
      }
    );
  }
);