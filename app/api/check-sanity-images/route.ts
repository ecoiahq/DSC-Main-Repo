import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  if (!sanityConfigured || !client) {
    return NextResponse.json({ error: "Sanity not configured" })
  }

  try {
    // Check posts with detailed image info
    const posts = await client.fetch(`*[_type == "post"] {
      _id,
      title,
      slug,
      image {
        asset->{
          _id,
          url,
          originalFilename,
          size,
          metadata {
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    }`)

    // Check if any images exist
    const postsWithImages = posts.filter((post) => post.image?.asset?.url)
    const postsWithoutImages = posts.filter((post) => !post.image?.asset?.url)

    return NextResponse.json({
      success: true,
      summary: {
        totalPosts: posts.length,
        postsWithImages: postsWithImages.length,
        postsWithoutImages: postsWithoutImages.length,
      },
      postsWithImages: postsWithImages.map((post) => ({
        title: post.title,
        imageUrl: post.image?.asset?.url,
        imageSize: post.image?.asset?.size,
        imageDimensions: post.image?.asset?.metadata?.dimensions,
        originalFilename: post.image?.asset?.originalFilename,
      })),
      postsWithoutImages: postsWithoutImages.map((post) => ({
        title: post.title,
        slug: post.slug?.current,
      })),
    })
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch posts",
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
