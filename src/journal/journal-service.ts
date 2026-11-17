import { JournalEntrySchema } from "./schemas";

import type {
  JournalEntry,
  JournalSession,
  JournalSessionResult,
  JournalEngineInput,
  JournalEngineOptions,
  JournalEngineDependencies,
} from "./types";

import { createJournalSession } from "./journal-engine";

export interface JournalRepository {
  saveSession(session: JournalSession): Promise<void>;

  getSession(
    sessionId: string,
  ): Promise<JournalSessionResult | null>;

  saveEntry(entry: JournalEntry): Promise<void>;

  updateSessionStatus(
    sessionId: string,
    status: JournalSession["status"],
  ): Promise<void>;
}

export class JournalService {
  constructor(
    private readonly repository: JournalRepository,
    private readonly dependencies: JournalEngineDependencies,
  ) {}

  async createSession(
    input: JournalEngineInput,
    options: JournalEngineOptions = {},
  ): Promise<JournalSession> {
    const result = await createJournalSession(
      input,
      options,
      this.dependencies,
    );

    if (!result.success) {
      throw new Error(result.message);
    }

    await this.repository.saveSession(result.session);

    return result.session;
  }

  async getSession(
    sessionId: string,
  ): Promise<JournalSessionResult | null> {
    return this.repository.getSession(sessionId);
  }

  async saveEntry(
    sessionId: string,
    content: string,
  ): Promise<JournalEntry> {
    const session = await this.repository.getSession(sessionId);

    if (!session) {
      throw new Error("Journal session not found.");
    }

    if (
      session.session.status === "completed" ||
      session.session.status === "abandoned"
    ) {
      throw new Error("This journal session is closed.");
    }

    const now = new Date().toISOString();

    const entry = JournalEntrySchema.parse({
      id: crypto.randomUUID(),
      sessionId,
      content,
      createdAt: now,
      updatedAt: now,
      author: "user",
    });

    await this.repository.saveEntry(entry);

    await this.repository.updateSessionStatus(
      sessionId,
      "in_progress",
    );

    return entry;
  }

  async completeSession(
    sessionId: string,
  ): Promise<void> {
    await this.repository.updateSessionStatus(
      sessionId,
      "completed",
    );
  }

  async abandonSession(
    sessionId: string,
  ): Promise<void> {
    await this.repository.updateSessionStatus(
      sessionId,
      "abandoned",
    );
  }
}