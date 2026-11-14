import type { MemoryRecord } from "./MemoryRecord";

export interface ConstitutionalCore {
  id: string;
  version: string;
  principles: string[];
  lastAuthorizedAt: Date;
  authorizedByUserId: string;
  signature: string;
  createdAt: Date;
}

export interface GovernanceIntent {
  id: string;
  userId: string;
  modality: string;
  rawContent: string;
  metadata: Record<string, unknown>;
  requestedAction?: string;
}

export type GovernanceOperation = "read" | "write" | "update" | "delete" | string;

export interface GovernanceContext {
  constitutionalCore?: ConstitutionalCore;
  intent?: GovernanceIntent;
  operation?: GovernanceOperation;
  record?: MemoryRecord | null;
  targetType?: string;
}