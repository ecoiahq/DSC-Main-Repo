import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  try {
    console.log("🔍 Starting image debug...")

    // Check environment variables
    const envCheck = {
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "MISSING",
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || "MISSING",
      NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "MISSING",
      SANITY_API_TOKEN: process.env.SANITY_API_TOKEN ? "SET" : "MISSING",
      sanityConfigured,
    }

    console.log("Environment check:", envCheck)

    if (!sanityConfigured || !client) {
      return NextResponse.json({
        success: false,
        error: "Sanity not configured",
        envCheck,
      })
    }

    // Fetch posts with detailed image data
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      image {
        asset->{
          _id,
          url,
          _ref,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt,
        hotspot,
        crop
      },
      body,
      featured
    }`)

    console.log("Raw posts data:", JSON.stringify(posts, null, 2))

    // Process each post's image
    const processedPosts = posts.map((post: any) => {
      const imageAnalysis = {
        title: post.title,
        hasImage: !!post.image,
        imageStructure: post.image ? Object.keys(post.image) : [],
        assetData: post.image?.asset || null,
        directUrl: post.image?.asset?.url || null,
        assetRef: post.image?.asset?._ref || null,
      }

      // Try to generate image URL
      let generatedUrl = null
      if (post.image?.asset?.url) {
        generatedUrl = post.image.asset.url
      } else if (post.image?.asset?._ref) {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
        const assetId = post.image.asset._ref
        const match = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)
        if (match && projectId && dataset) {
          const [, id, dimensions, format] = match
          generatedUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
        }
      }

      return {
        ...imageAnalysis,
        generatedUrl,
      }
    })

    return NextResponse.json({
      success: true,
      envCheck,
      totalPosts: posts.length,
      processedPosts,
      rawPosts: posts,
    })
  } catch (error) {
    console.error("Debug error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
