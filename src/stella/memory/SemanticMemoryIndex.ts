// src/stella/memory/SemanticMemoryIndex.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import { MemoryTopicClassifier } from "./MemoryTopicClassifier";

export class SemanticMemoryIndex {
  private readonly classifier = new MemoryTopicClassifier();
  private readonly index = new Map<string, MemoryRecord[]>();

  add(record: MemoryRecord): void {
    const topics = this.classifier.extractTopics(record);
    for (const topic of topics) {
      const list = this.index.get(topic) ?? [];
      list.push(record);
      this.index.set(topic, list);
    }
  }

  query(terms: string[]): MemoryRecord[] {
    const seen = new Set<string>();
    const results: MemoryRecord[] = [];
    for (const term of terms) {
      const list = this.index.get(term.toLowerCase()) ?? [];
      for (const record of list) {
        if (!seen.has(record.id)) {
          seen.add(record.id);
          results.push(record);
        }
      }
    }
    return results;
  }
}