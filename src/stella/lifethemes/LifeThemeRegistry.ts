// src/stella/lifethemes/LifeThemeRegistry.ts

import { randomUUID } from "crypto";

import type { LifeTheme }
  from "../../app/stella/contracts/LifeTheme";

export class LifeThemeRegistry {
  private readonly store =
    new Map<string, LifeTheme>();

  create(
    name: string,
    description: string,
    source: LifeTheme["source"],
    supportingValues: string[] = [],
    supportingIdentityConstructs: string[] = [],
    supportingThemes: string[] = [],
    supportingMemoryIds: string[] = []
  ): LifeTheme {
    const theme: LifeTheme = {
      id: randomUUID(),
      name,
      description,
      source,
      supportingValues,
      supportingIdentityConstructs,
      supportingThemes,
      supportingMemoryIds,
      createdAt: new Date(),
    };

    this.store.set(
      theme.id,
      theme
    );

    return theme;
  }

  findByName(
    name: string
  ): LifeTheme | undefined {
    return [
      ...this.store.values(),
    ].find(
      t =>
        t.name.toLowerCase() ===
        name.toLowerCase()
    );
  }

  getAll(): LifeTheme[] {
    return [
      ...this.store.values(),
    ];
  }
}