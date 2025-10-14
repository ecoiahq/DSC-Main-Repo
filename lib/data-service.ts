import { client } from "./sanity"
import type { Article } from "./types"

// Helper function to format dates
function formatDate(dateString: string | Date | null | undefined): string {
  console.log("📅 formatDate - Input:", dateString, "Type:", typeof dateString)

  if (!dateString) {
    console.log("📅 formatDate - No date provided, using current date")
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.log("📅 formatDate - Invalid date, using current date")
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    console.log("📅 formatDate - Formatted:", formatted)
    return formatted
  } catch (error) {
    console.error("📅 formatDate - Error formatting date:", error)
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}

// Helper function to normalize category
function normalizeCategory(category: any): string {
  console.log("🏷️ Category DEBUG - Raw category:", JSON.stringify(category, null, 2))

  if (!category) {
    console.log("🏷️ Category DEBUG - No category found, defaulting to 'News'")
    return "News"
  }

  // Handle different category structures
  if (typeof category === "string") {
    console.log("🏷️ Category DEBUG - Category is string:", category)
    return category
  }

  if (category.title) {
    console.log("🏷️ Category DEBUG - Using category.title:", category.title)
    return category.title
  }

  if (category.name) {
    console.log("🏷️ Category DEBUG - Using category.name:", category.name)
    return category.name
  }

  console.log("🏷️ Category DEBUG - Unknown category structure, defaulting to 'News'")
  return "News"
}

// Fetch featured articles
export async function getFeaturedArticlesAsync(): Promise<Article[]> {
  try {
    console.log("🔍 Fetching featured articles from Sanity...")

    const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) [0...10] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      _createdAt,
      "author": author->name,
      mainImage,
      "category": category,
      "categoryExpanded": category->{
        title,
        slug,
        description
      }
    }`

    const posts = await client.fetch(query)
    console.log("✅ Sanity query returned:", posts?.length || 0, "posts")

    if (!posts || posts.length === 0) {
      console.log("⚠️ No posts found, returning fallback articles")
      return getFallbackArticles()
    }

    const articles: Article[] = posts.map((post: any, index: number) => {
      console.log(`\n📰 Processing article ${index + 1}:`, post.title)
      console.log("   Raw publishedAt:", post.publishedAt)
      console.log("   Raw _createdAt:", post._createdAt)
      console.log("   Raw category:", post.category)
      console.log("   Raw categoryExpanded:", post.categoryExpanded)

      const dateToUse = post.publishedAt || post._createdAt
      const formattedDate = formatDate(dateToUse)

      console.log("   Using date:", dateToUse)
      console.log("   Formatted date:", formattedDate)

      const category = normalizeCategory(post.categoryExpanded || post.category)
      console.log("   Final category:", category)

      return {
        id: post._id,
        title: post.title || "Untitled Article",
        excerpt: post.excerpt || "",
        date: formattedDate,
        category: category,
        author: post.author || "DSC Team",
        image: post.mainImage?.asset?._ref
          ? `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${post.mainImage.asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png")}`
          : "/placeholder.svg",
        url: `/news/${post.slug.current}`,
      }
    })

    console.log("✅ Successfully processed", articles.length, "articles")
    console.log(
      "📅 Article dates:",
      articles.map((a) => ({ title: a.title, date: a.date })),
    )

    return articles
  } catch (error) {
    console.error("❌ Error fetching featured articles:", error)
    return getFallbackArticles()
  }
}

// Fetch latest articles
export async function getLatestArticlesAsync(): Promise<Article[]> {
  // For now, return the same as featured articles
  return getFeaturedArticlesAsync()
}

// Fetch all articles
export async function getAllArticlesAsync(): Promise<Article[]> {
  return getFeaturedArticlesAsync()
}

// Fallback articles if Sanity query fails
function getFallbackArticles(): Article[] {
  return [
    {
      id: "1",
      title: "World Para Swimming Championships 2024",
      excerpt: "Record-breaking performances highlight the championships in Manchester",
      date: formatDate(new Date().toISOString()),
      category: "Para Swimming",
      author: "Sarah Johnson",
      image: "/para-swimming-competition.png",
      url: "/news/world-para-swimming-championships-2024",
    },
    {
      id: "2",
      title: "Wheelchair Basketball: USA Dominates Semi-Finals",
      excerpt: "Team USA secures spot in finals with commanding performance",
      date: formatDate(new Date(Date.now() - 86400000).toISOString()),
      category: "Wheelchair Basketball",
      author: "Michael Chen",
      image: "/wheelchair-basketball-action.png",
      url: "/news/usa-wheelchair-basketball-semifinals",
    },
    {
      id: "3",
      title: "Para Athletics: New Records Set in Tokyo",
      excerpt: "Athletes push boundaries at the International Grand Prix",
      date: formatDate(new Date(Date.now() - 172800000).toISOString()),
      category: "Para Athletics",
      author: "Emma Wilson",
      image: "/para-athletics-track.png",
      url: "/news/para-athletics-records-tokyo",
    },
  ]
}
