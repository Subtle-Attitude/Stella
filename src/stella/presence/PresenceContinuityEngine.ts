import type {
  PresenceProfile,
} from "../../app/stella/contracts/PresenceProfile";

export class PresenceContinuityEngine {
  check(
    profile: PresenceProfile
  ): boolean {
    return (
      profile.sovereigntyProtected &&
      (
        profile.voice === "reflective" ||
        profile.voice === "curious" ||
        profile.voice === "balanced"
      )
    );
  }
}
