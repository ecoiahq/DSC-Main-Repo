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

function NewsTickerSection() {
  const tickerItems = [
    {
      id: 1,
      isLive: true,
      title: "Paralympic Swimming World Series - London qualifying heats underway",
      category: "Para Swimming",
      timeAgo: "Live",
      url: "/live/paralympic-swimming-world-series",
    },
    {
      id: 2,
      isLive: false,
      title: "What does Tatyana McFadden need to do to secure Paris 2024 spot?",
      category: "Para Athletics",
      timeAgo: "2h",
      comments: 28,
      url: "/news/tatyana-mcfadden-paris-2024",
    },
    {
      id: 3,
      isLive: false,
      title: "Wheelchair Basketball World Championships - Team GB confident on medal chances",
      category: "Wheelchair Basketball",
      timeAgo: "4h",
      url: "/news/wheelchair-basketball-world-championships",
    },
    {
      id: 4,
      isLive: false,
      title: "Boccia legend David Smith announces retirement after illustrious career",
      category: "Boccia",
      timeAgo: "6h",
      comments: 156,
      url: "/news/david-smith-boccia-retirement",
    },
    {
      id: 5,
      isLive: false,
      title: "Para Cycling Track Championships - British team dominates opening day",
      category: "Para Cycling",
      timeAgo: "8h",
      url: "/news/para-cycling-track-championships",
    },
    {
      id: 6,
      isLive: false,
      title: "Goalball European Championships preview - England eyes top spot",
      category: "Goalball",
      timeAgo: "12h",
      comments: 42,
      url: "/news/goalball-european-championships-preview",
    },
  ]

  return (
    <div className="border-t border-gray-800 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {tickerItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.url}
              className="group border-r border-gray-800 last:border-r-0 md:last:border-r lg:last:border-r-0 xl:[&:nth-child(6n)]:border-r-0 hover:bg-gray-900 transition-colors duration-200"
            >
              <div className="px-4 py-3">
                <div className="flex items-start gap-2 mb-1">
                  {item.isLive && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                      LIVE
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors line-clamp-2 mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-teal-500 font-medium">{item.category}</span>
                    <span>•</span>
                    <span>{item.timeAgo}</span>
                  </div>
                  {item.comments && (
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                      </svg>
                      <span>{item.comments}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
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

      {/* Main Content */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4 md:px-6">
          <FeaturedArticlesContent />
        </div>
      </div>

      {/* News Ticker Section */}
      <NewsTickerSection />
    </section>
  )
}
