// src/stella/values/ValuePrincipleRegistry.ts
import { randomUUID } from "crypto";
import type { ValuePrinciple } from "../../app/stella/contracts/ValuePrinciple";

export class ValuePrincipleRegistry {
  private readonly store = new Map<string, ValuePrinciple>();

  create(
    name: string,
    description: string,
    source: ValuePrinciple["source"],
    supportingMemoryIds: string[] = [],
    supportingThemes: string[] = [],
    supportingIdentityConstructs: string[] = []
  ): ValuePrinciple {
    const principle: ValuePrinciple = {
      id: randomUUID(),
      name,
      description,
      source,
      status: "active",
      supportingMemoryIds,
      supportingThemes,
      supportingIdentityConstructs,
      createdAt: new Date(),
    };
    this.store.set(principle.id, principle);
    return principle;
  }

  findByName(name: string): ValuePrinciple | undefined {
    return [...this.store.values()].find(
      (p) => p.name.toLowerCase() === name.toLowerCase() && p.status === "active"
    );
  }

  archive(id: string): ValuePrinciple | undefined {
    const principle = this.store.get(id);
    if (principle) principle.status = "archived";
    return principle;
  }

  getAll(): ValuePrinciple[] {
    return [...this.store.values()];
  }

  addSupportingMemory(id: string, memoryId: string): ValuePrinciple | undefined {
    const principle = this.store.get(id);
    if (principle && !principle.supportingMemoryIds.includes(memoryId)) {
      principle.supportingMemoryIds.push(memoryId);
    }
    return principle;
  }

  addSupportingTheme(id: string, theme: string): ValuePrinciple | undefined {
    const principle = this.store.get(id);
    if (principle && !principle.supportingThemes.includes(theme)) {
      principle.supportingThemes.push(theme);
    }
    return principle;
  }

  addSupportingIdentityConstruct(id: string, identityConstruct: string): ValuePrinciple | undefined {
    const principle = this.store.get(id);
    if (principle && !principle.supportingIdentityConstructs.includes(identityConstruct)) {
      principle.supportingIdentityConstructs.push(identityConstruct);
    }
    return principle;
  }
}