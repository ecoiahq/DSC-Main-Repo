import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { fetchSport } from "@/lib/data"
import Hero from "@/components/hero"
import SportDescription from "@/components/sport-description"
import SportTimelineComponent from "@/components/sport-timeline"

export const metadata: Metadata = {
  title: "Wheelchair Basketball",
}

export default async function Page() {
  const sport = await fetchSport("wheelchair-basketball")

  if (!sport) {
    notFound()
  }

  return (
    <main>
      <Hero title={sport.name} image={sport.image} alt={sport.alt} />
      <SportDescription description={sport.description} />
      <section className="container mx-auto py-10">
        <h2 className="text-3xl font-bold mb-5 text-center">Timeline</h2>
        {sport.timeline && sport.timeline.length > 0 ? (
          <SportTimelineComponent timeline={sport.timeline} />
        ) : (
          <div className="text-center text-gray-400 py-8">Timeline data not available</div>
        )}
      </section>
    </main>
  )
}
