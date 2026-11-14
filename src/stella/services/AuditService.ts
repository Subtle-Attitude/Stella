// src/stella/services/AuditService.ts

import { createHash, randomUUID } from "crypto";
import type { AuditRecord } from "../../app/stella/contracts/Audit";

export interface CreateAuditRecordInput {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  beforeState?: unknown;
  afterState?: unknown;
  performedBy: "user" | "stella" | "system";
}

export interface AuditHistoryFilter {
  userId?: string;
  entityId?: string;
  entityType?: string;
}

export class AuditService {
  private readonly store = new Map<string, AuditRecord>();

  createAuditRecord(
    input: CreateAuditRecordInput
  ): AuditRecord {
    const timestamp = new Date();

    const id = randomUUID();

    const payload = JSON.stringify({
      id,
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      before: input.beforeState,
      after: input.afterState,
      performedBy: input.performedBy,
      timestamp: timestamp.toISOString(),
    });

    const signature = createHash("sha256")
      .update(payload)
      .digest("hex");

    return {
      id,
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      before: input.beforeState,
      after: input.afterState,
      performedBy: input.performedBy,
      timestamp,
      signature,
    };
  }

  appendAuditEntry(record: AuditRecord): void {
    if (this.store.has(record.id)) {
      throw new Error(
        "Audit records are immutable and cannot be overwritten"
      );
    }

    this.store.set(
      record.id,
      Object.freeze({ ...record })
    );
  }

  verifyAuditSignature(
    record: AuditRecord
  ): boolean {
    const payload = JSON.stringify({
      id: record.id,
      userId: record.userId,
      action: record.action,
      entityType: record.entityType,
      entityId: record.entityId,
      before: record.before,
      after: record.after,
      performedBy: record.performedBy,
      timestamp: record.timestamp.toISOString(),
    });

    const expected = createHash("sha256")
      .update(payload)
      .digest("hex");

    return expected === record.signature;
  }

  getAuditHistory(
    filter: AuditHistoryFilter = {}
  ): AuditRecord[] {
    return Array.from(this.store.values())
      .filter((record) => {
        if (
          filter.userId &&
          record.userId !== filter.userId
        ) {
          return false;
        }

        if (
          filter.entityId &&
          record.entityId !== filter.entityId
        ) {
          return false;
        }

        if (
          filter.entityType &&
          record.entityType !== filter.entityType
        ) {
          return false;
        }

        return true;
      })
      .sort(
        (a, b) =>
          a.timestamp.getTime() -
          b.timestamp.getTime()
      );
  }

  getAuditRecord(
    id: string
  ): AuditRecord | undefined {
    return this.store.get(id);
  }

  getAllAuditRecords(): AuditRecord[] {
    return Array.from(this.store.values()).sort(
      (a, b) =>
        a.timestamp.getTime() -
        b.timestamp.getTime()
    );
  }

  auditCount(): number {
    return this.store.size;
  }
}