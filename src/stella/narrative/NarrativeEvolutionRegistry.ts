// src/stella/narrative/NarrativeEvolutionRegistry.ts

import { randomUUID } from "crypto";

import type {
  NarrativeEvolution,
} from "../../app/stella/contracts/NarrativeEvolution";

export class NarrativeEvolutionRegistry {
  private readonly store =
    new Map<string, NarrativeEvolution>();

  create(
    sourceTheme: string,
    evolvedTheme: string,
    evidence: string[],
    confidence:
      | "low"
      | "medium",
    explanation: string
  ): NarrativeEvolution {
    const evolution:
      NarrativeEvolution = {
        id: randomUUID(),

        sourceTheme,

        evolvedTheme,

        evidence,

        confidence,

        explanation,

        status: "active",

        createdAt:
          new Date(),
      };

    this.store.set(
      evolution.id,
      evolution
    );

    return evolution;
  }

  getAll():
    NarrativeEvolution[] {
    return [
      ...this.store.values(),
    ];
  }

  findByTheme(
    theme: string
  ): NarrativeEvolution[] {
    const search =
      theme.toLowerCase();

    return [
      ...this.store.values(),
    ].filter(
      evolution =>
        evolution
          .sourceTheme
          .toLowerCase() ===
          search ||
        evolution
          .evolvedTheme
          .toLowerCase() ===
          search
    );
  }

  archive(
    id: string
  ):
    | NarrativeEvolution
    | undefined {
    const evolution =
      this.store.get(id);

    if (evolution) {
      evolution.status =
        "archived";
    }

    return evolution;
  }
}