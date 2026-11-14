import { randomUUID } from "crypto";

import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import type { GovernanceContext } from "../../app/stella/contracts/GovernanceContext";

import { GovernanceEngine } from "../governance/GovernanceEngine";
import { ProvenanceEngine } from "../provenance/ProvenanceEngine";
import { AuditService } from "../services/AuditService";

export class MemoryRepository {
  private readonly store = new Map<string, MemoryRecord>();

  constructor(
    private readonly governance = new GovernanceEngine(),
    private readonly provenance = new ProvenanceEngine(),
    private readonly audit = new AuditService()
  ) {}

  private async guard(
    context: GovernanceContext
  ): Promise<void> {
    const decision = await this.governance.evaluate(context);

    if (!decision.approved) {
      throw new Error(
        `Governance blocked operation: ${decision.violations.join(", ")}`
      );
    }
  }

  async create(
    input: Omit<
      MemoryRecord,
      | "id"
      | "provenanceChain"
      | "createdAt"
      | "lastModifiedAt"
      | "isSoftDeleted"
    >
  ): Promise<MemoryRecord> {
    const record: MemoryRecord = {
      ...input,
      id: randomUUID(),
      provenanceChain: [],
      createdAt: new Date(),
      lastModifiedAt: new Date(),
      isSoftDeleted: false,
    };

    const transition =
      this.provenance.validateTransition(record);

    if (!transition.valid) {
      throw new Error(
        `Provenance rejected: ${transition.violations.join(", ")}`
      );
    }

    const withChain =
      this.provenance.appendToChain(
        record,
        transition.newHash
      );

    await this.guard({
      operation: "write",
      record: withChain,
      targetType: withChain.type,
    });

    this.audit.appendAuditEntry(
      this.audit.createAuditRecord({
        userId: withChain.userId,
        action: "create",
        entityType: "memory",
        entityId: withChain.id,
        beforeState: null,
        afterState: withChain,
        performedBy:
          withChain.author as
            | "user"
            | "stella"
            | "system",
      })
    );

    this.store.set(
      withChain.id,
      withChain
    );

    return withChain;
  }

  async update(
    existing: MemoryRecord,
    patch: Partial<
      Pick<
        MemoryRecord,
        "content" | "metadata" | "provenance"
      >
    >
  ): Promise<MemoryRecord> {
    const next: MemoryRecord = {
      ...existing,
      ...patch,
      lastModifiedAt: new Date(),
    };

    const transition =
      this.provenance.validateTransition(
        next,
        existing.provenanceChain.at(-1) ??
          null
      );

    if (!transition.valid) {
      throw new Error(
        `Provenance rejected: ${transition.violations.join(", ")}`
      );
    }

    const withChain =
      this.provenance.appendToChain(
        next,
        transition.newHash
      );

    await this.guard({
      operation: "update",
      record: withChain,
      targetType: withChain.type,
    });

    this.audit.appendAuditEntry(
      this.audit.createAuditRecord({
        userId: withChain.userId,
        action: "update",
        entityType: "memory",
        entityId: withChain.id,
        beforeState: existing,
        afterState: withChain,
        performedBy:
          withChain.author as
            | "user"
            | "stella"
            | "system",
      })
    );

    this.store.set(
      withChain.id,
      withChain
    );

    return withChain;
  }

  async softDelete(
    record: MemoryRecord
  ): Promise<MemoryRecord> {
    const next: MemoryRecord = {
      ...record,
      isSoftDeleted: true,
      lastModifiedAt: new Date(),
    };

    await this.guard({
      operation: "delete",
      record: next,
      targetType: next.type,
    });

    this.audit.appendAuditEntry(
      this.audit.createAuditRecord({
        userId: record.userId,
        action: "soft_delete",
        entityType: "memory",
        entityId: record.id,
        beforeState: record,
        afterState: next,
        performedBy:
          record.author as
            | "user"
            | "stella"
            | "system",
      })
    );

    return next;
  }

  async hardDelete(
    record: MemoryRecord
  ): Promise<void> {
    await this.guard({
      operation: "delete",
      record: {
        ...record,
        isSoftDeleted: false,
      },
      targetType: record.type,
    });

    this.audit.appendAuditEntry(
      this.audit.createAuditRecord({
        userId: record.userId,
        action: "hard_delete",
        entityType: "memory",
        entityId: record.id,
        beforeState: record,
        afterState: null,
        performedBy:
          record.author as
            | "user"
            | "stella"
            | "system",
      })
    );

    this.store.delete(record.id);
  }
}