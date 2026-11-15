export interface RelationshipProfile {
  entity: string;
  frequency: number;
  firstSeen: Date;
  lastSeen: Date;
  associatedThemes: string[];
}