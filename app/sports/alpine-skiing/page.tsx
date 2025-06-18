import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"
import SportTimelineComponent from "@/components/sport-timeline"
import { getSportBySlug, getSportNews, getSportVideos } from "@/lib/sports-data"

export const metadata = {
  title: "Alpine Skiing | Disability Sports Channel",
  description: "Learn about alpine skiing, including its history, rules, disciplines, and latest news and videos.",
}

export default function AlpineSkiingPage() {
  // Get sport information
  const sport = getSportBySlug("alpine-skiing") || {
    name: "Alpine Skiing",
    description:
      "Alpine skiing is a winter Olympic sport where athletes race down snow-covered slopes, navigating gates in various disciplines including Downhill, Super-G, Giant Slalom, Slalom, and Combined events.",
    timeline: [
      {
        year: "1850s",
        event: "Origins",
        description:
          "Modern alpine skiing began to develop in the Alps with the introduction of the stem turn technique by Mathias Zdarsky.",
      },
      {
        year: "1924",
        event: "Olympic Introduction",
        description: "Alpine skiing events were first demonstrated at the Winter Olympics in Chamonix, France.",
      },
      {
        year: "1936",
        event: "Olympic Medal Sport",
        description:
          "Alpine skiing became a full medal sport at the Winter Olympics in Garmisch-Partenkirchen, Germany.",
      },
      {
        year: "1967",
        event: "World Cup",
        description: "The FIS Alpine Ski World Cup was established, creating a season-long competition series.",
      },
      {
        year: "1988",
        event: "Super-G Introduction",
        description: "Super-G (Super Giant Slalom) was added to the Olympic program at the Calgary Winter Olympics.",
      },
    ],
    rules: [
      {
        title: "Disciplines",
        content:
          "Alpine skiing includes five main disciplines: Downhill (fastest and longest), Super-G (Super Giant Slalom), Giant Slalom, Slalom (shortest course with the most gates), and Combined (one downhill run and one slalom run).",
      },
      {
        title: "Course Setup",
        content:
          "Courses are set with gates that athletes must navigate. The number and spacing of gates vary by discipline, with Slalom having the most gates and Downhill having the fewest.",
      },
      {
        title: "Competition Format",
        content:
          "In technical events (Slalom and Giant Slalom), athletes take two runs on different courses, with the combined time determining the winner. In speed events (Downhill and Super-G), athletes take a single run.",
      },
      {
        title: "Equipment",
        content:
          "Athletes use specialized skis for each discipline, with longer skis for speed events and shorter skis for technical events. Protective equipment includes helmets, back protectors, and padded suits.",
      },
    ],
    pointSystem:
      "Alpine skiing uses a time-based scoring system. The fastest athlete down the course wins. In technical events (Slalom and Giant Slalom), athletes take two runs, with the combined time determining the final result. In World Cup competitions, points are awarded based on finishing position, with the overall season champion determined by total points.",
    classification:
      "Alpine skiing at the Olympic level does not use a classification system as it is for able-bodied athletes. However, there are age categories for youth competitions, and separate events for men and women.",
    coverImage: "/abstract-geometric-shapes.png",
  }

  // Get sport-specific news and videos
  const news = getSportNews("alpine-skiing")
  const videos = getSportVideos("alpine-skiing")

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={sport.coverImage || "/abstract-geometric-shapes.png"}
              alt={sport.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8">
              <div className="container">
                <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{sport.name}</h1>
                <p className="mt-2 max-w-2xl text-gray-300 md:text-lg">{sport.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h2 className="text-2xl font-bold">Rules</h2>
                    <div className="mt-4 space-y-6">
                      {sport.rules.map((rule, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-teal-400">{rule.title}</h3>
                          <p className="mt-2 text-gray-300">{rule.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Competition Format</h2>
                    <p className="mt-4 text-gray-300">{sport.classification}</p>

                    <h2 className="mt-8 text-2xl font-bold">Scoring System</h2>
                    <p className="mt-4 text-gray-300">{sport.pointSystem}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <h2 className="text-2xl font-bold">History of {sport.name}</h2>
                <SportTimelineComponent timeline={sport.timeline} />
              </TabsContent>
              <TabsContent value="news" className="mt-6">
                <h2 className="text-2xl font-bold">Latest News</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {news && news.length > 0 ? (
                    news.map((article) => (
                      <Link key={article.id} href={article.url} className="group">
                        <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                          <div className="relative aspect-video">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="line-clamp-2 text-lg font-bold group-hover:text-teal-400">
                              {article.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm text-gray-300">{article.excerpt}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs text-gray-400">{article.date}</span>
                              <span className="text-xs font-medium text-teal-400">Read more</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center">
                      <p className="text-gray-400">No news articles available for {sport.name} at this time.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="videos" className="mt-6">
                <h2 className="text-2xl font-bold">Videos</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {videos && videos.length > 0 ? (
                    videos.map((video) => (
                      <Link key={video.id} href={video.url} className="group">
                        <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                          <div className="relative aspect-video">
                            <Image
                              src={video.image || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-6 w-6"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs">
                              {video.duration}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="line-clamp-2 text-lg font-bold group-hover:text-teal-400">{video.title}</h3>
                            <p className="mt-2 line-clamp-2 text-sm text-gray-300">{video.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs text-gray-400">{video.views} views</span>
                              <span className="text-xs font-medium text-teal-400">Watch now</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center">
                      <p className="text-gray-400">No videos available for {sport.name} at this time.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Sports */}
        <section className="border-t border-gray-800 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold">Related Winter Sports</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Link href="/sports/para-alpine-skiing" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image
                      src="/abstract-geometric-shapes.png"
                      alt="Para Alpine Skiing"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Alpine Skiing</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/snowboarding" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/abstract-geometric-shapes.png" alt="Snowboarding" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Snowboarding</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/freestyle-skiing" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/abstract-geometric-shapes.png" alt="Freestyle Skiing" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Freestyle Skiing</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline" className="border-teal-600 text-teal-400 hover:bg-teal-950">
                <Link href="/sports" className="flex items-center gap-2">
                  View All Sports
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
