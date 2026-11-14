export interface MemoryRecord {
  id: string;
  userId: string;
  type: string;
  provenance: string;
  content: string;
  metadata: Record<string, unknown>;
  provenanceChain: string[];
  createdAt: Date;
  lastModifiedAt: Date;
  author: string;
  isSoftDeleted: boolean;
}