import { NextResponse } from "next/server"
import { client } from "@/lib/sanity-image"

export async function GET() {
  try {
    console.log("🔍 Testing Sanity connection...")

    // Test basic connection
    const projectInfo = {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: "2023-05-03",
      configured: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    }

    console.log("📋 Project config:", projectInfo)

    if (!client) {
      return NextResponse.json({
        success: false,
        config: projectInfo,
        message: "Sanity client not configured - missing NEXT_PUBLIC_SANITY_PROJECT_ID",
      })
    }

    // Test fetching posts
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...2] {
      _id,
      title,
      slug,
      publishedAt,
      thumbnail {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
      },
      image {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
      }
    }`)

    console.log("📊 Raw posts from Sanity:", JSON.stringify(posts, null, 2))

    return NextResponse.json({
      success: true,
      config: projectInfo,
      postsCount: posts?.length || 0,
      posts: posts || [],
      message: "Sanity connection successful",
    })
  } catch (error) {
    console.error("❌ Sanity connection error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        config: {
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
          configured: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        },
      },
      { status: 500 },
    )
  }
}
