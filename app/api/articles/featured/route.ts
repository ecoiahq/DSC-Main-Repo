import { NextResponse } from "next/server"
import { getFeaturedArticlesAsync } from "@/lib/data-service"

export async function GET() {
  try {
    const articles = await getFeaturedArticlesAsync()
    return NextResponse.json(articles)
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return NextResponse.json({ error: "Failed to fetch featured articles" }, { status: 500 })
  }
}
