import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"
import SportTimelineComponent from "@/components/sport-timeline"

export const metadata = {
  title: "Para Alpine Skiing | Disability Sports Channel",
  description: "Learn about para alpine skiing, including its history, rules, disciplines, and latest news and videos.",
}

export default function ParaAlpineSkiingPage() {
  const sport = {
    name: "Para Alpine Skiing",
    description:
      "Para alpine skiing is a Paralympic winter sport where athletes with physical impairments race down snow-covered slopes, navigating gates in various disciplines.",
    timeline: [
      {
        year: "1976",
        event: "Paralympic Debut",
        description: "Para alpine skiing made its Paralympic debut at the Innsbruck Winter Paralympics.",
      },
      {
        year: "1984",
        event: "Classification System",
        description: "A formal classification system was introduced for para alpine skiing.",
      },
      {
        year: "1994",
        event: "Lillehammer Growth",
        description: "The Lillehammer Paralympics saw significant growth in para alpine skiing participation.",
      },
    ],
    rules: [
      {
        title: "Disciplines",
        content: "Para alpine skiing includes Downhill, Super-G, Giant Slalom, Slalom, and Super Combined events.",
      },
      {
        title: "Equipment",
        content: "Athletes may use specialized equipment including sit-skis, outriggers, and prosthetics.",
      },
    ],
    pointSystem: "Time-based competition with fastest times determining winners.",
    classification: "Athletes compete in standing, sitting, and visually impaired categories.",
    coverImage: "/abstract-geometric-shapes.png",
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={sport.coverImage || "/placeholder.svg"}
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

        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="classification">Classification</TabsTrigger>
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
                    <h2 className="text-2xl font-bold">Classification</h2>
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
              <TabsContent value="classification" className="mt-6">
                <h2 className="text-2xl font-bold">Classification System</h2>
                <p className="mt-4 text-gray-300">{sport.classification}</p>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="border-t border-gray-800 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold">Related Sports</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Link href="/sports/alpine-skiing" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/abstract-geometric-shapes.png" alt="Alpine Skiing" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Alpine Skiing</h3>
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
