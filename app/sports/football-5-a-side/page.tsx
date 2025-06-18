import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { getSportBySlug, getSportNews, getSportVideos } from "@/lib/sports-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import SportHistoryTimeline from "@/components/sport-history-timeline"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export const metadata: Metadata = {
  title: "Football 5-a-side | Disability Sports Channel",
  description:
    "Learn about football 5-a-side, watch videos, read news, and discover the rules and classification system.",
}

export default function Football5ASidePage() {
  // Get sport information with fallback data
  const sport = getSportBySlug("football-5-a-side") || {
    name: "Football 5-a-side",
    description:
      "Football 5-a-side is a Paralympic sport for athletes with visual impairments. It's played with a ball containing ball bearings that create sound, allowing players to locate it by hearing.",
    timeline: [
      {
        year: "2004",
        event: "Paralympic Debut",
        description: "Football 5-a-side made its Paralympic debut at the Athens Games.",
      },
      {
        year: "2008",
        event: "Growing Popularity",
        description: "Increased global participation and media coverage at Beijing Paralympics.",
      },
      {
        year: "2012",
        event: "Technical Development",
        description: "Improved ball technology and field specifications introduced.",
      },
      {
        year: "2016",
        event: "Expanded Competition",
        description: "More countries participating with enhanced qualification systems.",
      },
      {
        year: "2024",
        event: "Modern Era",
        description: "Continued growth with advanced training methods and global development programs.",
      },
    ],
    rules: [
      {
        title: "Team Composition",
        content:
          "Each team consists of four outfield players who are blind or visually impaired, and one sighted or partially sighted goalkeeper. Teams may also have sighted guides.",
      },
      {
        title: "Sound Ball",
        content:
          "The ball contains ball bearings that create sound when it moves, allowing players to locate it. Spectators must remain silent during play except when goals are scored.",
      },
      {
        title: "Field Dimensions",
        content:
          "The field is 40m long and 20m wide, surrounded by boards to keep the ball in play. Goals are 3m wide and 2m high.",
      },
      {
        title: "Match Duration",
        content:
          "Matches consist of two 25-minute halves with a 10-minute break. The clock stops when play is interrupted.",
      },
    ],
    classification:
      "Football 5-a-side is exclusively for athletes with visual impairments. Outfield players must be classified as B1 (totally or almost totally blind), while goalkeepers can be sighted or partially sighted.",
    coverImage: "/placeholder.svg?height=500&width=800&text=Football+5-a-side",
  }

  const news = getSportNews("football-5-a-side")
  const videos = getSportVideos("football-5-a-side")

  // Create timeline events from the sport data
  const timelineEvents = sport.timeline
    ? sport.timeline.map((item) => ({
        year: item.year,
        title: item.event,
        description: item.description,
      }))
    : []

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src={sport.coverImage || "/placeholder.svg?height=500&width=800&text=Football+5-a-side"}
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
            subtitle="Explore the evolution of football 5-a-side from its Paralympic debut to becoming a showcase of skill and teamwork for visually impaired athletes."
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
                            <p className="font-medium text-white">Team Size</p>
                            <p className="text-gray-400">5 players per team (4 outfield + 1 goalkeeper)</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Match Duration</p>
                            <p className="text-gray-400">Two 25-minute halves</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Paralympic Sport Since</p>
                            <p className="text-gray-400">2004 Athens Paralympics</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Governing Body</p>
                            <p className="text-gray-400">IBSA (International Blind Sports Federation)</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Unique Features</h3>
                      <p className="mb-4 text-gray-300">
                        Football 5-a-side has several unique characteristics that make it distinct:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Sound ball with ball bearings</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Silent spectators during play</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Boards surrounding the field</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Sighted guides for teams</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Verbal communication between players</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Major Competitions</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">Paralympic Games</h4>
                        <p className="text-sm text-gray-300">
                          The pinnacle of football 5-a-side competition, held every four years since 2004.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">IBSA World Championships</h4>
                        <p className="text-sm text-gray-300">
                          World championship organized by IBSA every four years between Paralympic Games.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">Regional Championships</h4>
                        <p className="text-sm text-gray-300">
                          Continental competitions providing qualification opportunities for major tournaments.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Field Specifications</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Length:</strong> 40 meters
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Width:</strong> 20 meters
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Goal Size:</strong> 3m wide x 2m high
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Penalty Area:</strong> 5m x 2m in front of each goal
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Game Officials</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Referee:</strong> Controls the match and enforces rules
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Timekeeper:</strong> Manages match timing and substitutions
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Third Official:</strong> Assists with technical decisions
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Goal Judge:</strong> Determines if ball crosses goal line
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="classification" className="space-y-8">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Classification System</h3>
                    <p className="mb-6 text-gray-300">{sport.classification}</p>

                    <h4 className="mb-3 text-lg font-medium text-teal-400">Player Classifications</h4>
                    <div className="overflow-hidden rounded-lg border border-gray-700">
                      <table className="w-full border-collapse text-left">
                        <thead className="bg-gray-800">
                          <tr>
                            <th className="p-3 text-white">Position</th>
                            <th className="p-3 text-white">Classification</th>
                            <th className="p-3 text-white">Vision Requirements</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">Outfield Players</td>
                            <td className="p-3 text-gray-300">B1</td>
                            <td className="p-3 text-gray-300">Totally or almost totally blind</td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">Goalkeeper</td>
                            <td className="p-3 text-gray-300">Sighted/B2/B3</td>
                            <td className="p-3 text-gray-300">Can be sighted or partially sighted</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Classification Process</h3>
                      <ol className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            1
                          </div>
                          <div>
                            <p className="font-medium text-white">Medical Assessment</p>
                            <p className="text-gray-400">Ophthalmological examination to determine visual acuity</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            2
                          </div>
                          <div>
                            <p className="font-medium text-white">Technical Assessment</p>
                            <p className="text-gray-400">Football-specific tests to evaluate functional vision</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            3
                          </div>
                          <div>
                            <p className="font-medium text-white">Observation in Competition</p>
                            <p className="text-gray-400">Assessment during actual play to confirm classification</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            4
                          </div>
                          <div>
                            <p className="font-medium text-white">Class Assignment</p>
                            <p className="text-gray-400">Final classification assigned based on all evaluations</p>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Equipment Requirements</h3>
                      <p className="mb-4 text-gray-300">
                        Specific equipment is required to ensure fair play and safety:
                      </p>
                      <div className="space-y-4">
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Eyeshades</h4>
                          <p className="text-sm text-gray-300">
                            All outfield players must wear eyeshades to ensure equal visual conditions
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Sound Ball</h4>
                          <p className="text-sm text-gray-300">
                            Special ball with ball bearings inside to create audible sound when moving
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Protective Gear</h4>
                          <p className="text-sm text-gray-300">
                            Shin guards and appropriate footwear for artificial turf surfaces
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-8">
                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Latest Videos</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    {videos && videos.length > 0 ? (
                      videos.slice(0, 3).map((video) => (
                        <Link key={video.id} href={video.url} className="group">
                          <div className="overflow-hidden rounded-lg bg-gray-900 transition-all duration-300 hover:bg-gray-800">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={video.image || "/placeholder.svg"}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                <Badge className="bg-teal-600 text-white">{video.category}</Badge>
                                <Badge variant="outline" className="border-gray-600 text-gray-300">
                                  {video.duration}
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 text-lg font-bold text-white group-hover:text-teal-400">
                                {video.title}
                              </h4>
                              <p className="line-clamp-2 text-sm text-gray-300">{video.description}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-gray-400">{video.date}</span>
                                <span className="text-xs text-gray-400">{video.views} views</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full text-center">
                        <p className="text-gray-400">No videos available for {sport.name} at this time.</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      View All Videos <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Latest News</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    {news && news.length > 0 ? (
                      news.slice(0, 3).map((article) => (
                        <Link key={article.id} href={article.url} className="group">
                          <div className="overflow-hidden rounded-lg bg-gray-900 transition-all duration-300 hover:bg-gray-800">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                              <div className="absolute bottom-3 left-3">
                                <Badge className="bg-teal-600 text-white">{article.category}</Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 text-lg font-bold text-white group-hover:text-teal-400">
                                {article.title}
                              </h4>
                              <p className="line-clamp-2 text-sm text-gray-300">{article.excerpt}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-gray-400">{article.date}</span>
                                <span className="text-xs text-gray-400">By {article.author}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full text-center">
                        <p className="text-gray-400">No news articles available for {sport.name} at this time.</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      View All News <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Sports */}
        <section className="border-t border-gray-800 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold">Related Sports</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Link href="/sports/goalball" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image
                      src="/placeholder.svg?height=200&width=300&text=Goalball"
                      alt="Goalball"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Goalball</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/para-athletics" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/para-athletics-track.png" alt="Para Athletics" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Athletics</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/para-swimming" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/para-swimming-competition.png" alt="Para Swimming" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Swimming</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline" className="border-teal-600 text-teal-400 hover:bg-teal-950">
                <Link href="/sports" className="flex items-center gap-2">
                  View All Sports
                  <ArrowRight className="h-4 w-4" />
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
