// src/stella/memory/MemoryAuthorityService.ts
import type { MemoryRecord } from "../../app/stella/contracts/MemoryRecord";

export class MemoryAuthorityService {
  isAuthoritative(record: MemoryRecord): boolean {
    return (
      record.provenance === "user_stated" ||
      record.provenance === "user_confirmed_pattern"
    );
  }
}