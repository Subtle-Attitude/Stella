// src/app/stella/contracts/SituationProfile.ts
export interface SituationProfile {
  situation: string;
  associatedThemes: string[];
  associatedRelationships: string[];
  firstSeen: Date;
  lastSeen: Date;
  status: "active" | "resolved" | "uncertain";
}