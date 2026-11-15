// src/app/stella/contracts/ProjectProfile.ts
export interface ProjectProfile {
  project: string;
  goals: string[];
  associatedThemes: string[];
  firstSeen: Date;
  lastSeen: Date;
  status: "identified" | "active" | "completed" | "archived";
}