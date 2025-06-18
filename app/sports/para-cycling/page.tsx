import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { getSportNews, getSportVideos } from "@/lib/sports-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import SportHistoryTimeline from "@/components/sport-history-timeline"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export const metadata: Metadata = {
  title: "Para Cycling | Disability Sports Channel",
  description: "Learn about para cycling, watch videos, read news, and discover the rules and classification system.",
}

export default function ParaCyclingPage() {
  // Create timeline events for para cycling
  const timelineEvents = [
    {
      year: "1984",
      title: "Paralympic Debut",
      description:
        "Cycling for athletes with disabilities made its first appearance at the New York/Stoke Mandeville Paralympic Games.",
    },
    {
      year: "1988",
      title: "Seoul Expansion",
      description:
        "The Seoul Paralympics featured expanded cycling events for athletes with visual impairments and cerebral palsy.",
    },
    {
      year: "1992",
      title: "Track Cycling Introduction",
      description: "Track cycling was introduced to the Paralympic program at the Barcelona Games.",
    },
    {
      year: "1996",
      title: "Handcycling Demonstration",
      description: "Handcycling was featured as a demonstration event at the Atlanta Paralympics.",
    },
    {
      year: "2002",
      title: "UCI Integration",
      description:
        "Para cycling governance was transferred to the Union Cycliste Internationale (UCI), integrating with mainstream cycling.",
    },
    {
      year: "2004",
      title: "Handcycling Medal Sport",
      description: "Handcycling became a full medal sport at the Athens Paralympic Games.",
    },
    {
      year: "2007",
      title: "First UCI World Championships",
      description: "The first UCI Para Cycling World Championships were held in Bordeaux, France.",
    },
    {
      year: "2016",
      title: "Rio Innovation",
      description:
        "The Rio Paralympics featured technological innovations in adaptive bikes and increased media coverage of para cycling events.",
    },
  ]

  const news = getSportNews("para-cycling") || []
  const videos = getSportVideos("para-cycling") || []

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/abstract-geometric-shapes.png"
              alt="Para Cycling"
              fill
              className="object-cover object-center opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 py-24 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Para Cycling</h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
                Para cycling includes road and track events for athletes with physical impairments using bicycles,
                tricycles, handcycles, and tandems.
              </p>
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
            subtitle="Explore the evolution of para cycling from its Paralympic debut to becoming a technologically advanced sport."
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
                            <p className="font-medium text-white">Event Types</p>
                            <p className="text-gray-400">Road cycling, track cycling, time trials</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Competition Format</p>
                            <p className="text-gray-400">Individual and team events with various distances</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Paralympic Sport Since</p>
                            <p className="text-gray-400">1984 New York/Stoke Mandeville Paralympics</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Governing Body</p>
                            <p className="text-gray-400">Union Cycliste Internationale (UCI)</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Equipment</h3>
                      <p className="mb-4 text-gray-300">
                        Para cycling utilizes specialized equipment adapted for different impairments:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Standard bicycles for athletes with limb impairments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Handcycles for athletes with lower limb impairments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Tricycles for athletes with coordination impairments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Tandems for athletes with visual impairments</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Prosthetic attachments and adaptive equipment</span>
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
                          The pinnacle of para cycling competition, featuring road and track events every four years.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">UCI World Championships</h4>
                        <p className="text-sm text-gray-300">
                          Annual world championships organized by UCI featuring the top para cyclists globally.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">World Cup Series</h4>
                        <p className="text-sm text-gray-300">
                          International series of competitions providing qualification opportunities for major events.
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
                      <div>
                        <h4 className="mb-2 text-lg font-medium text-teal-400">Equipment Standards</h4>
                        <p className="text-gray-300">
                          All cycling equipment must meet UCI technical regulations with specific adaptations for para
                          cycling. Equipment modifications must be approved and cannot provide unfair advantage.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-lg font-medium text-teal-400">Race Procedures</h4>
                        <p className="text-gray-300">
                          Races follow standard UCI procedures with adaptations for different classifications. Starting
                          procedures may vary based on athlete needs and equipment type.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-lg font-medium text-teal-400">Safety Requirements</h4>
                        <p className="text-gray-300">
                          Mandatory helmet use, proper equipment maintenance, and classification-specific safety
                          measures ensure athlete protection during competition.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 text-lg font-medium text-teal-400">Pilot Requirements</h4>
                        <p className="text-gray-300">
                          For tandem events, pilots must meet specific criteria and cannot have competed as able-bodied
                          cyclists at international level within a specified timeframe.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Track Events</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Individual pursuit races over 3km or 4km distances</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Time trials over 500m, 1km, or longer distances</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Scratch races and points races for specific classifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Team sprint events for tandem classifications</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Road Events</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Individual time trials over various distances</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Road races with mass start format</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Team relay events combining different classifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Mixed team relay with male and female athletes</span>
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
                    <p className="mb-6 text-gray-300">
                      Para cycling uses a functional classification system that groups athletes based on their ability
                      to cycle, ensuring fair competition across different impairment types.
                    </p>

                    <h4 className="mb-3 text-lg font-medium text-teal-400">Classification Categories</h4>
                    <div className="overflow-hidden rounded-lg border border-gray-700">
                      <table className="w-full border-collapse text-left">
                        <thead className="bg-gray-800">
                          <tr>
                            <th className="p-3 text-white">Category</th>
                            <th className="p-3 text-white">Description</th>
                            <th className="p-3 text-white">Equipment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">B (Tandem)</td>
                            <td className="p-3 text-gray-300">Visual impairment</td>
                            <td className="p-3 text-gray-300">Tandem bicycle with pilot</td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">C1-C5</td>
                            <td className="p-3 text-gray-300">Cycling with physical impairments</td>
                            <td className="p-3 text-gray-300">Standard bicycle with adaptations</td>
                          </tr>
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">H1-H5</td>
                            <td className="p-3 text-gray-300">Handcycling classifications</td>
                            <td className="p-3 text-gray-300">Handcycle (arm-powered)</td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">T1-T2</td>
                            <td className="p-3 text-gray-300">Tricycle for coordination impairments</td>
                            <td className="p-3 text-gray-300">Three-wheeled bicycle</td>
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
                            <p className="text-gray-400">Review of medical documentation and physical examination</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            2
                          </div>
                          <div>
                            <p className="font-medium text-white">Technical Assessment</p>
                            <p className="text-gray-400">Cycling-specific tests to evaluate functional ability</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            3
                          </div>
                          <div>
                            <p className="font-medium text-white">Observation in Competition</p>
                            <p className="text-gray-400">Assessment during actual cycling competition</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            4
                          </div>
                          <div>
                            <p className="font-medium text-white">Classification Assignment</p>
                            <p className="text-gray-400">Final sport class assigned based on all evaluations</p>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Equipment Adaptations</h3>
                      <p className="mb-4 text-gray-300">
                        Para cycling allows various equipment adaptations to enable participation:
                      </p>
                      <div className="space-y-4">
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Prosthetic Attachments</h4>
                          <p className="text-sm text-gray-300">
                            Custom prosthetic limbs and attachments for pedaling and steering
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Bike Modifications</h4>
                          <p className="text-sm text-gray-300">
                            Adapted handlebars, seats, and pedal systems for different impairments
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Safety Equipment</h4>
                          <p className="text-sm text-gray-300">
                            Specialized helmets, strapping systems, and protective gear
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
                    {videos.length > 0 ? (
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
                      <div className="col-span-3 text-center text-gray-400">
                        <p>No videos available at the moment. Check back soon for the latest para cycling content!</p>
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
                    {news.length > 0 ? (
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
                      <div className="col-span-3 text-center text-gray-400">
                        <p>
                          No news articles available at the moment. Check back soon for the latest para cycling news!
                        </p>
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
      </main>
      <EnhancedFooter />
    </div>
  )
}
