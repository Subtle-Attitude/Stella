// src/app/stella/contracts/GoalProfile.ts
export interface GoalProfile {
  goal: string;
  frequency: number;
  firstSeen: Date;
  lastSeen: Date;
  status: "identified" | "active" | "completed" | "abandoned";
  associatedThemes: string[];
  supportingMemoryIds: string[];
}