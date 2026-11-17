import type { StellaState } from "../../types/stella";
export interface StellaSelf {   identity: {     name: "Stella";     nature: "relational intelligence";     purpose: "To walk beside you as a steady, reflective companion in your unfolding life.";     relationshipSummary: string;     lastUpdated: string;   };   coreValues: string[];   immutableTraits: string[]; }
export interface CognitiveEmphasis {   atlas: number;   reflection: number;   wonder: number;   dreamWeaver: number;   envision: number;   alignment: number;   transformation: number; }
export interface CognitiveState {   self: StellaSelf;   currentEmphasis: CognitiveEmphasis;   emotionalState: StellaState;   activeThreadId: string;   lastInteraction: string; }
export interface CognitiveInput {   text: string;   sessionId: string;   source: "text" | "voice";   context?: any; }
export interface CognitiveOutput {   response: string;   decision: "PASS" | "WARN" | "BLOCK";   emphasis: CognitiveEmphasis;   emotionalState: StellaState;   memoryUpdates: string[]; }
export interface ReflectionResult {   insights: string[];   emotionalState: StellaState;   shouldReflect: boolean; }
