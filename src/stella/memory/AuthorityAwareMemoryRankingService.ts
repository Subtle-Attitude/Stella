import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";

const PROVENANCE_WEIGHT: Record<string, number> = {
  user_stated: 100,
  user_confirmed_pattern: 95,
  observed_pattern: 60,
  ai_interpretation: 30,
  unverified_assumption: 10,
};

const TYPE_WEIGHT: Record<string, number> = {
  user_canon: 40,
  semantic: 20,
  relational: 15,
  episodic: 10,
  stella_canon: 5,
};

export class AuthorityAwareMemoryRankingService {
  score(record: MemoryRecord): number {
    if (
      record.type === "user_canon" &&
      (
        record.provenance === "ai_interpretation" ||
        record.provenance === "unverified_assumption"
      )
    ) {
      throw new Error(
        "Constitutional violation: non-authoritative memory cannot exist in user_canon"
      );
    }

    const provenance =
      PROVENANCE_WEIGHT[record.provenance] ?? 0;

    const type =
      TYPE_WEIGHT[record.type] ?? 0;

    return provenance + type;
  }

  rank(records: MemoryRecord[]): MemoryRecord[] {
    return [...records].sort(
      (a, b) => this.score(b) - this.score(a)
    );
  }
}