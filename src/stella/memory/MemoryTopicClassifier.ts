// src/stella/memory/MemoryTopicClassifier.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";

export class MemoryTopicClassifier {
  extractTopics(record: MemoryRecord): string[] {
    const text = typeof record.content === "string" ? record.content.toLowerCase() : "";
    const words = text.split(/\W+/).filter((w) => w.length > 3);
    return [...new Set(words)];
  }

  matches(record: MemoryRecord, query: string): boolean {
    const topics = this.extractTopics(record);
    const queryTerms = query.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    return queryTerms.some((term) => topics.includes(term));
  }
}