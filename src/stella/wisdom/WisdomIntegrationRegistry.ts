// src/stella/wisdom/WisdomIntegrationRegistry.ts
import { randomUUID } from "crypto";
import type { WisdomIntegration } from "../../app/stella/contracts/WisdomIntegration";

export class WisdomIntegrationRegistry {
  private readonly store = new Map<string, WisdomIntegration>();

  create(
    polarityA: string,
    polarityB: string,
    integration: string,
    description: string,
    source: WisdomIntegration["source"],
    supportingValues: string[] = [],
    supportingThemes: string[] = [],
    supportingNarrativeEvolutions: string[] = [],
    confidence: "low" | "medium" = "medium"
  ): WisdomIntegration {
    const record: WisdomIntegration = {
      id: randomUUID(),
      polarityA,
      polarityB,
      integration,
      description,
      source,
      supportingValues,
      supportingThemes,
      supportingNarrativeEvolutions,
      confidence,
      status: "active",
      createdAt: new Date(),
    };
    this.store.set(record.id, record);
    return record;
  }

  findByIntegration(integration: string): WisdomIntegration | undefined {
    return [...this.store.values()].find(
      (w) => w.integration.toLowerCase() === integration.toLowerCase() && w.status === "active"
    );
  }

  archive(id: string): WisdomIntegration | undefined {
    const record = this.store.get(id);
    if (record) record.status = "archived";
    return record;
  }

  getAll(): WisdomIntegration[] {
    return [...this.store.values()];
  }
}