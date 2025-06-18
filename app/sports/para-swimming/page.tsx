import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export const metadata: Metadata = {
  title: "Para Swimming | Disability Sports Channel",
  description: "Learn about para swimming, watch videos, read news, and discover the rules and classification system.",
}

export default function ParaSwimmingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/para-swimming-competition.png"
              alt="Para Swimming"
              fill
              className="object-cover object-center opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-24 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Para Swimming</h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
                Para swimming is an adaptation of swimming for athletes with disabilities. It is governed by World Para
                Swimming and is part of the Paralympic Games program.
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

        <section className="bg-gray-950 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-white">Key Facts</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Paralympic sport since 1960</li>
                    <li>Over 140 medal events</li>
                    <li>14 sport classes (S1-S14)</li>
                    <li>All four swimming strokes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold text-white">Swimming Strokes</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Freestyle (front crawl)</li>
                    <li>Backstroke</li>
                    <li>Breaststroke</li>
                    <li>Butterfly</li>
                    <li>Individual Medley</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
