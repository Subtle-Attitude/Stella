import { appendFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import type { ResolvedAtlasContext } from "@/atlas/types"
import type { AtlasKnowledgeContext } from "@/atlas/context/types"
import type { InteractionIntent } from "@/intent/types"
import type { ConversationalTurn } from "@/conversation/types"
import type {
  ConversationAuditRecord,
  AppliedSafeguard,
  GovernanceViolation,
} from "./types"

const GOVERNANCE_DIR = join(process.cwd(), "data/governance")
const AUDIT_PATH = join(GOVERNANCE_DIR, "audit.jsonl")

function ensureDir() {
  if (!existsSync(GOVERNANCE_DIR)) {
    mkdirSync(GOVERNANCE_DIR, { recursive: true })
  }
}

export function recordTurn(params: {
  input: string
  resolved: ResolvedAtlasContext
  knowledge: AtlasKnowledgeContext
  intent: InteractionIntent
  generatedResponse: string
  reflectionDecision: "PASS" | "WARN" | "BLOCK"
  reflectionFlags: string[]
  safeguardsApplied: AppliedSafeguard[]
  violations: GovernanceViolation[]
  turn: ConversationalTurn | null
}): ConversationAuditRecord {
  ensureDir()

  const record: ConversationAuditRecord = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    input: params.input,
    resolved: params.resolved,
    knowledge: params.knowledge,
    intent: params.intent,
    generatedResponse: params.generatedResponse,
    reflectionDecision: params.reflectionDecision,
    reflectionFlags: params.reflectionFlags,
    safeguardsApplied: params.safeguardsApplied,
    violations: params.violations,
    turn: params.turn,
  }

  appendFileSync(AUDIT_PATH, JSON.stringify(record) + "\n", "utf-8")

  return record
}