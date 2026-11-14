// src/app/stella/tests/unit/audit.service.test.ts

import { describe, it, expect, beforeEach } from "vitest";
import { AuditService } from "../../../../stella/services/AuditService";

describe("AuditService", () => {
  let service: AuditService;

  beforeEach(() => {
    service = new AuditService();
  });

  it("creates records with valid signatures", () => {
    const record = service.createAuditRecord({
      userId: "u1",
      action: "create",
      entityType: "memory",
      entityId: "m1",
      beforeState: null,
      afterState: { content: "hello" },
      performedBy: "user",
    });

    expect(record.id).toBeDefined();
    expect(record.timestamp).toBeDefined();
    expect(record.signature).toHaveLength(64);
    expect(service.verifyAuditSignature(record)).toBe(true);
  });

  it("detects signature tampering", () => {
    const record = service.createAuditRecord({
      userId: "u1",
      action: "create",
      entityType: "memory",
      entityId: "m1",
      beforeState: null,
      afterState: { content: "hello" },
      performedBy: "user",
    });

    const tampered = {
      ...record,
      after: { content: "tampered" },
    };

    expect(service.verifyAuditSignature(tampered)).toBe(false);
  });

  it("maintains chronology", () => {
    const r1 = service.createAuditRecord({
      userId: "u1",
      action: "create",
      entityType: "memory",
      entityId: "m1",
      beforeState: null,
      afterState: { a: 1 },
      performedBy: "user",
    });

    service.appendAuditEntry(r1);

    const r2 = service.createAuditRecord({
      userId: "u1",
      action: "update",
      entityType: "memory",
      entityId: "m1",
      beforeState: { a: 1 },
      afterState: { a: 2 },
      performedBy: "user",
    });

    service.appendAuditEntry(r2);

    const history = service.getAuditHistory({
      entityId: "m1",
    });

    expect(history).toHaveLength(2);
    expect(history[0].action).toBe("create");
    expect(history[1].action).toBe("update");
  });

  it("returns filtered history", () => {
    const r1 = service.createAuditRecord({
      userId: "u1",
      action: "create",
      entityType: "memory",
      entityId: "m1",
      beforeState: null,
      afterState: {},
      performedBy: "user",
    });

    service.appendAuditEntry(r1);

    const r2 = service.createAuditRecord({
      userId: "u2",
      action: "create",
      entityType: "memory",
      entityId: "m2",
      beforeState: null,
      afterState: {},
      performedBy: "user",
    });

    service.appendAuditEntry(r2);

    expect(
      service.getAuditHistory({
        userId: "u1",
      })
    ).toHaveLength(1);

    expect(
      service.getAuditHistory({
        entityType: "memory",
      })
    ).toHaveLength(2);
  });

  it("rejects overwrite of existing audit record", () => {
    const record = service.createAuditRecord({
      userId: "u1",
      action: "create",
      entityType: "memory",
      entityId: "m1",
      beforeState: null,
      afterState: {},
      performedBy: "user",
    });

    service.appendAuditEntry(record);

    expect(() =>
      service.appendAuditEntry(record)
    ).toThrow(/immutable/);
  });
});