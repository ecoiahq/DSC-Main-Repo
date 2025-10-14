// Data service for fetching content
import { client } from "./sanity"
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Types
export interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  url: string
}

export interface PodcastEpisode {
  id: string
  title: string
  description: string
  duration: string
  date: string
  audioUrl: string
  image: string
}

export interface VideoContent {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  category: string
}

export interface LiveEvent {
  id: string
  title: string
  description: string
  sport: string
  startTime: string
  status: "live" | "upcoming" | "ended"
  thumbnail: string
  streamUrl?: string
}

// Format date helper
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    console.log("📅 formatDate - No date provided, using current date")
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  console.log(`📅 formatDate - Input: ${dateString} Type: ${typeof dateString}`)

  try {
    const date = new Date(dateString)

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

    console.log(`📅 formatDate - Formatted: ${formatted}`)
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

// Fetch featured articles
export async function getFeaturedArticlesAsync(): Promise<Article[]> {
  console.log("🔍 Fetching featured articles from Sanity...")

  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(_createdAt desc) [0...10] {
        _id,
        title,
        excerpt,
        body,
        slug,
        mainImage,
        publishedAt,
        _createdAt,
        "category": category->title,
        "categoryExpanded": category->{title, slug}
      }
    `)

    console.log(`✅ Sanity query returned: ${posts?.length || 0} posts`)

    if (!posts || posts.length === 0) {
      console.log("⚠️ No posts found in Sanity")
      return []
    }

    const articles: Article[] = posts.map((post: any, index: number) => {
      console.log(`\n📰 Processing article ${index + 1}: ${post.title}`)
      console.log("   Raw publishedAt:", post.publishedAt)
      console.log("   Raw _createdAt:", post._createdAt)
      console.log("   Raw category:", post.category)
      console.log("   Raw categoryExpanded:", post.categoryExpanded)

      const dateToUse = post.publishedAt || post._createdAt
      console.log("   Using date:", dateToUse)

      const formattedDate = formatDate(dateToUse)
      console.log("   Formatted date:", formattedDate)

      console.log("🏷️ Category DEBUG - Raw category:", post.category)
      const category = post.category || "News"
      console.log(`🏷️ Category DEBUG - ${post.category ? "Using category" : "No category found, defaulting to 'News'"}`)
      console.log("   Final category:", category)

      let imageUrl = "/placeholder.svg"
      if (post.mainImage) {
        try {
          imageUrl = urlFor(post.mainImage).width(800).height(600).url()
        } catch (error) {
          console.error("   Error generating image URL:", error)
        }
      }

      return {
        id: post._id,
        title: post.title,
        excerpt: post.excerpt || "",
        image: imageUrl,
        category: category,
        date: formattedDate,
        url: `/news/${post.slug?.current || post._id}`,
      }
    })

    console.log(`✅ Successfully processed ${articles.length} articles`)
    console.log(
      "📅 Article dates:",
      articles.map((a) => ({ title: a.title, date: a.date })),
    )

    return articles
  } catch (error) {
    console.error("❌ Error fetching articles:", error)
    return []
  }
}

// Fetch latest articles
export async function getLatestArticlesAsync(): Promise<Article[]> {
  return getFeaturedArticlesAsync()
}

// Fetch all articles (alias for featured)
export async function getAllArticlesAsync(): Promise<Article[]> {
  return getFeaturedArticlesAsync()
}

// Fetch podcasts
export async function getPodcasts(): Promise<PodcastEpisode[]> {
  // Mock podcast data
  return [
    {
      id: "1",
      title: "The Future of Para Sports",
      description: "A deep dive into the evolution of Paralympic sports",
      duration: "45:30",
      date: "March 15, 2024",
      audioUrl: "/podcasts/future-para-sports.mp3",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: "2",
      title: "Athlete Spotlight: Rising Stars",
      description: "Conversations with up-and-coming Paralympic athletes",
      duration: "38:15",
      date: "March 8, 2024",
      audioUrl: "/podcasts/rising-stars.mp3",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]
}

// Fetch live events
export async function getLiveEvents(): Promise<LiveEvent[]> {
  // Mock live events data
  return [
    {
      id: "1",
      title: "Wheelchair Basketball Championship",
      description: "USA vs Canada - Semifinal match",
      sport: "Wheelchair Basketball",
      startTime: new Date().toISOString(),
      status: "live",
      thumbnail: "/placeholder.svg?height=400&width=600",
      streamUrl: "https://example.com/stream",
    },
  ]
}

// Fetch upcoming events
export async function getUpcomingEvents(): Promise<LiveEvent[]> {
  // Mock upcoming events data
  return [
    {
      id: "2",
      title: "Para Swimming World Cup",
      description: "Finals - Day 3",
      sport: "Para Swimming",
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: "upcoming",
      thumbnail: "/placeholder.svg?height=400&width=600",
    },
  ]
}

// Fetch content grid
export async function getContentGrid(): Promise<VideoContent[]> {
  // Mock video content data
  return [
    {
      id: "1",
      title: "Highlights: Basketball Finals",
      description: "Best moments from the championship game",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "5:30",
      category: "Highlights",
    },
    {
      id: "2",
      title: "Training Tips: Para Athletics",
      description: "Expert advice for aspiring athletes",
      thumbnail: "/placeholder.svg?height=300&width=500",
      duration: "12:45",
      category: "Training",
    },
  ]
}
