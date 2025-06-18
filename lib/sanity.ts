import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "b69czsvq"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// Validate and clean the API version
function getValidApiVersion(): string {
  const envApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

  // If no environment variable, use default
  if (!envApiVersion) {
    console.log("No SANITY_API_VERSION found, using default: 2023-05-03")
    return "2023-05-03"
  }

  // Clean the environment variable (remove whitespace)
  const cleanVersion = envApiVersion.trim()

  // If it looks like a token (long string with mixed characters), use default
  if (
    cleanVersion.length > 20 ||
    cleanVersion.includes("_") ||
    cleanVersion.includes("sk") ||
    cleanVersion.includes("Bearer")
  ) {
    console.warn(`⚠️ SANITY_API_VERSION appears to be a token instead of an API version!`)
    console.warn(`Found: "${cleanVersion.substring(0, 20)}..."`)
    console.warn(`Expected format: "2023-05-03" or "1"`)
    console.warn(`Using default: 2023-05-03`)
    return "2023-05-03"
  }

  // Check if it's the legacy version "1"
  if (cleanVersion === "1") {
    console.log("Using legacy API version: 1")
    return "1"
  }

  // Check if it matches YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (dateRegex.test(cleanVersion)) {
    console.log(`Using API version: ${cleanVersion}`)
    return cleanVersion
  }

  // If invalid format, use default
  console.warn(`⚠️ Invalid Sanity API version format: "${cleanVersion}"`)
  console.warn(`Expected format: "2023-05-03" or "1"`)
  console.warn(`Using default: 2023-05-03`)
  return "2023-05-03"
}

const apiVersion = getValidApiVersion()

export const sanityConfigured = !!(projectId && dataset)

console.log("🔧 Sanity Configuration Status:")
console.log("  Project ID:", projectId ? `✓ ${projectId}` : "✗ Missing")
console.log("  Dataset:", dataset)
console.log("  API Version:", apiVersion)
console.log("  Configured:", sanityConfigured ? "✅ Yes" : "❌ No")

// Create client configuration
const config = {
  projectId: projectId || "",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published" as const,
}

// Create client (now we have a valid projectId)
export const client = createClient(config)

// Create client for server-side operations (with token if needed)
export const serverClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  if (!builder || !source) {
    return null
  }

  try {
    return builder.image(source)
  } catch (error) {
    console.error("urlFor error:", error)
    return null
  }
}

// GROQ Queries
export const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url,
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
}`

export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url,
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
}`

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url,
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
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url,
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
}`

// GROQ queries for Articles (backward compatibility)
export const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage {
    asset->{
      _id,
      url,
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
  publishedAt,
  featured,
  sportTags,
  author->{
    name,
    slug
  },
  category->{
    title,
    slug
  }
}`

export const FEATURED_ARTICLES_QUERY = `*[_type == "article" && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage {
    asset->{
      _id,
      url,
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
  publishedAt,
  sportTags,
  author->{
    name,
    slug
  },
  category->{
    title,
    slug
  }
}`

export const LATEST_ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage {
    asset->{
      _id,
      url,
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
  publishedAt,
  sportTags,
  author->{
    name,
    slug
  },
  category->{
    title,
    slug
  }
}`

export const ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  featuredImage {
    asset->{
      _id,
      url,
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
  publishedAt,
  sportTags,
  author->{
    name,
    slug,
    image,
    bio
  },
  category->{
    title,
    slug
  }
}`

// Combined queries that check both post and article types
export const COMBINED_FEATURED_QUERY = `*[(_type == "post" || _type == "article") && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  featured,
  "excerpt": select(_type == "post" => body[0].children[0].text[0...150], excerpt),
  "featuredImage": select(_type == "post" => image, featuredImage) {
    asset->{
      _id,
      url,
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
  "author": select(_type == "article" => author->{name, slug}, null),
  "category": select(_type == "article" => category->{title, slug}, null),
  "sportTags": select(_type == "article" => sportTags, [])
}`

export const COMBINED_LATEST_QUERY = `*[_type == "post" || _type == "article"] | order(publishedAt desc) [0...6] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  featured,
  "excerpt": select(_type == "post" => body[0].children[0].text[0...150], excerpt),
  "featuredImage": select(_type == "post" => image, featuredImage) {
    asset->{
      _id,
      url,
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
  "author": select(_type == "article" => author->{name, slug}, null),
  "category": select(_type == "article" => category->{title, slug}, null),
  "sportTags": select(_type == "article" => sportTags, [])
}`

// Get all slugs for static generation
export const ALL_SLUGS_QUERY = `*[_type == "post" || _type == "article"] {
  "slug": slug.current,
  _type
}`

// Cached fetch functions
export async function fetchArticles() {
  try {
    const result = await client.fetch(
      COMBINED_LATEST_QUERY,
      {},
      {
        cache: "force-cache",
        next: { tags: ["articles"], revalidate: 60 },
      },
    )
    return result
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export async function fetchFeaturedArticles() {
  try {
    const result = await client.fetch(
      COMBINED_FEATURED_QUERY,
      {},
      {
        cache: "force-cache",
        next: { tags: ["featured-articles"], revalidate: 60 },
      },
    )
    return result
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return []
  }
}

export async function fetchLatestArticles() {
  try {
    const result = await client.fetch(
      COMBINED_LATEST_QUERY,
      {},
      {
        cache: "force-cache",
        next: { tags: ["latest-articles"], revalidate: 60 },
      },
    )
    return result
  } catch (error) {
    console.error("Error fetching latest articles:", error)
    return []
  }
}

// Fetch all slugs for dynamic routing
export async function fetchAllSlugs() {
  try {
    const slugs = await client.fetch(ALL_SLUGS_QUERY)
    return slugs
      .map((item: any) => ({
        ...item,
        slug: item.slug?.trim() || "",
      }))
      .filter((item: any) => item.slug)
  } catch (error) {
    console.error("Error fetching slugs:", error)
    return []
  }
}

// Debug function to test Sanity connection
export async function testSanityConnection() {
  try {
    const result = await client.fetch(`*[_type == "post"][0...1] {
      _id,
      title,
      slug,
      image {
        asset->{
          _id,
          url
        }
      }
    }`)

    return { success: true, data: result }
  } catch (error) {
    console.error("Sanity connection test failed:", error)
    return { success: false, error }
  }
}
