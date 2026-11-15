import {
  describe,
  it,
  expect,
} from "vitest";

import { ConstitutionalRuntimeAdapter } from "../../../../stella/runtime/ConstitutionalRuntimeAdapter";

describe(
  "ConstitutionalRuntimeAdapter integration",
  () => {
    const adapter =
      new ConstitutionalRuntimeAdapter();

    it(
      "store retrieve respects sovereignty",
      async () => {
        const stored =
          await adapter.storeMemory({
            userId: "u1",
            type: "episodic",
            provenance:
              "user_stated",
            content: "I like coffee",
            metadata: {},
            author: "user",
          });

        const retrieved =
          await adapter.retrieveMemoryForReasoning(
            [stored]
          );

        expect(
          retrieved
        ).toHaveLength(1);

        expect(
          retrieved[0].content
        ).toBe("I like coffee");
      }
    );

    it(
      "challenged memory is excluded from reasoning retrieval",
      async () => {
        const stored =
          await adapter.storeMemory({
            userId: "u1",
            type: "episodic",
            provenance:
              "ai_interpretation",
            content:
              "user prefers mornings",
            metadata: {},
            author: "stella",
          });

        const challenged =
          await adapter.challengeMemory(
            stored
          );

        const retrieved =
          await adapter.retrieveMemoryForReasoning(
            [challenged]
          );

        expect(
          retrieved
        ).toHaveLength(0);
      }
    );

    it(
      "canon promotion remains constitutionally constrained",
      async () => {
        const stored =
          await adapter.storeMemory({
            userId: "u1",
            type: "episodic",
            provenance:
              "ai_interpretation",
            content:
              "user prefers mornings",
            metadata: {},
            author: "stella",
          });

        expect(
          adapter.canPromoteMemoryToCanon(
            stored
          )
        ).toBe(false);
      }
    );
  }
);