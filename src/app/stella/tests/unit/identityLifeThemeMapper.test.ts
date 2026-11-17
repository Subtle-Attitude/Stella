// src/app/stella/tests/unit/identityLifeThemeMapper.test.ts

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  IdentityLifeThemeMapper,
} from "../../../../stella/lifethemes/IdentityLifeThemeMapper";

import type {
  IdentityConstruct,
} from "../../contracts/IdentityConstruct";

import type {
  ValuePrinciple,
} from "../../contracts/ValuePrinciple";

import type {
  LifeTheme,
} from "../../contracts/LifeTheme";

describe(
  "IdentityLifeThemeMapper",
  () => {
    const mapper =
      new IdentityLifeThemeMapper();

    const construct:
      IdentityConstruct = {
        id: "c1",
        name: "Sun Dancer",
        description: "",
        declaredBy: "user",
        status: "active",
        supportingMemoryIds: [],
        createdAt: new Date(),
      };

    const values:
      ValuePrinciple[] = [
        {
          id: "v1",
          name: "Belonging",
          description: "",
          source:
            "user_declared",
          status: "active",
          supportingMemoryIds: [],
          supportingThemes: [],
          supportingIdentityConstructs:
            ["c1"],
          createdAt: new Date(),
        },
      ];

    const themes:
      LifeTheme[] = [
        {
          id: "t1",
          name:
            "Interconnection",
          description: "",
          source:
            "user_declared",
          supportingValues:
            ["Belonging"],
          supportingIdentityConstructs:
            ["c1"],
          supportingThemes: [],
          supportingMemoryIds: [],
          createdAt: new Date(),
        },
      ];

    it(
      "maps construct to life themes",
      () => {
        const result =
          mapper.map(
            construct,
            values,
            themes
          );

        expect(
          result
        ).toContain(
          "Interconnection"
        );
      }
    );
  }
);
