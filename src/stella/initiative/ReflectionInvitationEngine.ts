// src/stella/initiative/ReflectionInvitationEngine.ts
export class ReflectionInvitationEngine {
  invite(trigger: string): string {
    if (trigger === "recurring_pattern") {
      return "Would it be useful to explore what may be contributing to it?";
    }
    return "Would you like to examine this further?";
  }
}