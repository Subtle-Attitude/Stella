// src/stella/memory/AuthorityAwareMemoryRetrievalPolicy.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import { HumanSovereigntyService } from "../sovereignty/HumanSovereigntyService";

export class AuthorityAwareMemoryRetrievalPolicy {
  constructor(
    private readonly sovereignty = new HumanSovereigntyService()
  ) {}

  isEligibleForReasoning(record: MemoryRecord): boolean {
    return this.sovereignty.canUseMemoryForReasoning(record);
  }
}