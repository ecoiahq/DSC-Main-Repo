import Image from "next/image"
import Link from "next/link"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"
import { getAllSports } from "@/lib/sports-data"

export const metadata = {
  title: "Sports | Disability Sports Channel",
  description:
    "Explore all para sports covered by Disability Sports Channel, including rules, history, videos, and news.",
}

export default function SportsPage() {
  // Get all sports
  const sports = getAllSports()

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-black py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold md:text-4xl">Para Sports</h1>
            <p className="mt-2 max-w-2xl text-gray-300">
              Explore all para sports covered by Disability Sports Channel, including rules, history, videos, and news.
            </p>
          </div>
        </section>

        {/* Sports Grid */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sports.map((sport) => (
                <Link key={sport.id} href={`/sports/${sport.slug}`} className="group">
                  <div className="overflow-hidden rounded-lg bg-gray-900 transition-colors hover:bg-gray-800">
                    <div className="relative">
                      <Image
                        src={sport.coverImage || "/placeholder.svg"}
                        alt={sport.name}
                        width={600}
                        height={340}
                        className="aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h2 className="text-xl font-bold text-white group-hover:text-teal-400">{sport.name}</h2>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-300 line-clamp-3">{sport.description}</p>
                      <div className="mt-4 flex items-center text-teal-400">
                        <span className="text-sm font-medium">Learn more</span>
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
                          className="ml-1 h-4 w-4"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
