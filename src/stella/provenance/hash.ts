// src/stella/provenance/hash.ts
import { createHash } from "crypto";

export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export function hashRecord(content: string, previousHash: string | null): string {
  const payload = previousHash ? `${previousHash}|${content}` : content;
  return sha256(payload);
}