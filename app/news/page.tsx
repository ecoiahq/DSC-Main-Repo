import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"
import { getFeaturedArticlesAsync, getLatestArticlesAsync } from "@/lib/data-service"
import { Suspense } from "react"
import LoadingSpinner from "@/components/loading-spinner"

async function FeaturedArticles() {
  const featuredArticles = await getFeaturedArticlesAsync()

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {featuredArticles.map((article) => (
        <Link key={article.id} href={article.url} className="group">
          <div className="overflow-hidden rounded-lg bg-gray-900 transition-colors hover:bg-gray-800">
            <div className="relative">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={800}
                height={450}
                className="aspect-video object-cover"
              />
              <div className="absolute top-2 left-2 rounded bg-teal-600 px-2 py-1 text-xs font-medium text-white">
                {article.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold group-hover:text-teal-400">{article.title}</h3>
              <p className="mt-2 text-gray-300">{article.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>By {article.author}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

async function LatestArticles() {
  const latestArticles = await getLatestArticlesAsync()

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {latestArticles.map((article) => (
        <Link key={article.id} href={article.url} className="group">
          <div className="overflow-hidden rounded-lg bg-gray-900 transition-colors hover:bg-gray-800">
            <div className="relative">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={600}
                height={340}
                className="aspect-video object-cover"
              />
              <div className="absolute top-2 left-2 rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white">
                {article.category}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold group-hover:text-teal-400">{article.title}</h3>
              <p className="mt-2 text-sm text-gray-300 line-clamp-2">{article.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                <span>{article.date}</span>
                <span>By {article.author}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-gray-900 to-black py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold md:text-4xl">Latest News</h1>
            <p className="mt-2 max-w-2xl text-gray-300">
              Stay up to date with the latest news, results, and stories from the world of para sports.
            </p>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold">Featured Stories</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <FeaturedArticles />
            </Suspense>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="border-t border-gray-800 py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold">Latest Articles</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <LatestArticles />
            </Suspense>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
