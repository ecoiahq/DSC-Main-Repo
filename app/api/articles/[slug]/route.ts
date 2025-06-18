import { NextResponse } from "next/server"
import { client, sanityConfigured, ARTICLE_BY_SLUG_QUERY } from "@/lib/sanity"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    if (sanityConfigured && client) {
      const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
      if (article) {
        return NextResponse.json(article)
      }
    }

    return NextResponse.json({ error: "Article not found" }, { status: 404 })
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}
