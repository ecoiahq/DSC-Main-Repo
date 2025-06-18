import { NextResponse } from "next/server"
import { client, urlFor, getThumbnailUrl } from "@/lib/sanity-image"

export async function GET() {
  try {
    // Test Sanity connection and fetch posts with thumbnail data
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      thumbnail,
      image,
      "thumbnailDebug": {
        "hasThumbnail": defined(thumbnail),
        "hasImage": defined(image),
        "thumbnailAsset": thumbnail.asset,
        "imageAsset": image.asset
      }
    }`)

    const results = posts.map((post: any) => {
      let thumbnailUrl = null
      let imageUrl = null
      let urlForTest = null

      try {
        // Test thumbnail URL generation
        if (post.thumbnail) {
          thumbnailUrl = getThumbnailUrl(post.thumbnail, 320, 180)
        }

        // Test image URL generation
        if (post.image) {
          imageUrl = getThumbnailUrl(post.image, 320, 180)
        }

        // Test direct urlFor
        if (post.thumbnail || post.image) {
          urlForTest = urlFor(post.thumbnail || post.image)
            .width(320)
            .height(180)
            .url()
        }
      } catch (error) {
        console.error("URL generation error:", error)
      }

      return {
        id: post._id,
        title: post.title,
        thumbnailDebug: post.thumbnailDebug,
        generatedUrls: {
          thumbnailUrl,
          imageUrl,
          urlForTest,
        },
        rawData: {
          thumbnail: post.thumbnail,
          image: post.image,
        },
      }
    })

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      sanityConnected: true,
      postsFound: posts.length,
      environmentCheck: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "✓ Set" : "✗ Missing",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      },
      results,
    })
  } catch (error) {
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      error: error.message,
      sanityConnected: false,
    })
  }
}
