# Stella Domain Model

## Ownership
Single-owner system. Primary user: Kristin Wood / Subtle Attitude LLC.
No tenant identifiers, no public registration, no multi-user concepts.

## Core Entity: StellaCanon
- `name` — fixed identity
- `role` — Atlas Spark
- `coreTruth` — central statement
- `pillars` — ordered list of active principles
- `visualCanon` — boolean flags controlling visual language

## Pillars (from Canon v1.0)
orientation, reflection, dreamWeaver, envision, alignment, wonder, transformation

## Visual Canon Flags
- whiteCore
- iridescentRing
- companionSpark
- blackBackground

## Invariants
- Canon is validated with Zod on every read and write.
- Persistence lives in `data/canon.json` (seeded from `docs/canon/stella-canon.json`).
- All access goes through `getCanon()` / `updateCanon()`.