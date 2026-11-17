// src/app/stella/contracts/IdentityLineage.ts
export interface IdentityLineage {
  id: string;
  name: string;
  description: string;
  constructs: string[];
  createdBy: "user";
  status: "active" | "archived";
}