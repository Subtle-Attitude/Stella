// src/app/stella/tests/unit/situationExtractor.test.ts

import { describe, it, expect } from "vitest";

import { SituationExtractor }
  from "../../../../stella/situations/SituationExtractor";

describe(
  "SituationExtractor",
  () => {
    const extractor =
      new SituationExtractor();

    it(
      "extracts childcare transition",
      () => {
        expect(
          extractor.extract(
            "I'm trying to find childcare so I can focus on building my company."
          )
        ).toContain(
          "childcare transition"
        );
      }
    );

    it(
      "extracts school transition",
      () => {
        expect(
          extractor.extract(
            "My daughter is preparing for kindergarten."
          )
        ).toContain(
          "school transition"
        );
      }
    );

    it(
      "extracts career transition",
      () => {
        expect(
          extractor.extract(
            "I'm trying to leave my corporate job."
          )
        ).toContain(
          "career transition"
        );
      }
    );

    it(
      "extracts business growth effort",
      () => {
        expect(
          extractor.extract(
            "I'm building Atlas and figuring out funding."
          )
        ).toContain(
          "business growth effort"
        );
      }
    );

    it(
      "deduplicates extracted situations",
      () => {
        const result =
          extractor.extract(
            "I need childcare and daycare support."
          );

        expect(
          result
        ).toEqual([
          "childcare transition",
        ]);
      }
    );

    it(
      "returns empty array when no situation exists",
      () => {
        expect(
          extractor.extract(
            "I like coffee."
          )
        ).toEqual([]);
      }
    );
  }
);