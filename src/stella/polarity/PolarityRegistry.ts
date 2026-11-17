// src/stella/polarity/PolarityRegistry.ts
import { randomUUID } from "crypto";
import type { Polarity } from "../../app/stella/contracts/Polarity";

export class PolarityRegistry {
  private readonly store = new Map<string, Polarity>();

  create(
    valueA: string,
    valueB: string,
    description: string,
    source: Polarity["source"],
    supportingMemoryIds: string[] = [],
    supportingThemes: string[] = [],
    confidence: "low" | "medium" = "medium"
  ): Polarity {
    const polarity: Polarity = {
      id: randomUUID(),
      valueA,
      valueB,
      description,
      source,
      supportingMemoryIds,
      supportingThemes,
      confidence,
      status: "active",
      createdAt: new Date(),
    };
    this.store.set(polarity.id, polarity);
    return polarity;
  }

  findByValue(value: string): Polarity[] {
    return [...this.store.values()].filter(
      (p) => p.valueA === value || p.valueB === value
    );
  }

  archive(id: string): Polarity | undefined {
    const polarity = this.store.get(id);
    if (polarity) polarity.status = "archived";
    return polarity;
  }

  getAll(): Polarity[] {
    return [...this.store.values()];
  }
}