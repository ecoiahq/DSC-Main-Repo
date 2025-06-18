"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Clock, Calendar, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import { getPodcasts } from "@/lib/data-service"

export default function ParaSportTalksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const talks = getPodcasts()

  // Filter talks based on search and category
  const filteredTalks = talks.filter((talk) => {
    const matchesSearch =
      talk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talk.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || talk.title.toLowerCase().includes(selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  const categories = [
    { value: "all", label: "All Topics" },
    { value: "athlete", label: "Athlete Stories" },
    { value: "coaching", label: "Coaching" },
    { value: "technology", label: "Technology" },
    { value: "mental health", label: "Mental Health" },
    { value: "business", label: "Business" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0">
            <Image src="/sports-psychology-session.png" alt="Para Sport Talks" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          <div className="relative container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Para Sport Talks</h1>
              <p className="mt-6 text-xl text-gray-300">
                In-depth conversations with Paralympic athletes, coaches, and industry leaders. Discover the stories
                behind the medals, the science of performance, and the future of para sport.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-500">
                  <Play className="mr-2 h-5 w-5" />
                  Listen to Latest Episode
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  Subscribe to Podcast
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="border-b border-gray-800 py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search talks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value} className="text-white hover:bg-gray-800">
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-400">
                {filteredTalks.length} episode{filteredTalks.length !== 1 ? "s" : ""} found
              </div>
            </div>
          </div>
        </section>

        {/* Featured Episode */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold">Featured Episode</h2>
            {filteredTalks.length > 0 && (
              <div className="rounded-lg bg-gray-900 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <Image
                      src={filteredTalks[0].image || "/placeholder.svg"}
                      alt={filteredTalks[0].title}
                      width={400}
                      height={400}
                      className="aspect-square object-cover w-full"
                    />
                  </div>
                  <div className="p-8 md:w-2/3">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="rounded-full bg-teal-600 px-3 py-1 text-sm font-medium">Latest Episode</span>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        {filteredTalks[0].date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        {filteredTalks[0].duration}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{filteredTalks[0].title}</h3>
                    <p className="text-lg text-gray-300 mb-2">with {filteredTalks[0].guest}</p>
                    <p className="text-gray-400 mb-6">{filteredTalks[0].description}</p>
                    <div className="flex gap-4">
                      <Button asChild className="bg-teal-600 hover:bg-teal-500">
                        <Link href={filteredTalks[0].url}>
                          <Play className="mr-2 h-4 w-4" />
                          Listen Now
                        </Link>
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        Add to Playlist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* All Episodes */}
        <section className="py-12 bg-gray-950">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold">All Episodes</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTalks.map((talk, index) => (
                <Link key={talk.id} href={talk.url} className="group">
                  <div className="overflow-hidden rounded-lg bg-gray-900 transition-all hover:bg-gray-800 hover:scale-105">
                    <div className="relative">
                      <Image
                        src={talk.image || "/placeholder.svg"}
                        alt={talk.title}
                        width={400}
                        height={300}
                        className="aspect-video object-cover w-full"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="rounded-full bg-teal-600 p-3">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs">
                        {talk.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {talk.date}
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-teal-400 transition-colors">{talk.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">with {talk.guest}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{talk.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredTalks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No episodes found matching your search criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="py-16 bg-gradient-to-r from-teal-900 to-teal-700">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss an Episode</h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Subscribe to Para Sport Talks and get notified when new episodes are released. Available on all major
              podcast platforms.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="bg-white text-teal-900 hover:bg-gray-100">
                Apple Podcasts
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-teal-900 hover:bg-gray-100">
                Spotify
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-teal-900 hover:bg-gray-100">
                Google Podcasts
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-teal-900 hover:bg-gray-100">
                RSS Feed
              </Button>
            </div>
          </div>
        </section>
      </main>

      <EnhancedFooter />
    </div>
  )
}
