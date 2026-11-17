// src/cognitive/integration/ConstitutionalMemoryCoordinator.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import { ConstitutionalRuntimeAdapter } from "../../stella/runtime/ConstitutionalRuntimeAdapter";
import { AuthorityAwareMemoryRetrievalPolicy } from "../../stella/memory/AuthorityAwareMemoryRetrievalPolicy";
import { AuthorityAwareMemoryRankingService } from "../../stella/memory/AuthorityAwareMemoryRankingService";

export class ConstitutionalMemoryCoordinator {
  private readonly memoryBuffer = new Map<string, MemoryRecord[]>();
  private readonly retrievalPolicy = new AuthorityAwareMemoryRetrievalPolicy();
  private readonly rankingService = new AuthorityAwareMemoryRankingService();

  constructor(
    private readonly runtime = new ConstitutionalRuntimeAdapter()
  ) {}

  private getBuffer(sessionId: string): MemoryRecord[] {
    if (!this.memoryBuffer.has(sessionId)) {
      this.memoryBuffer.set(sessionId, []);
    }
    return this.memoryBuffer.get(sessionId)!;
  }

  async retrieve(sessionId: string): Promise<MemoryRecord[]> {
    const buffer = this.getBuffer(sessionId);
    const eligible = buffer.filter((record) =>
      this.retrievalPolicy.isEligibleForReasoning(record)
    );
    return this.rankingService.rank(eligible);
  }

  async record(
    input: Omit<MemoryRecord, "id" | "provenanceChain" | "createdAt" | "lastModifiedAt" | "isSoftDeleted"> & { id?: string },
    sessionId: string = "default"
  ): Promise<MemoryRecord> {
    const stored = await this.runtime.storeMemory(input);
    this.getBuffer(sessionId).push(stored);
    return stored;
  }

  async challenge(record: MemoryRecord, sessionId: string = "default"): Promise<MemoryRecord> {
    const challenged = await this.runtime.challengeMemory(record);
    const buffer = this.getBuffer(sessionId);
    const index = buffer.findIndex((r) => r.id === record.id);
    if (index >= 0) buffer[index] = challenged;
    return challenged;
  }

  async correct(
    record: MemoryRecord,
    correctedContent: string,
    sessionId: string = "default"
  ): Promise<MemoryRecord> {
    const corrected = await this.runtime.correctMemory(record, correctedContent);
    const buffer = this.getBuffer(sessionId);
    const index = buffer.findIndex((r) => r.id === record.id);
    if (index >= 0) buffer[index] = corrected;
    return corrected;
  }

  clearSession(sessionId: string): void {
    this.memoryBuffer.delete(sessionId);
  }
}