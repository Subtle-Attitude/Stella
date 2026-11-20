"use client";

import StellaCore from "./StellaCore";

export function StellaVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="scale-75 lg:scale-100 transition-transform">
        <StellaCore />
      </div>
    </div>
  );
}