import type { CognitiveInput, CognitiveOutput, CognitiveState, ReflectionResult } from "./types";
import * as StellaSelfModule from "./StellaSelf";
import { EmphasisModulator } from "./EmphasisModulator";
import { ReflectionEngine } from "./ReflectionEngine";
import { GovernanceEngine } from "./GovernanceEngine";
import * as ResponseSynthesizerModule from "./ResponseSynthesizer";
import { ConstitutionalMemoryCoordinator } from "../integration/ConstitutionalMemoryCoordinator";

type ResponseSynthesizerLike = {
	synthesize(
		input: string,
		reflection: ReflectionResult,
		self: CognitiveState["self"],
		emphasis: CognitiveState["currentEmphasis"]
	): Promise<string> | string;
};

const ResponseSynthesizerConstructor = Object.values(ResponseSynthesizerModule).find(
	(value) =>
		typeof value === "function" &&
		typeof (value as { prototype?: { synthesize?: unknown } }).prototype?.synthesize === "function"
) as (new () => ResponseSynthesizerLike) | undefined;

const BASE_STELLA_SELF = Object.entries(StellaSelfModule).find(([name]) =>
	name.toUpperCase().includes("SELF")
)?.[1] as CognitiveState["self"];

export class CognitiveCore {   private state: CognitiveState;   private emphasisModulator: EmphasisModulator;   private reflectionEngine: ReflectionEngine;   private governanceEngine: GovernanceEngine;   private responseSynthesizer: ResponseSynthesizerLike;   private memoryCoordinator: ConstitutionalMemoryCoordinator;
 constructor(initialThreadId: string = "default") {     this.state = {       self: { ...BASE_STELLA_SELF },       currentEmphasis: {         atlas: 0.55,         reflection: 0.35,         wonder: 0.25,         dreamWeaver: 0.15,         envision: 0.15,         alignment: 0.4,         transformation: 0.1,       },       emotionalState: "present" as unknown as CognitiveState["emotionalState"],       activeThreadId: initialThreadId,       lastInteraction: new Date().toISOString(),     };
this.emphasisModulator = new EmphasisModulator();     this.reflectionEngine = new ReflectionEngine();     this.governanceEngine = new GovernanceEngine();     if (!ResponseSynthesizerConstructor) {       throw new Error("No response synthesizer implementation is exported.");     }     this.responseSynthesizer = new ResponseSynthesizerConstructor();     this.memoryCoordinator = new ConstitutionalMemoryCoordinator();   }
async process(input: CognitiveInput): Promise<CognitiveOutput> {     const memoryContext = await this.memoryCoordinator.retrieve(input.sessionId);
const reflection: ReflectionResult = await this.reflectionEngine.reflect(       input.text,       memoryContext,       this.state.self     );
this.state.emotionalState = reflection.emotionalState;
const governance: { decision: "PASS" | "BLOCK"; reason?: string } = await this.governanceEngine.evaluate(       input.text,       reflection,       this.state.self     );
if (governance.decision === "BLOCK") {       return {         response: governance.reason || "I need to pause here.",         decision: "BLOCK",         emphasis: this.state.currentEmphasis,         emotionalState: this.state.emotionalState,         memoryUpdates: [],       };     }
this.state.currentEmphasis = this.emphasisModulator.modulate(       input.text,       reflection,       this.state.currentEmphasis     );
const response = await this.responseSynthesizer.synthesize(       input.text,       reflection,       this.state.self,       this.state.currentEmphasis     );
const shouldUpdateRelationship = false;
let memoryUpdates:
  CognitiveOutput["memoryUpdates"] = [];

if (
  typeof this.memoryCoordinator.record ===
  "function"
) {
	const stored =
	await this.memoryCoordinator.record({
		userId: input.sessionId,
		type: "episodic",
		provenance: "observed_pattern",
		content: input.text,
		metadata: {
		response,
		reflection,
		shouldUpdateRelationship,
		},
		author: "stella",
	});

	memoryUpdates = [stored.id];
}
this.state.lastInteraction = new Date().toISOString();
return {       response,       decision: governance.decision,       emphasis: this.state.currentEmphasis,       emotionalState: this.state.emotionalState,       memoryUpdates,     };   }
getCurrentState(): CognitiveState {     return { ...this.state };   } }
