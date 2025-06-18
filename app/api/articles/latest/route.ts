import { NextResponse } from "next/server"
import { getLatestArticlesAsync } from "@/lib/data-service"

export async function GET() {
  try {
    const articles = await getLatestArticlesAsync()
    return NextResponse.json(articles)
  } catch (error) {
    console.error("Error fetching latest articles:", error)
    return NextResponse.json({ error: "Failed to fetch latest articles" }, { status: 500 })
  }
}
