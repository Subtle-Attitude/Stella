import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";
import type { GovernanceContext } from "../../app/stella/contracts/GovernanceContext";

import { MemoryRepository } from "../repositories/MemoryRepository";
import { AuditService } from "../services/AuditService";
import { GovernanceEngine } from "../governance/GovernanceEngine";

export class HumanSovereigntyService {
  constructor(
    private readonly repository = new MemoryRepository(),
    private readonly audit = new AuditService(),
    private readonly governance = new GovernanceEngine()
  ) {}

  async challengeInterpretation(
    record: MemoryRecord
  ): Promise<MemoryRecord> {
    if (record.provenance !== "ai_interpretation") {
      throw new Error(
        "Only AI interpretations may be challenged"
      );
    }

    const challenged: MemoryRecord = {
      ...record,
      metadata: {
        ...record.metadata,
        challenged: true,
      },
      lastModifiedAt: new Date(),
    };

    this.audit.appendAuditEntry(
      this.audit.createAuditRecord({
        userId: record.userId,
        action: "challenge_interpretation",
        entityType: "memory",
        entityId: record.id,
        beforeState: record,
        afterState: challenged,
        performedBy: "user",
      })
    );

    return challenged;
  }

  async correctPersonalInformation(
    existing: MemoryRecord,
    correctedContent: string
  ): Promise<MemoryRecord> {
    const corrected: MemoryRecord = {
      ...existing,
      content: correctedContent,
      lastModifiedAt: new Date(),
    };

    this.audit.appendAuditEntry(
      this.audit.createAuditRecord({
        userId: existing.userId,
        action: "correct_personal_information",
        entityType: "memory",
        entityId: existing.id,
        beforeState: existing,
        afterState: corrected,
        performedBy: "user",
      })
    );

    return corrected;
  }

  async requestCanonRevision(
    record: MemoryRecord
  ): Promise<void> {
    if (record.type !== "user_canon") {
      throw new Error(
        "Only user_canon records may be revised"
      );
    }

    const context: GovernanceContext = {
      operation: "update",
      record,
    };

    const decision =
      await this.governance.evaluate(context);

    if (!decision.approved) {
      throw new Error(
        `Governance blocked canon revision: ${decision.violations.join(", ")}`
      );
    }

    this.audit.appendAuditEntry(
      this.audit.createAuditRecord({
        userId: record.userId,
        action: "request_canon_revision",
        entityType: "memory",
        entityId: record.id,
        beforeState: record,
        afterState: record,
        performedBy: "user",
      })
    );
  }

  async requestMemoryDeletion(
    record: MemoryRecord
  ): Promise<void> {
    await this.repository.hardDelete(record);
  }

  canRetainMemory(
    record: MemoryRecord
  ): boolean {
    return !record.isSoftDeleted;
  }

  canUseMemoryForReasoning(
    record: MemoryRecord
  ): boolean {
    if (record.isSoftDeleted) {
      return false;
    }

    if (
      record.metadata?.challenged === true
    ) {
      return false;
    }

    return true;
  }

  canPromoteToCanon(
    record: MemoryRecord
  ): boolean {
    return (
      record.provenance === "user_stated" ||
      record.provenance ===
        "user_confirmed_pattern"
    );
  }
}