// Client-side API functions
export async function fetchArticlesFromAPI() {
  try {
    const response = await fetch("/api/articles")
    if (!response.ok) throw new Error("Failed to fetch articles")
    return await response.json()
  } catch (error) {
    console.error("Error fetching articles from API:", error)
    return []
  }
}

export async function fetchFeaturedArticlesFromAPI() {
  try {
    const response = await fetch("/api/articles/featured")
    if (!response.ok) throw new Error("Failed to fetch featured articles")
    return await response.json()
  } catch (error) {
    console.error("Error fetching featured articles from API:", error)
    return []
  }
}

export async function fetchLatestArticlesFromAPI() {
  try {
    const response = await fetch("/api/articles/latest")
    if (!response.ok) throw new Error("Failed to fetch latest articles")
    return await response.json()
  } catch (error) {
    console.error("Error fetching latest articles from API:", error)
    return []
  }
}

export async function fetchArticleBySlugFromAPI(slug: string) {
  try {
    const response = await fetch(`/api/articles/${slug}`)
    if (!response.ok) throw new Error("Failed to fetch article")
    return await response.json()
  } catch (error) {
    console.error("Error fetching article from API:", error)
    return null
  }
}
