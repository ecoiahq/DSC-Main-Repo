import { revalidateTag } from "next/cache"

export async function POST(req: Request) {
  try {
    // Revalidate all article-related cache tags
    revalidateTag("articles")
    revalidateTag("featured-articles")
    revalidateTag("latest-articles")

    return Response.json({
      message: "Webhook received and cache revalidated successfully",
    })
  } catch (error) {
    console.error("Webhook error:", error)
    return Response.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
