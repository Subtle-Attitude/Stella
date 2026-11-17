import {
  describe,
  it,
  expect,
} from "vitest";

import {
  IdentityConstructExtractor,
} from "../../../../stella/identity/IdentityConstructExtractor";

describe(
  "IdentityConstructExtractor",
  () => {
    const extractor =
      new IdentityConstructExtractor();

    it(
      "extracts Sun Dancer",
      () => {
        expect(
          extractor.extract(
            "I consider myself a Sun Dancer"
          )[0].name
        ).toBe("Sun Dancer");
      }
    );

    it(
      "extracts Dream Keeper",
      () => {
        expect(
          extractor.extract(
            "I identify as a Dream Keeper"
          )[0].name
        ).toBe("Dream Keeper");
      }
    );

    it(
      "extracts Wayfinder",
      () => {
        expect(
          extractor.extract(
            "I think of myself as a Wayfinder"
          )[0].name
        ).toBe("Wayfinder");
      }
    );

    it(
      "rejects simple mentions",
      () => {
        expect(
          extractor.extract(
            "The Sun Dancer concept is interesting."
          )
        ).toEqual([]);
      }
    );

    it(
      "ignores non identity statements",
      () => {
        expect(
          extractor.extract(
            "I like tea."
          )
        ).toEqual([]);
      }
    );
  }
);