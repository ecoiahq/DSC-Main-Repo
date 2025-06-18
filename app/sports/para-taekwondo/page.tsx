import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { getSportBySlug, getSportNews, getSportVideos } from "@/lib/sports-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import SportHistoryTimeline from "@/components/sport-history-timeline"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export const metadata: Metadata = {
  title: "Para Taekwondo | Disability Sports Channel",
  description: "Learn about para taekwondo, watch videos, read news, and discover the rules and classification system.",
}

export default function ParaTaekwondoPage() {
  const sport = getSportBySlug("para-taekwondo") || {
    name: "Para Taekwondo",
    description:
      "Para taekwondo is a Paralympic sport for athletes with arm impairments. It follows similar rules to Olympic taekwondo with adaptations for the athletes' disabilities.",
    timeline: [
      {
        year: "2020",
        event: "Paralympic Debut",
        description: "Para taekwondo made its Paralympic debut at the Tokyo 2020 Paralympic Games.",
      },
      {
        year: "2009",
        event: "World Championships",
        description: "The first World Para Taekwondo Championships were held in Baku, Azerbaijan.",
      },
      {
        year: "2017",
        event: "Paralympic Inclusion",
        description: "Para taekwondo was officially added to the Paralympic program for Tokyo 2020.",
      },
    ],
    rules: [
      {
        title: "Competition Area",
        content: "Matches are held on an 8m x 8m mat, the same as Olympic taekwondo.",
      },
      {
        title: "Scoring",
        content:
          "Points are awarded for kicks to the body (2 points) and head (4 points), with additional points for turning kicks.",
      },
      { title: "Match Duration", content: "Matches consist of three 2-minute rounds with 1-minute breaks." },
    ],
    classification:
      "Para taekwondo has two sport classes: K44 (athletes with one arm impairment or equivalent) and K43 (athletes with impairments in both arms or equivalent).",
    pointSystem:
      "Para taekwondo uses an electronic scoring system where points are awarded for kicks to valid target areas. The athlete with the most points at the end of three rounds wins.",
    coverImage: "/abstract-geometric-shapes.png",
  }

  const news = getSportNews("para-taekwondo") || []
  const videos = getSportVideos("para-taekwondo") || []

  const timelineEvents =
    sport.timeline?.map((item) => ({
      year: item.year,
      title: item.event,
      description: item.description,
    })) || []

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src={sport.coverImage || "/placeholder.svg"}
              alt={sport.name}
              fill
              className="object-cover object-center opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 py-24 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">{sport.name}</h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">{sport.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-teal-600 hover:bg-teal-500">Watch Live</Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Learn the Rules
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sport History Timeline */}
        {timelineEvents.length > 0 && (
          <SportHistoryTimeline
            events={timelineEvents}
            subtitle={`Explore the evolution of ${sport.name.toLowerCase()} from its world championships to Paralympic inclusion.`}
          />
        )}

        {/* Content Tabs */}
        <section className="bg-gray-950 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-4 bg-gray-900/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="classification">Classification</TabsTrigger>
                <TabsTrigger value="media">Videos & News</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Key Facts</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Users className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Competition Type</p>
                            <p className="text-gray-400">Individual sparring matches</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Match Duration</p>
                            <p className="text-gray-400">Three 2-minute rounds</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Paralympic Sport Since</p>
                            <p className="text-gray-400">2020 Tokyo Paralympics</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Governing Body</p>
                            <p className="text-gray-400">World Taekwondo (WT)</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Equipment</h3>
                      <p className="mb-4 text-gray-300">
                        Para taekwondo uses the same protective equipment as Olympic taekwondo:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Electronic body protector</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Head protector with electronic sensors</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Forearm and shin guards</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Groin guard and mouthpiece</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="rules" className="space-y-8">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="mb-6 text-xl font-bold text-white">Official Rules</h3>
                    <div className="space-y-6">
                      {sport.rules.map((rule, index) => (
                        <div key={index}>
                          <h4 className="mb-2 text-lg font-medium text-teal-400">{rule.title}</h4>
                          <p className="text-gray-300">{rule.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="classification" className="space-y-8">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Classification System</h3>
                    <p className="mb-6 text-gray-300">{sport.classification}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="media" className="space-y-8">
                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Latest Videos</h3>
                  {videos.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-3">
                      {videos.slice(0, 3).map((video) => (
                        <Link key={video.id} href={video.url} className="group">
                          <div className="overflow-hidden rounded-lg bg-gray-900 transition-all duration-300 hover:bg-gray-800">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={video.image || "/placeholder.svg"}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 text-lg font-bold text-white group-hover:text-teal-400">
                                {video.title}
                              </h4>
                              <p className="line-clamp-2 text-sm text-gray-300">{video.description}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No videos available at this time.</p>
                  )}
                </div>

                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Latest News</h3>
                  {news.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-3">
                      {news.slice(0, 3).map((article) => (
                        <Link key={article.id} href={article.url} className="group">
                          <div className="overflow-hidden rounded-lg bg-gray-900 transition-all duration-300 hover:bg-gray-800">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 text-lg font-bold text-white group-hover:text-teal-400">
                                {article.title}
                              </h4>
                              <p className="line-clamp-2 text-sm text-gray-300">{article.excerpt}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No news available at this time.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
