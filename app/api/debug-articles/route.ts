import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  try {
    if (!sanityConfigured || !client) {
      return NextResponse.json({
        error: "Sanity not configured",
        configured: false,
      })
    }

    // Fetch all posts and articles with their slugs
    const posts = await client.fetch(`*[_type == "post"] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _type
    }`)

    const articles = await client.fetch(`*[_type == "article"] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      _type
    }`)

    const allContent = [...posts, ...articles].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )

    return NextResponse.json({
      success: true,
      totalPosts: posts.length,
      totalArticles: articles.length,
      totalContent: allContent.length,
      posts,
      articles,
      allContent,
      availableSlugs: allContent.map((item) => item.slug).filter(Boolean),
    })
  } catch (error) {
    console.error("Error fetching debug info:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch debug info",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
