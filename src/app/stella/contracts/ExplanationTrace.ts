import type { TraceNode }
  from "./TraceNode";

export interface ExplanationTrace {
  id: string;

  subject: string;

  nodes: TraceNode[];

  confidence:
    | "low"
    | "medium";

  explanation: string;

  status:
    | "active"
    | "archived";
}