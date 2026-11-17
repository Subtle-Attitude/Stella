export interface VisualCanon {
  whiteCore: boolean
  iridescentRing: boolean
  companionSpark: boolean
  blackBackground: boolean
}

export interface StellaCanon {
  name: string
  role: string
  coreTruth: string
  pillars: readonly string[]
  visualCanon: VisualCanon
}

export type CanonUpdate = Partial<StellaCanon>