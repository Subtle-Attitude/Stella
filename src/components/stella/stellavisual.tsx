"use client";

import Image from "next/image";

type StellaVisualProps = {
  mode?: string;
};

export function StellaVisual({ mode }: StellaVisualProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="scale-75 lg:scale-100 transition-transform">
        <Image
          src="/stella/Stella-Canon-v1.0.png"
          alt="Stella"
          width={320}
          height={320}
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}