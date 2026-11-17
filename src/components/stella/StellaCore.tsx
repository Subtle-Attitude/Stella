"use client";

import { motion } from "framer-motion";
import { StellaState, STELLA_EMOTIONS } from "@/types/stella";

interface StellaCoreProps {
  mode?: StellaState;
  size?: number;
  intensity?: number;          // 0.6 – 1.6 — controls overall energy
  showSpark?: boolean;         // context-driven spark
  className?: string;
}

export function StellaCore({
  mode = "orientation",
  size = 72,
  intensity = 1,
  showSpark = false,
  className = "",
}: StellaCoreProps) {
  const emotion = STELLA_EMOTIONS[mode];
  const activeSize = size * intensity;
  const breath = 1 + (emotion.breathScale - 1) * intensity;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: activeSize, height: activeSize }}
    >
      {/* Outer halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: activeSize * 1.15,
          height: activeSize * 1.15,
          background: `radial-gradient(circle, ${emotion.primaryColor}40 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{
          scale: [
            emotion.haloScale * 0.95 * intensity,
            emotion.haloScale * intensity,
            emotion.haloScale * 0.95 * intensity,
          ],
          opacity: [
            emotion.glowIntensity * 0.6,
            emotion.glowIntensity,
            emotion.glowIntensity * 0.6,
          ],
        }}
        transition={{
          duration: emotion.pulseDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Inner soft glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: activeSize * 0.9,
          height: activeSize * 0.9,
          background: `radial-gradient(circle, ${emotion.primaryColor}25 0%, transparent 60%)`,
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: emotion.pulseDuration * 0.85,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Core Stella image with breathing */}
      <motion.img
        src="/stella/Stella-Canon-v1.0.png"
        alt="Stella"
        className="relative z-10 select-none pointer-events-none"
        style={{
          width: activeSize * 0.72,
          height: activeSize * 0.72,
          filter: `brightness(${emotion.coreBrightness})`,
        }}
        animate={{
          scale: [1, breath, 1],
        }}
        transition={{
          duration: emotion.pulseDuration * 1.1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Contextual companion spark */}
      {showSpark && (
        <motion.div
          className="absolute z-20 rounded-full bg-white"
          style={{
            width: Math.max(6, activeSize * 0.08),
            height: Math.max(6, activeSize * 0.08),
            top: "36%",
            right: "30%",
            boxShadow: `0 0 16px 4px ${emotion.primaryColor}, 0 0 28px 8px rgba(255,255,255,0.7)`,
          }}
          animate={{
            opacity: [
              emotion.companionBrightness * 0.3,
              emotion.companionBrightness,
              emotion.companionBrightness * 0.3,
            ],
            scale: [0.7, 1.4, 0.7],
          }}
          transition={{
            duration: emotion.pulseDuration * 0.55,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}