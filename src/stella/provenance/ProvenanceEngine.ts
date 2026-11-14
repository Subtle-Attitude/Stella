// src/stella/provenance/ProvenanceEngine.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import { hashRecord } from "./hash";

export interface ProvenanceResult {
  valid: boolean;
  violations: string[];
  newHash: string;
}

export class ProvenanceEngine {
  private readonly forbiddenForUserCanon = new Set([
    "ai_interpretation",
    "unverified_assumption",
  ]);

  validateUserCanonEligibility(record: Pick<MemoryRecord, "type" | "provenance">): string[] {
    const violations: string[] = [];
    if (record.type === "user_canon" && this.forbiddenForUserCanon.has(record.provenance)) {
      violations.push("AI interpretations are prohibited from entering user_canon");
    }
    return violations;
  }

  validateTransition(
    record: Omit<MemoryRecord, "provenanceChain"> & { provenanceChain?: string[] },
    previousHash: string | null = null
  ): ProvenanceResult {
    const violations = this.validateUserCanonEligibility(record);

    const content = typeof record.content === "string" ? record.content : JSON.stringify(record.content);
    const newHash = hashRecord(content, previousHash);

    const chain = record.provenanceChain ?? [];
    if (previousHash && chain.length > 0 && chain[chain.length - 1] !== previousHash) {
      violations.push("Provenance chain does not match previous hash");
    }

    return {
      valid: violations.length === 0,
      violations,
      newHash,
    };
  }

  appendToChain(record: MemoryRecord, newHash: string): MemoryRecord {
    return {
      ...record,
      provenanceChain: [...(record.provenanceChain ?? []), newHash],
    };
  }

  verifyChainIntegrity(record: MemoryRecord): boolean {
    const chain = record.provenanceChain ?? [];
    if (chain.length === 0) return true;

    const content = typeof record.content === "string" ? record.content : JSON.stringify(record.content);
    let previous: string | null = null;

    for (const hash of chain) {
      const expected = hashRecord(content, previous);
      if (hash !== expected) return false;
      previous = hash;
    }
    return true;
  }
}