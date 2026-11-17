import { NextResponse } from "next/server"
import { getCanon } from "@/lib/canon-service"

// Internal only — Stella itself is the sole consumer
export async function GET() {
  const canon = getCanon()
  return NextResponse.json(canon)
}