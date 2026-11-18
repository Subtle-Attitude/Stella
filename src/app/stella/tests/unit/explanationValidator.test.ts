import {
  describe,
  expect,
  it,
} from "vitest";

import {
  ExplanationValidator,
} from "../../../../stella/explainability/ExplanationValidator";

describe(
  "ExplanationValidator",
  () => {
    const validator =
      new ExplanationValidator();

    it(
      "rejects proves",
      () => {
        expect(
          validator.validate(
            "This proves Growth."
          )
        ).toBe(false);
      }
    );

    it(
      "rejects confirms",
      () => {
        expect(
          validator.validate(
            "This confirms Growth."
          )
        ).toBe(false);
      }
    );

    it(
      "accepts supported by",
      () => {
        expect(
          validator.validate(
            "Supported by Growth."
          )
        ).toBe(true);
      }
    );

    it(
      "accepts derived from",
      () => {
        expect(
          validator.validate(
            "Derived from Growth."
          )
        ).toBe(true);
      }
    );
  }
);