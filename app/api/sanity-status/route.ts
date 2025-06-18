import { NextResponse } from "next/server"
import { sanityConfigured, client } from "@/lib/sanity"

export async function GET() {
  const status = {
    timestamp: new Date().toISOString(),
    environment: {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "NOT_SET",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "NOT_SET",
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "NOT_SET",
    },
    sanityConfigured,
    clientExists: !!client,
  }

  if (sanityConfigured && client) {
    try {
      // Try to fetch a simple query
      const testQuery = `*[_type == "article"][0...1]`
      const result = await client.fetch(testQuery)
      status.testQuery = {
        success: true,
        resultCount: result?.length || 0,
        sampleData: result?.[0] || null,
      }
    } catch (error) {
      status.testQuery = {
        success: false,
        error: error.message,
      }
    }
  }

  return NextResponse.json(status, { status: 200 })
}
