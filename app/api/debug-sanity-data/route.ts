import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

export async function GET() {
  try {
    console.log("🔍 Debugging Sanity data...")

    // Get environment variables with validation
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b69czsvq"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

    // Create a fresh client with minimal config
    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2023-05-03",
      useCdn: false,
    })

    // Test basic connection
    const projectInfo = {
      projectId,
      dataset,
      apiVersion: "2023-05-03",
    }

    console.log("📋 Project config:", projectInfo)

    // Fetch articles with detailed category information
    const articles = await client.fetch(`*[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featured,
      sportTags,
      "category": category->{
        _id,
        title,
        name,
        slug
      },
      "author": author->{
        name,
        slug
      }
    }`)

    // Fetch posts with detailed information
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      featured
    }`)

    // Fetch all categories
    const categories = await client.fetch(`*[_type == "category"] {
      _id,
      title,
      name,
      slug
    }`)

    // Check for specific articles mentioned
    const specificSlugs = [
      "dan-brooke-named-chair-of-paralympicsgb",
      "patrick-anderson-the-unstoppable-force-of-wheelchair-basketball",
      "2025-ipc-classification-code-raising-the-standards-for-paralympic-sport",
    ]

    const specificArticles = await client.fetch(
      `*[_type == "article" && slug.current in $slugs] {
      _id,
      title,
      slug,
      "category": category->{
        _id,
        title,
        name,
        slug
      }
    }`,
      { slugs: specificSlugs },
    )

    return NextResponse.json({
      success: true,
      config: projectInfo,
      articlesCount: articles?.length || 0,
      postsCount: posts?.length || 0,
      categoriesCount: categories?.length || 0,
      articles: articles || [],
      posts: posts || [],
      categories: categories || [],
      specificArticles: specificArticles || [],
      message: "Sanity data debug successful",
    })
  } catch (error) {
    console.error("❌ Sanity debug error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        config: {
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b69czsvq",
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
        },
      },
      { status: 500 },
    )
  }
}
