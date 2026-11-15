// src/cognitive/integration/ConstitutionalMemoryCoordinator.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import { ConstitutionalRuntimeAdapter } from "../../stella/runtime/ConstitutionalRuntimeAdapter";
import { AuthorityAwareMemoryRetrievalPolicy } from "../../stella/memory/AuthorityAwareMemoryRetrievalPolicy";
import { AuthorityAwareMemoryRankingService } from "../../stella/memory/AuthorityAwareMemoryRankingService";

export class ConstitutionalMemoryCoordinator {
  private readonly memoryBuffer: MemoryRecord[] = [];
  private readonly retrievalPolicy = new AuthorityAwareMemoryRetrievalPolicy();
  private readonly rankingService = new AuthorityAwareMemoryRankingService();

  constructor(
    private readonly runtime = new ConstitutionalRuntimeAdapter()
  ) {}

  async retrieve(sessionId: string): Promise<MemoryRecord[]> {
    // Sprint 9:
    // retrieval currently operates on constitutional memory.
    // session-aware partitioning will be introduced later.
    const eligible = this.memoryBuffer.filter((record) =>
      this.retrievalPolicy.isEligibleForReasoning(record)
    );
    return this.rankingService.rank(eligible);
  }

  async record(
    input: Omit<MemoryRecord, "id" | "provenanceChain" | "createdAt" | "lastModifiedAt" | "isSoftDeleted"> & { id?: string }
  ): Promise<MemoryRecord> {
    const stored = await this.runtime.storeMemory(input);
    this.memoryBuffer.push(stored);
    return stored;
  }

  async challenge(record: MemoryRecord): Promise<MemoryRecord> {
    const challenged = await this.runtime.challengeMemory(record);
    const index = this.memoryBuffer.findIndex((r) => r.id === record.id);
    if (index >= 0) this.memoryBuffer[index] = challenged;
    return challenged;
  }

  async correct(record: MemoryRecord, correctedContent: string): Promise<MemoryRecord> {
    const corrected = await this.runtime.correctMemory(record, correctedContent);
    const index = this.memoryBuffer.findIndex((r) => r.id === record.id);
    if (index >= 0) this.memoryBuffer[index] = corrected;
    return corrected;
  }
}