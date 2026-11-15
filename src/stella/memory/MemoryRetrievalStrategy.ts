// src/stella/memory/MemoryRetrievalStrategy.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import { MemoryTopicClassifier } from "./MemoryTopicClassifier";
import { AuthorityAwareMemoryRetrievalPolicy } from "./AuthorityAwareMemoryRetrievalPolicy";
import { AuthorityAwareMemoryRankingService } from "./AuthorityAwareMemoryRankingService";

export class MemoryRetrievalStrategy {
  constructor(
    private readonly classifier = new MemoryTopicClassifier(),
    private readonly policy = new AuthorityAwareMemoryRetrievalPolicy(),
    private readonly ranking = new AuthorityAwareMemoryRankingService()
  ) {}

  retrieve(records: MemoryRecord[], query: string): MemoryRecord[] {
    const topical = records.filter((r) => this.classifier.matches(r, query));
    const eligible = topical.filter((r) => this.policy.isEligibleForReasoning(r));
    return this.ranking.rank(eligible);
  }
}