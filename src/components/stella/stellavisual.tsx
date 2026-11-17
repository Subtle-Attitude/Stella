"use client";

import { StellaCore } from "@/components/stella/StellaCore";
import type { StellaState } from "@/types/stella";

interface StellaVisualProps {
  mode?: StellaState;
}

export function StellaVisual({ mode = "orientation" }: StellaVisualProps) {
  return (
    <div className="flex flex-col items-center">
      <StellaCore
        mode={mode}
        size={380}
        intensity={1}
        showSpark={false}
      />
    </div>
  );
}