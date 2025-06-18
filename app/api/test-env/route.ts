import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "NOT_SET",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "NOT_SET",
    configured: !!(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET),
  })
}
