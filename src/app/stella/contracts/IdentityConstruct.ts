// src/app/stella/contracts/IdentityConstruct.ts
export interface IdentityConstruct {
  id: string;
  name: string;
  description: string;
  lineageId?: string;
  declaredBy: "user";
  status: "active" | "archived";
  supportingMemoryIds: string[];
  createdAt: Date;
}