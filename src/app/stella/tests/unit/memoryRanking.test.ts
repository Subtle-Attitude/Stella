import { describe, it, expect } from "vitest";

import { AuthorityAwareMemoryRankingService }
  from "../../../../stella/memory/AuthorityAwareMemoryRankingService";

import type { MemoryRecord }
  from "../../contracts/MemoryRecord";

describe(
  "AuthorityAwareMemoryRankingService",
  () => {
    const ranking =
      new AuthorityAwareMemoryRankingService();

    const base = (
      overrides: Partial<MemoryRecord> = {}
    ): MemoryRecord => ({
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

    it(
      "scores user_stated semantic higher than ai_interpretation episodic",
      () => {
        const authoritative =
          base({
            type: "semantic",
            provenance: "user_stated",
            author: "user",
          });

        const interpretive =
          base({
            type: "episodic",
            provenance: "ai_interpretation",
          });

        expect(
          ranking.score(authoritative)
        ).toBe(120);

        expect(
          ranking.score(interpretive)
        ).toBe(40);
      }
    );

    it(
      "throws for invalid user_canon plus ai_interpretation",
      () => {
        const invalid =
          base({
            type: "user_canon",
            provenance:
              "ai_interpretation",
          });

        expect(() =>
          ranking.score(invalid)
        ).toThrow(
          /Constitutional violation/
        );
      }
    );

    it(
      "throws for invalid user_canon plus unverified_assumption",
      () => {
        const invalid =
          base({
            type: "user_canon",
            provenance:
              "unverified_assumption",
          });

        expect(() =>
          ranking.score(invalid)
        ).toThrow(
          /Constitutional violation/
        );
      }
    );

    it(
      "ranks higher authority memories first",
      () => {
        const records = [
          base({
            id: "low",
            type: "episodic",
            provenance:
              "ai_interpretation",
          }),

          base({
            id: "medium",
            type: "semantic",
            provenance:
              "observed_pattern",
          }),

          base({
            id: "high",
            type: "semantic",
            provenance:
              "user_stated",
            author: "user",
          }),
        ];

        const ranked =
          ranking.rank(records);

        expect(
          ranked[0].id
        ).toBe("high");

        expect(
          ranked[1].id
        ).toBe("medium");

        expect(
          ranked[2].id
        ).toBe("low");
      }
    );

    it(
      "prefers user_confirmed_pattern over observed_pattern",
      () => {
        const observed =
          base({
            id: "observed",
            type: "semantic",
            provenance:
              "observed_pattern",
          });

        const confirmed =
          base({
            id: "confirmed",
            type: "semantic",
            provenance:
              "user_confirmed_pattern",
            author: "user",
          });

        const ranked =
          ranking.rank([
            observed,
            confirmed,
          ]);

        expect(
          ranked[0].id
        ).toBe("confirmed");
      }
    );
  }
);