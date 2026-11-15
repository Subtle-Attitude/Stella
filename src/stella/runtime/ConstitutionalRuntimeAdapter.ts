import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";

import { HumanSovereigntyService } from "../sovereignty/HumanSovereigntyService";
import { MemoryRepository } from "../repositories/MemoryRepository";

export class ConstitutionalRuntimeAdapter {
  constructor(
    private readonly sovereignty =
      new HumanSovereigntyService(),
    private readonly repository =
      new MemoryRepository()
  ) {}

  async retrieveMemoryForReasoning(
    records: MemoryRecord[]
  ): Promise<MemoryRecord[]> {
    return records.filter((record) =>
      this.sovereignty.canUseMemoryForReasoning(
        record
      )
    );
  }

  async storeMemory(
    input: Omit<
      MemoryRecord,
      | "id"
      | "provenanceChain"
      | "createdAt"
      | "lastModifiedAt"
      | "isSoftDeleted"
    >
  ): Promise<MemoryRecord> {
    return this.repository.create(input);
  }

  async challengeMemory(
    record: MemoryRecord
  ): Promise<MemoryRecord> {
    return this.sovereignty.challengeInterpretation(
      record
    );
  }

  async correctMemory(
    record: MemoryRecord,
    correctedContent: string
  ): Promise<MemoryRecord> {
    return this.sovereignty.correctPersonalInformation(
      record,
      correctedContent
    );
  }

  canPromoteMemoryToCanon(
    record: MemoryRecord
  ): boolean {
    return this.sovereignty.canPromoteToCanon(
      record
    );
  }
}