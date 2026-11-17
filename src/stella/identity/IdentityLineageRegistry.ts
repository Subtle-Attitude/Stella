// src/stella/identity/IdentityLineageRegistry.ts
import { randomUUID } from "crypto";
import type { IdentityLineage } from "../../app/stella/contracts/IdentityLineage";

export class IdentityLineageRegistry {
  private readonly store = new Map<string, IdentityLineage>();

  createLineage(name: string, description: string): IdentityLineage {
    const lineage: IdentityLineage = {
      id: randomUUID(),
      name,
      description,
      constructs: [],
      createdBy: "user",
      status: "active",
    };
    this.store.set(lineage.id, lineage);
    return lineage;
  }

  findLineage(id: string): IdentityLineage | undefined {
    return this.store.get(id);
  }

  attachConstruct(lineageId: string, constructId: string): IdentityLineage | undefined {
    const lineage = this.store.get(lineageId);
    if (!lineage || lineage.constructs.includes(constructId)) return lineage;
    lineage.constructs.push(constructId);
    return lineage;
  }

  archiveLineage(id: string): IdentityLineage | undefined {
    const lineage = this.store.get(id);
    if (lineage) lineage.status = "archived";
    return lineage;
  }

  getAll(): IdentityLineage[] {
    return [...this.store.values()];
  }
}