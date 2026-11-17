// src/types/stella.ts
export type StellaState =
  | "orientation"
  | "reflection"
  | "wonder"
  | "dreamWeaver"
  | "envision"
  | "alignment"
  | "transformation";

export interface StellaEmotion {
  glowIntensity: number;
  haloScale: number;
  coreBrightness: number;
  companionBrightness: number;
  primaryColor: string;
  pulseDuration: number;
  breathScale: number;
}

export const STELLA_EMOTIONS: Record<StellaState, StellaEmotion> = {
  orientation: {
    glowIntensity: 0.85,
    haloScale: 1.05,
    coreBrightness: 1.0,
    companionBrightness: 0.7,
    primaryColor: "#00f0ff",
    pulseDuration: 4.2,
    breathScale: 1.015,
  },
  reflection: {
    glowIntensity: 0.75,
    haloScale: 1.1,
    coreBrightness: 0.92,
    companionBrightness: 0.55,
    primaryColor: "#7b68ee",
    pulseDuration: 5.5,
    breathScale: 1.01,
  },
  wonder: {
    glowIntensity: 1.25,
    haloScale: 1.45,
    coreBrightness: 1.25,
    companionBrightness: 1.4,
    primaryColor: "#00f0ff",
    pulseDuration: 3.2,
    breathScale: 1.03,
  },
  dreamWeaver: {
    glowIntensity: 0.9,
    haloScale: 1.25,
    coreBrightness: 0.95,
    companionBrightness: 0.8,
    primaryColor: "#c084fc",
    pulseDuration: 6.0,
    breathScale: 1.02,
  },
  envision: {
    glowIntensity: 1.15,
    haloScale: 1.35,
    coreBrightness: 1.15,
    companionBrightness: 1.1,
    primaryColor: "#fbbf24",
    pulseDuration: 3.8,
    breathScale: 1.025,
  },
  alignment: {
    glowIntensity: 0.8,
    haloScale: 1.0,
    coreBrightness: 1.0,
    companionBrightness: 0.65,
    primaryColor: "#67e8f9",
    pulseDuration: 7.0,
    breathScale: 1.008,
  },
  transformation: {
    glowIntensity: 1.1,
    haloScale: 1.6,
    coreBrightness: 1.12,
    companionBrightness: 1.0,
    primaryColor: "#22d3ee",
    pulseDuration: 2.8,
    breathScale: 1.04,
  },
};