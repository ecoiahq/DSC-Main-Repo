import Hero from "@/components/Hero"
import TabsContent from "@/components/TabsContent"
import SportHistoryTimeline from "@/components/SportHistoryTimeline"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Sitting Volleyball | ParaSport",
  description: "Learn about Sitting Volleyball at ParaSport. Discover its history, rules, classification, and media.",
  openGraph: {
    title: "Sitting Volleyball | ParaSport",
    description: "Learn about Sitting Volleyball at ParaSport. Discover its history, rules, classification, and media.",
    images: ["/images/sitting-volleyball/hero.jpg"],
  },
}

const sittingVolleyballEvents = [
  {
    year: 1956,
    event: "Sitting Volleyball was created in the Netherlands as a rehabilitation sport for injured soldiers.",
  },
  {
    year: 1967,
    event: "Sitting Volleyball was introduced to the Paralympic Games as a demonstration sport.",
  },
  {
    year: 1980,
    event: "Sitting Volleyball became an official medal sport at the Paralympic Games in Arnhem.",
  },
  {
    year: 2000,
    event: "Women’s Sitting Volleyball was added to the Paralympic program at the Sydney Games.",
  },
  {
    year: 2004,
    event:
      "The International Paralympic Committee (IPC) recognized World ParaVolley as the international federation for the sport.",
  },
]

const SittingVolleyballPage = () => {
  return (
    <div>
      <Hero
        title="Sitting Volleyball"
        image="/images/sitting-volleyball/hero.jpg"
        alt="Sitting Volleyball players in action"
      />

      <SportHistoryTimeline events={sittingVolleyballEvents} />

      <TabsContent
        overviewContent={
          <>
            <p>
              Sitting Volleyball is a Paralympic sport played by athletes with a physical disability. The sport is
              governed by World ParaVolley.
            </p>
            <p>
              The sport is played on a smaller court than standing volleyball, and the net is lower. Athletes must have
              at least one buttock in contact with the floor whenever playing the ball.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2">Key Facts</h3>
                <ul>
                  <li>Governing Body: World ParaVolley</li>
                  <li>Paralympic Debut: 1980</li>
                  <li>Athletes: Athletes with physical disabilities</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2">Did You Know?</h3>
                <p>
                  Sitting Volleyball is one of the most popular sports in the Paralympic Games, known for its fast-paced
                  action and strategic gameplay.
                </p>
              </div>
            </div>
          </>
        }
        rulesContent={
          <>
            <p>
              Sitting Volleyball rules are similar to standing volleyball, with some modifications to accommodate the
              athletes' disabilities.
            </p>
            <ul className="list-disc pl-5 mt-4">
              <li>Court Size: 10m x 6m</li>
              <li>Net Height: 1.15m for men, 1.05m for women</li>
              <li>Athletes must have at least one buttock in contact with the floor when playing the ball.</li>
              <li>Blocking is allowed.</li>
            </ul>

            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
              <h3 className="text-lg font-semibold mb-2">Key Rule Differences</h3>
              <p>
                The main difference is the requirement for athletes to maintain contact with the floor, which adds a
                unique element to the game.
              </p>
            </div>
          </>
        }
        classificationContent={
          <>
            <p>Athletes are classified based on their impairment to ensure fair competition.</p>
            <ul className="list-disc pl-5 mt-4">
              <li>VS1: Athletes with significant impairments affecting their core and leg function.</li>
              <li>VS2: Athletes with less severe impairments.</li>
            </ul>

            <div className="bg-white rounded-lg shadow-md p-4 mt-6">
              <h3 className="text-lg font-semibold mb-2">Classification Process</h3>
              <p>Athletes undergo a classification assessment to determine their eligibility and class.</p>
            </div>
          </>
        }
        mediaContent={
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md">
                <Image
                  src="/images/sitting-volleyball/media1.jpg"
                  alt="Sitting Volleyball Action 1"
                  width={500}
                  height={300}
                  className="rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="text-md font-semibold">Intense Rally</h4>
                  <p className="text-gray-600">A thrilling moment during a Sitting Volleyball match.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <Image
                  src="/images/sitting-volleyball/media2.jpg"
                  alt="Sitting Volleyball Action 2"
                  width={500}
                  height={300}
                  className="rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="text-md font-semibold">Team Celebration</h4>
                  <p className="text-gray-600">The team celebrates a crucial point.</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md">
                <Image
                  src="/images/sitting-volleyball/media3.jpg"
                  alt="Sitting Volleyball Action 3"
                  width={500}
                  height={300}
                  className="rounded-t-lg"
                />
                <div className="p-4">
                  <h4 className="text-md font-semibold">Focused Athlete</h4>
                  <p className="text-gray-600">An athlete prepares to serve.</p>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default SittingVolleyballPage
