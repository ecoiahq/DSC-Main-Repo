import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Share2, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"

export default function NewsArticlePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/news" className="flex items-center gap-1 text-gray-400 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              Back to News
            </Link>
          </Button>

          {/* Article header */}
          <div className="mb-8">
            <div className="rounded-lg bg-teal-600/20 px-3 py-1 text-sm text-teal-400 inline-block mb-4">
              Para Swimming
            </div>
            <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Dunn breaks world record in 100m freestyle S14
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>May 2, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>4 hours ago</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>By James Wilson</span>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
            <Image
              src="/para-swimming-competition.png"
              alt="Reece Dunn celebrating after breaking the world record"
              fill
              className="object-cover"
            />
          </div>

          {/* Article content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-xl font-medium text-gray-300 mb-6">
              British swimmer Reece Dunn has broken his own world record in the men's 100m freestyle S14 at the World
              Para Swimming Championships in Manchester.
            </p>

            <p className="mb-4">
              Dunn, 25, touched the wall in a time of 51.27 seconds, shaving 0.38 seconds off his previous best set at
              the Tokyo Paralympic Games where he claimed gold in the event.
            </p>

            <p className="mb-4">
              The Plymouth-born swimmer dominated the race from start to finish, turning at the halfway mark over a
              second ahead of his nearest competitor, Australia's Liam Schluter, who took silver in 53.56 seconds.
              Brazil's Gabriel Bandeira completed the podium with bronze in 53.89 seconds.
            </p>

            <blockquote className="border-l-4 border-teal-500 pl-4 italic my-6">
              "I knew I was in good form coming into these championships, but to break the world record again is just
              incredible. The home crowd really pushed me on in that final 25 meters when I was starting to feel the
              pain," said Dunn after the race.
            </blockquote>

            <p className="mb-4">
              This marks Dunn's second gold medal of the championships, having already won the 200m freestyle S14
              earlier in the week. He will be looking to complete a hat-trick of golds when he competes in the 200m
              individual medley S14 on the final day of competition.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Road to Paris</h2>

            <p className="mb-4">
              Dunn's record-breaking performance firmly establishes him as the favorite for gold at next year's
              Paralympic Games in Paris, where he will be looking to defend his title and potentially add to his medal
              collection.
            </p>

            <p className="mb-4">
              British Para-Swimming Performance Director Chris Furber praised Dunn's achievement: "Reece has been
              working incredibly hard on his technique and race execution over the past year, and it's fantastic to see
              that work paying off with a new world record. This is a significant milestone on the road to Paris 2024."
            </p>

            <p className="mb-4">
              The World Para Swimming Championships continue until Sunday, with several more British medal hopes still
              to compete, including Tokyo 2020 gold medalists Maisie Summers-Newton and Hannah Russell.
            </p>
          </div>

          {/* Share buttons */}
          <div className="mt-8 flex items-center gap-4 border-t border-gray-800 pt-6">
            <span className="text-gray-400">Share this article:</span>
            <Button variant="ghost" size="sm" className="rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full p-2">
              <Share2 className="h-5 w-5 text-gray-400" />
              <span className="sr-only">Share</span>
            </Button>
          </div>

          {/* Related articles */}
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link href="/news/paralympic-swimming-qualifiers" className="group">
                <div className="overflow-hidden rounded-lg">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=para swimming competition"
                      alt="Paralympic Swimming Qualifiers"
                      width={600}
                      height={400}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 font-medium group-hover:text-teal-400">
                    Paralympic Swimming Qualifiers: Key dates and qualification pathways
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">3 days ago</p>
                </div>
              </Link>
              <Link href="/news/summer-mcintosh-world-record" className="group">
                <div className="overflow-hidden rounded-lg">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=swimming competition female"
                      alt="Summer McIntosh"
                      width={600}
                      height={400}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 font-medium group-hover:text-teal-400">
                    Summer McIntosh breaks 400m IM world record at Canadian Olympic trials
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">1 week ago</p>
                </div>
              </Link>
              <Link href="/news/para-swimming-technology-advances" className="group">
                <div className="overflow-hidden rounded-lg">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=swimming technology"
                      alt="Swimming Technology"
                      width={600}
                      height={400}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 font-medium group-hover:text-teal-400">
                    How technology is transforming para swimming performance analysis
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">2 weeks ago</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <EnhancedFooter />
    </div>
  )
}
