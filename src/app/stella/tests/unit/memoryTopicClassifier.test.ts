// src/app/stella/tests/unit/memoryTopicClassifier.test.ts
import { describe, it, expect } from "vitest";
import { MemoryTopicClassifier } from "../../../../stella/memory/MemoryTopicClassifier";
import type { MemoryRecord } from "../../contracts/MemoryRecord";

describe("MemoryTopicClassifier", () => {
  const classifier = new MemoryTopicClassifier();

  const base = (content: string): MemoryRecord => ({
    id: "1",
    userId: "u1",
    type: "episodic",
    provenance: "user_stated",
    content,
    metadata: {},
    provenanceChain: [],
    createdAt: new Date(),
    lastModifiedAt: new Date(),
    author: "user",
    isSoftDeleted: false,
  });

  it("extracts meaningful topics", () => {
    const topics = classifier.extractTopics(base("I enjoy morning journaling practice"));
    expect(topics).toContain("journaling");
    expect(topics).toContain("practice");
  });

  it("matches query terms", () => {
    expect(classifier.matches(base("journaling every morning"), "tell me about journaling")).toBe(true);
    expect(classifier.matches(base("coffee preference"), "journaling")).toBe(false);
  });
});