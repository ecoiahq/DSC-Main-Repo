import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

export async function GET() {
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

  try {
    // Get posts with the simplest possible query
    const posts = await client.fetch(`*[_type == "post"] {
      _id,
      title,
      image
    }`)

    // For each post, try to get the image URL in the most direct way
    const results = []
    for (const post of posts) {
      let imageUrl = null

      if (post.image?.asset?._ref) {
        // Build URL directly from reference
        const ref = post.image.asset._ref
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b69czsvq"
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

        if (ref.startsWith("image-")) {
          const [, id, dimensions, format] = ref.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/) || []
          if (id && dimensions && format) {
            imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
          }
        }
      }

      results.push({
        title: post.title,
        imageRef: post.image?.asset?._ref,
        generatedUrl: imageUrl,
        rawImage: post.image,
      })
    }

    return NextResponse.json({
      success: true,
      posts: results,
      env: {
        projectId: projectId ? projectId : "MISSING",
        dataset,
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      env: {
        projectId: projectId ? projectId : "MISSING",
        dataset,
      },
    })
  }
}
