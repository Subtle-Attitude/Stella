// src/stella/identity/IdentityConstructRegistry.ts
import { randomUUID } from "crypto";
import type { IdentityConstruct } from "../../app/stella/contracts/IdentityConstruct";

export class IdentityConstructRegistry {
  private readonly store = new Map<string, IdentityConstruct>();

  create(name: string, description: string, supportingMemoryIds: string[], lineageId?: string): IdentityConstruct {
    const construct: IdentityConstruct = {
      id: randomUUID(),
      name,
      description,
      lineageId,
      declaredBy: "user",
      status: "active",
      supportingMemoryIds,
      createdAt: new Date(),
    };
    this.store.set(construct.id, construct);
    return construct;
  }

  find(id: string): IdentityConstruct | undefined {
    return this.store.get(id);
  }

  archive(id: string): IdentityConstruct | undefined {
    const construct = this.store.get(id);
    if (construct) construct.status = "archived";
    return construct;
  }

  getAll(): IdentityConstruct[] {
    return [...this.store.values()];
  }
}