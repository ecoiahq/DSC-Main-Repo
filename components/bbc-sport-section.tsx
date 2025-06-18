import Link from "next/link"
import Image from "next/image"
import { getFeaturedArticlesAsync } from "@/lib/data-service"

async function FeaturedArticlesContent() {
  const articles = await getFeaturedArticlesAsync()

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No featured articles available</p>
      </div>
    )
  }

  const mainArticle = articles[0]
  const secondaryArticles = articles.slice(1, 5)

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {/* Main Feature */}
      <div className="md:col-span-2">
        <Link href={mainArticle.url} className="group relative block">
          <div className="overflow-hidden rounded">
            <Image
              src={mainArticle.image || "/placeholder.svg"}
              alt={mainArticle.title}
              width={640}
              height={360}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
              priority
            />
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-bold text-white group-hover:text-teal-400">{mainArticle.title}</h3>
            <p className="mt-2 text-sm text-gray-300">{mainArticle.excerpt}</p>
            <p className="mt-2 text-xs text-teal-500">
              {mainArticle.category} • {mainArticle.date}
            </p>
          </div>
        </Link>
      </div>

      {/* Secondary Features */}
      <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
        {secondaryArticles.map((article) => (
          <Link key={article.id} href={article.url} className="group block">
            <div className="overflow-hidden rounded">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={320}
                height={180}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 320px"
              />
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-white group-hover:text-teal-400">{article.title}</h3>
              <p className="mt-2 text-xs text-teal-500">
                {article.category} • {article.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function BBCSportSection() {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">FEATURED STORIES</h2>
          <Link
            href="/news"
            className="flex items-center gap-2 rounded bg-teal-600 px-3 py-1 text-sm text-white hover:bg-teal-700"
          >
            <span>More News</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4 md:px-6">
          <FeaturedArticlesContent />
        </div>
      </div>
    </section>
  )
}
