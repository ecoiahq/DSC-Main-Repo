import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  const debug = {
    timestamp: new Date().toISOString(),
    sanityConfigured,
    tests: [],
  }

  try {
    if (client) {
      // Get raw post data with ALL image fields
      const rawPosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...3] {
        _id,
        title,
        slug,
        publishedAt,
        image,
        "imageAsset": image.asset->,
        "imageAssetUrl": image.asset->url,
        "imageAssetRef": image.asset->_ref,
        body
      }`)

      debug.tests.push({
        name: "Raw Sanity Data",
        status: "📊 DATA",
        result: `Found ${rawPosts.length} posts`,
        data: rawPosts,
      })

      // Test each post's image data
      rawPosts.forEach((post: any, index: number) => {
        debug.tests.push({
          name: `Post ${index + 1}: ${post.title}`,
          status: post.image ? "✅ HAS IMAGE" : "❌ NO IMAGE",
          result: post.image ? "Image field exists" : "Image field is null/empty",
          data: {
            imageField: post.image,
            imageAsset: post.imageAsset,
            imageAssetUrl: post.imageAssetUrl,
            imageAssetRef: post.imageAssetRef,
          },
        })

        // Try to build URL if we have image data
        if (post.image?.asset) {
          let builtUrl = null
          const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
          const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

          if (post.imageAssetUrl) {
            builtUrl = post.imageAssetUrl
          } else if (post.image.asset._ref) {
            const assetRef = post.image.asset._ref
            if (assetRef.startsWith("image-")) {
              const match = assetRef.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)
              if (match) {
                const [, id, dimensions, format] = match
                builtUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
              }
            }
          }

          debug.tests.push({
            name: `URL Generation for Post ${index + 1}`,
            status: builtUrl ? "✅ SUCCESS" : "❌ FAILED",
            result: builtUrl || "Could not generate URL",
            data: {
              projectId: projectId ? "SET" : "MISSING",
              dataset,
              assetRef: post.image.asset._ref,
              directUrl: post.imageAssetUrl,
              builtUrl,
            },
          })
        }
      })

      // Test if we can fetch image assets directly
      const imageAssets = await client.fetch(`*[_type == "sanity.imageAsset"] [0...5] {
        _id,
        url,
        originalFilename,
        metadata {
          dimensions
        }
      }`)

      debug.tests.push({
        name: "Image Assets in Sanity",
        status: imageAssets.length > 0 ? "✅ FOUND" : "❌ NONE",
        result: `Found ${imageAssets.length} image assets`,
        data: imageAssets,
      })
    } else {
      debug.tests.push({
        name: "Sanity Client",
        status: "❌ FAILED",
        result: "Client not configured",
        data: null,
      })
    }
  } catch (error) {
    debug.tests.push({
      name: "Debug Error",
      status: "❌ ERROR",
      result: error.message,
      data: { error },
    })
  }

  return NextResponse.json(debug, { status: 200 })
}
