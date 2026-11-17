// src/stella/identity/IdentityConstructValidator.ts

import type { IdentityConstruct }
  from "../../app/stella/contracts/IdentityConstruct";

export class IdentityConstructValidator {
  validate(
    construct: IdentityConstruct,
    existing: IdentityConstruct[] = []
  ): boolean {
    if (
      construct.declaredBy !== "user"
    ) {
      return false;
    }

    if (
      construct.name.trim().length === 0
    ) {
      return false;
    }

    const duplicate =
      existing.some(
        c =>
          c.status === "active" &&
          c.name.toLowerCase() ===
            construct.name.toLowerCase() &&
          c.id !== construct.id
      );

    if (duplicate) {
      return false;
    }

    return true;
  }
}