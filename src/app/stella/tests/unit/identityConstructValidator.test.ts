import { describe, it, expect } from "vitest";

import { IdentityConstructValidator }
  from "../../../../stella/identity/IdentityConstructValidator";

import type { IdentityConstruct }
  from "../../contracts/IdentityConstruct";

describe(
  "IdentityConstructValidator",
  () => {
    const validator =
      new IdentityConstructValidator();

    const construct = (
      overrides: Partial<IdentityConstruct> = {}
    ): IdentityConstruct => ({
      id: "c1",
      name: "Sun Dancer",
      description:
        "embodied earthling",
      declaredBy: "user",
      status: "active",
      supportingMemoryIds: [],
      createdAt: new Date(),
      ...overrides,
    });

    it(
      "accepts user declared identity",
      () => {
        expect(
          validator.validate(
            construct()
          )
        ).toBe(true);
      }
    );

    it(
      "rejects empty name",
      () => {
        expect(
          validator.validate(
            construct({
              name: "",
            })
          )
        ).toBe(false);
      }
    );

    it(
      "rejects duplicate active identities",
      () => {
        const existing = [
          construct({
            id: "existing",
          }),
        ];

        expect(
          validator.validate(
            construct(),
            existing
          )
        ).toBe(false);
      }
    );
  }
);