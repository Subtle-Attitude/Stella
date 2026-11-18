import { randomUUID } from "crypto";

import type {
  ExplanationTrace,
} from "../../app/stella/contracts/ExplanationTrace";

import type {
  TraceNode,
} from "../../app/stella/contracts/TraceNode";

export class ExplanationTraceRegistry {
  private readonly store =
    new Map<string, ExplanationTrace>();

  create(
    subject: string,
    nodes: TraceNode[],
    confidence:
      | "low"
      | "medium",
    explanation: string
  ): ExplanationTrace {
    const trace: ExplanationTrace = {
      id: randomUUID(),

      subject,

      nodes,

      confidence,

      explanation,

      status: "active",
    };

    this.store.set(
      trace.id,
      trace
    );

    return trace;
  }

  getAll():
    ExplanationTrace[] {
    return [
      ...this.store.values(),
    ];
  }

  findBySubject(
    subject: string
  ):
    | ExplanationTrace
    | undefined {
    return [
      ...this.store.values(),
    ].find(
      t =>
        t.subject
          .toLowerCase() ===
        subject.toLowerCase() &&
        t.status ===
          "active"
    );
  }

  archive(
    id: string
  ):
    | ExplanationTrace
    | undefined {
    const trace =
      this.store.get(id);

    if (trace) {
      trace.status =
        "archived";
    }

    return trace;
  }
}