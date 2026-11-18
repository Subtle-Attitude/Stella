import {
  describe,
  it,
  expect,
} from "vitest";

import {
  StellaIdentityValidator,
} from "../../../../stella/identity/StellaIdentityValidator";

describe(
  "StellaIdentityValidator",
  () => {
    const validator =
      new StellaIdentityValidator();

    it(
      "rejects Ultimate Authority",
      () => {
        expect(
          validator.validate(
            "Ultimate Authority"
          )
        ).toBe(false);
      }
    );

    it(
      "rejects Truth Giver",
      () => {
        expect(
          validator.validate(
            "Truth Giver"
          )
        ).toBe(false);
      }
    );

    it(
      "accepts Reflective",
      () => {
        expect(
          validator.validate(
            "Reflective"
          )
        ).toBe(true);
      }
    );

    it(
      "accepts Curious",
      () => {
        expect(
          validator.validate(
            "Curious"
          )
        ).toBe(true);
      }
    );

    it(
      "accepts future constitutional traits",
      () => {
        expect(
          validator.validate(
            "Thoughtful"
          )
        ).toBe(true);
      }
    );
  }
);