import type { CognitiveEmphasis, ReflectionResult } from "./types";
import type { StellaSelf } from "./types";
import { speak } from "@/app/voice/text-to-speech";

export class ResponseSynthesizer {
  async synthesize(
    input: string,
    reflection: ReflectionResult,
    self: StellaSelf,
    emphasis: CognitiveEmphasis
  ): Promise<string> {
    const tone =
      emphasis.wonder > 0.3
        ? "with a sense of wonder"
        : emphasis.reflection > 0.3
          ? "reflectively"
          : "clearly";

    const response = `I heard you say: "${input}". Responding ${tone}.`;

    // Speak only in the browser (the voice page / dashboard already handles this too)
    if (typeof window !== "undefined") {
      speak(response);
    }

    return response;
  }
}