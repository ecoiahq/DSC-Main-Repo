import { client, getThumbnailUrl } from "@/lib/sanity-image"
import type { Article, PodcastEpisode, VideoContent } from "@/lib/types"

// Transform Sanity post to Article format
function transformSanityPost(sanityPost: any): Article {
  const cleanSlug = sanityPost.slug?.current?.trim() || ""

  console.log("🔄 Transforming post:", {
    title: sanityPost.title,
    type: sanityPost._type,
    publishedAt: sanityPost.publishedAt,
    categoryRaw: sanityPost.category,
    categoryExpanded: sanityPost.categoryExpanded,
  })

  // Try multiple image field possibilities
  let imageSource = null
  let imageUrl = "/placeholder.svg"

  // Check for image fields
  if (sanityPost.featuredImage?.asset) {
    imageSource = sanityPost.featuredImage
  } else if (sanityPost.thumbnail?.asset) {
    imageSource = sanityPost.thumbnail
  } else if (sanityPost.image?.asset) {
    imageSource = sanityPost.image
  } else if (sanityPost.mainImage?.asset) {
    imageSource = sanityPost.mainImage
  }

  // Process image URL
  if (imageSource) {
    if (imageSource.asset?.url) {
      imageUrl = imageSource.asset.url
    } else {
      imageUrl = getThumbnailUrl(imageSource, 800, 450)
    }
  }

  // Extract excerpt
  let excerpt = "Read more about this story..."
  if (sanityPost.excerpt) {
    excerpt = sanityPost.excerpt
  } else if (sanityPost.body && Array.isArray(sanityPost.body)) {
    const textBlock = sanityPost.body.find(
      (block: any) => block._type === "block" && block.children && Array.isArray(block.children),
    )
    if (textBlock) {
      const textSpan = textBlock.children.find((child: any) => child._type === "span" && child.text)
      if (textSpan && textSpan.text) {
        excerpt = textSpan.text.substring(0, 200) + "..."
      }
    }
  }

  // Enhanced category handling - FIXED to properly read Sanity categories
  let categoryDisplay = "News"

  console.log("🏷️ Processing category:", {
    category: sanityPost.category,
    categoryExpanded: sanityPost.categoryExpanded,
  })

  // Method 1: Check categoryExpanded (from our enhanced query)
  if (sanityPost.categoryExpanded?.title) {
    categoryDisplay = sanityPost.categoryExpanded.title
    console.log("✅ Using categoryExpanded.title:", categoryDisplay)
  }
  // Method 2: Check categoryExpanded.name
  else if (sanityPost.categoryExpanded?.name) {
    categoryDisplay = sanityPost.categoryExpanded.name
    console.log("✅ Using categoryExpanded.name:", categoryDisplay)
  }
  // Method 3: Check direct category.title
  else if (sanityPost.category?.title) {
    categoryDisplay = sanityPost.category.title
    console.log("✅ Using category.title:", categoryDisplay)
  }
  // Method 4: Check direct category.name
  else if (sanityPost.category?.name) {
    categoryDisplay = sanityPost.category.name
    console.log("✅ Using category.name:", categoryDisplay)
  }
  // Method 5: Check if category is a string
  else if (typeof sanityPost.category === "string") {
    categoryDisplay = sanityPost.category
    console.log("✅ Using category string:", categoryDisplay)
  } else {
    console.log("⚠️ No category found, using default. Available data:", {
      category: sanityPost.category,
      categoryExpanded: sanityPost.categoryExpanded,
    })
  }

  // Enhanced sport tags handling
  let sportTags: string[] = []
  if (sanityPost.sportTags && Array.isArray(sanityPost.sportTags)) {
    sportTags = sanityPost.sportTags.filter((tag) => tag && typeof tag === "string")
  }

  // Enhanced date handling with validation
  let formattedDate = "Recently"
  try {
    if (sanityPost.publishedAt) {
      const publishDate = new Date(sanityPost.publishedAt)
      // Check if date is valid
      if (!isNaN(publishDate.getTime())) {
        formattedDate = publishDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        console.log("✅ Formatted date:", formattedDate, "from:", sanityPost.publishedAt)
      } else {
        console.warn("⚠️ Invalid date:", sanityPost.publishedAt)
      }
    } else {
      console.warn("⚠️ No publishedAt date for:", sanityPost.title)
    }
  } catch (error) {
    console.error("❌ Error formatting date:", error, "for:", sanityPost.publishedAt)
  }

  const result = {
    id: sanityPost._id,
    title: sanityPost.title,
    excerpt: excerpt,
    image: imageUrl,
    date: formattedDate,
    author: sanityPost.author?.name || "Admin",
    category: categoryDisplay,
    url: `/news/${cleanSlug}`,
    sportTags: sportTags,
  }

  console.log("✅ Final transformed article:", {
    title: result.title,
    category: result.category,
    date: result.date,
    url: result.url,
  })

  return result
}

// Fallback articles function
function getFallbackArticles(): Article[] {
  return [
    {
      id: "fallback-1",
      title: "Dan Brooke Named Chair of ParalympicsGB",
      excerpt:
        "Following an extensive recruitment process, Dan Brooke has been appointed as the new Chair of ParalympicsGB.",
      image: "/person-suit-green.png",
      date: "June 17, 2025",
      author: "Admin",
      category: "Wheelchair Basketball",
      url: "/news/dan-brooke-named-chair-of-paralympicsgb",
      sportTags: ["paralympicsgb"],
    },
    {
      id: "fallback-2",
      title: "Patrick Anderson: The Unstoppable Force of Wheelchair Basketball",
      excerpt:
        "Patrick Anderson has officially announced his retirement from wheelchair basketball, marking the end of an era.",
      image: "/wheelchair-basketball-action.png",
      date: "June 17, 2025",
      author: "Admin",
      category: "Wheelchair Basketball",
      url: "/news/patrick-anderson-the-unstoppable-force-of-wheelchair-basketball",
      sportTags: ["wheelchair-basketball"],
    },
    {
      id: "fallback-3",
      title: "2025 IPC Classification Code: Raising the Standards for Paralympic Sport",
      excerpt:
        "The International Paralympic Committee introduces new classification standards to ensure fair competition across all Paralympic sports.",
      image: "/paralympic-stadium.png",
      date: "June 16, 2025",
      author: "Admin",
      category: "IPC",
      url: "/news/2025-ipc-classification-code-raising-the-standards-for-paralympic-sport",
      sportTags: ["ipc", "classification"],
    },
  ]
}

// Enhanced query with multiple approaches to get categories
export const getFeaturedArticlesAsync = async (): Promise<Article[]> => {
  try {
    console.log("🔍 Fetching articles from Sanity with enhanced category detection...")

    // Try both article and post types with comprehensive category queries
    const query = `*[_type == "article" || _type == "post"] | order(publishedAt desc) [0...5] {
      _id,
      _type,
      title,
      slug,
      publishedAt,
      excerpt,
      author->{
        name,
        _id
      },
      category,
      "categoryExpanded": category->{
        _id,
        _type,
        title,
        name,
        slug,
        description
      },
      featuredImage {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
      },
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
      },
      mainImage {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
      },
      body,
      featured,
      sportTags
    }`

    const posts = await client.fetch(query)

    console.log("📊 Raw Sanity response:", {
      count: posts?.length || 0,
      posts: posts?.map((p: any) => ({
        title: p.title,
        type: p._type,
        publishedAt: p.publishedAt,
        category: p.category,
        categoryExpanded: p.categoryExpanded,
      })),
    })

    if (posts && posts.length > 0) {
      console.log("✅ Processing Sanity posts...")
      const transformedPosts = posts.map(transformSanityPost)
      return transformedPosts
    }
  } catch (error) {
    console.error("❌ Error fetching articles from Sanity:", error)
  }

  console.log("⚠️ Using fallback data...")
  return getFallbackArticles()
}

export const getLatestArticlesAsync = async (): Promise<Article[]> => {
  return getFeaturedArticlesAsync() // Use the same enhanced logic
}

export const getAllArticlesAsync = async (): Promise<Article[]> => {
  const featured = await getFeaturedArticlesAsync()
  const latest = await getLatestArticlesAsync()

  // Combine and deduplicate
  const allArticles = [...featured, ...latest]
  const uniqueArticles = allArticles.filter(
    (article, index, self) => index === self.findIndex((a) => a.id === article.id),
  )

  return uniqueArticles
}

// Keep existing functions unchanged
export const getPodcasts = (): PodcastEpisode[] => {
  return [
    {
      id: 1,
      title: "The Journey to Paralympic Gold",
      guest: "Emma Parker",
      description: "Emma shares her incredible journey from rehabilitation to winning Paralympic gold in Tokyo.",
      image: "/female-paralympic-athlete.png",
      duration: "42:15",
      date: "May 1, 2025",
      url: "/podcasts/journey-to-gold",
    },
  ]
}

export function getLiveEvents() {
  return [
    {
      id: 1,
      title: "Wheelchair Basketball: USA vs Canada - Semifinal",
      category: "Wheelchair Basketball",
      image: "/wheelchair-basketball-action.png",
      url: "/live/wheelchair-basketball-usa-canada-semifinal",
      viewers: "12,458",
    },
  ]
}

export function getUpcomingEvents() {
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

export const getContentGrid = (category: string): VideoContent[] => {
  return [
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
}

export const getSportsCategories = () => {
  return [
    { name: "Wheelchair Basketball", url: "/sports/wheelchair-basketball" },
    { name: "Para Athletics", url: "/sports/para-athletics" },
    { name: "Para Swimming", url: "/sports/para-swimming" },
    { name: "All Sports", url: "/sports" },
  ]
}
