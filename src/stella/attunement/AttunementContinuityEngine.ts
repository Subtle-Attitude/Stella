import type {
  AttunementProfile,
} from "../../app/stella/contracts/AttunementProfile";

export class AttunementContinuityEngine {
  check(
    profile: AttunementProfile
  ): boolean {
    const validCadence =
      [
        "direct",
        "conversational",
        "contemplative",
      ].includes(
        profile.cadence
      );

    const validQuestioning =
      [
        "minimal",
        "moderate",
        "reflective",
      ].includes(
        profile.questioning
      );

    const validVerbosity =
      [
        "concise",
        "balanced",
        "spacious",
      ].includes(
        profile.verbosity
      );

    return (
      validCadence &&
      validQuestioning &&
      validVerbosity
    );
  }
}