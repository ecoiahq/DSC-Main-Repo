import { NextResponse } from "next/server"
import { getAllArticlesAsync } from "@/lib/data-service"

export async function GET() {
  try {
    const articles = await getAllArticlesAsync()
    return NextResponse.json(articles)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}
