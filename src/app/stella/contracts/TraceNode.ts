// src/app/stella/contracts/TraceNode.ts
export interface TraceNode {
  id: string;
  type: "memory" | "theme" | "relationship" | "situation" | "goal" | "project" | "narrative" | "polarity" | "wisdom";
  label: string;
}