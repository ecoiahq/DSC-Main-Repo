// Data service for Disability Sports Channel
import { client } from "./sanity"
import type { Article } from "./types"

// Type definitions
export interface PodcastEpisode {
  id: number
  title: string
  guest: string
  description: string
  image: string
  duration: string
  date: string
  url: string
}

export interface VideoContent {
  id: number
  title: string
  description: string
  image: string
  category: string
  duration: string
  url: string
  views: string
  date: string
}

// Format dates helper
function formatDate(dateString: string | Date | null | undefined): string {
  if (!dateString) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  try {
    const date = typeof dateString === "string" ? new Date(dateString) : dateString
    if (isNaN(date.getTime())) {
      return new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}

// Normalize category
function normalizeCategory(category: any): string {
  if (!category) return "News"
  if (typeof category === "string") return category
  if (category.title) return category.title
  if (category.name) return category.name
  return "News"
}

// Get featured articles
export async function getFeaturedArticlesAsync(): Promise<Article[]> {
  try {
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
    if (!posts || posts.length === 0) {
      return getFallbackArticles()
    }

    const articles: Article[] = posts.map((post: any) => {
      const dateToUse = post.publishedAt || post._createdAt
      const formattedDate = formatDate(dateToUse)
      const category = normalizeCategory(post.categoryExpanded || post.category)

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

    return articles
  } catch (error) {
    console.error("Error fetching articles:", error)
    return getFallbackArticles()
  }
}

export async function getLatestArticlesAsync(): Promise<Article[]> {
  return getFeaturedArticlesAsync()
}

export async function getAllArticlesAsync(): Promise<Article[]> {
  return getFeaturedArticlesAsync()
}

function getFallbackArticles(): Article[] {
  return [
    {
      id: "1",
      title: "World Para Swimming Championships 2024",
      excerpt: "Record-breaking performances highlight the championships",
      date: formatDate(new Date().toISOString()),
      category: "Para Swimming",
      author: "Sarah Johnson",
      image: "/para-swimming-competition.png",
      url: "/news/world-para-swimming-championships-2024",
    },
  ]
}

// EXPORTED FUNCTIONS
export async function getPodcasts(): Promise<PodcastEpisode[]> {
  return [
    {
      id: 1,
      title: "The Journey to Paralympic Gold",
      guest: "Emma Parker",
      description: "Emma shares her incredible journey from rehabilitation to winning Paralympic gold.",
      image: "/female-paralympic-athlete.png",
      duration: "42:15",
      date: "May 1, 2025",
      url: "/podcasts/journey-to-gold",
    },
  ]
}

export async function getLiveEvents() {
  return [
    {
      id: 1,
      title: "Wheelchair Basketball: USA vs Canada - Semifinal",
      category: "Wheelchair Basketball",
      image: "/wheelchair-basketball-action.png",
      url: "/live/wheelchair-basketball-usa-canada-semifinal",
      viewers: "12,458",
      isLive: true,
    },
  ]
}

export async function getUpcomingEvents() {
  return [
    {
      id: 1,
      title: "Para Swimming World Series - London",
      category: "Para Swimming",
      image: "/para-swimming-competition.png",
      time: "Tomorrow, 14:00 BST",
      date: "May 5, 2025",
      url: "/live/para-swimming-world-series-london",
      viewers: "Starts in 22 hours",
    },
  ]
}

export async function getContentGrid(category?: string): Promise<VideoContent[]> {
  const allContent: VideoContent[] = [
    {
      id: 1,
      title: "Para Athletics World Championships Highlights",
      description: "Best moments from the championships",
      image: "/para-athletics-track.png",
      category: "Athletics",
      duration: "15:30",
      url: "/watch/para-athletics-highlights",
      views: "125K",
      date: "2 days ago",
    },
  ]

  if (category && category.toLowerCase() !== "all") {
    return allContent.filter((content) => content.category.toLowerCase().includes(category.toLowerCase()))
  }

  return allContent
}

export function getSportsCategories() {
  return [
    { name: "Wheelchair Basketball", url: "/sports/wheelchair-basketball" },
    { name: "Para Athletics", url: "/sports/para-athletics" },
    { name: "Para Swimming", url: "/sports/para-swimming" },
    { name: "All Sports", url: "/sports" },
  ]
}
