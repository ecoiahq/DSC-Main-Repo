import Hero from "@/components/Hero"
import TabsContent from "@/components/TabsContent"
import SportHistoryTimeline from "@/components/SportHistoryTimeline"
import { WheelchairRugbyEvents } from "@/data/SportEventsData"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wheelchair Rugby | Sports Hub",
  description: "Explore the world of Wheelchair Rugby with detailed information, history, rules, and more.",
}

const WheelchairRugbyPage = () => {
  const heroContent = {
    title: "Wheelchair Rugby",
    description:
      "Wheelchair rugby, originally called murderball, is a team sport for athletes with disabilities. It combines elements of rugby, basketball, and handball.",
    image: "/images/sports/wheelchair-rugby-hero.jpg",
    alt: "Wheelchair Rugby Action",
  }

  const tabContents = [
    {
      label: "Overview",
      content: (
        <div>
          <p>
            Wheelchair rugby is a fast-paced, highly physical sport played by two teams of four players. The objective
            is to carry the ball across the opposing team’s goal line. Players must have an impairment that affects the
            function of their arms and legs.
          </p>
          <p>
            The sport is governed internationally by the World Wheelchair Rugby (WWR). Wheelchair rugby is played on a
            regulation-sized basketball court with goals marked at each end.
          </p>
        </div>
      ),
    },
    {
      label: "Rules",
      content: (
        <div>
          <p>Key rules of wheelchair rugby include:</p>
          <ul>
            <li>Players must pass or dribble the ball at least once every 10 seconds.</li>
            <li>Players cannot kick the ball.</li>
            <li>Players cannot make physical contact with another player’s body.</li>
            <li>Players must stay within the boundaries of the court.</li>
          </ul>
        </div>
      ),
    },
    {
      label: "Classification",
      content: (
        <div>
          <p>
            Athletes are classified based on their functional ability, with classifications ranging from 0.5 (lowest
            function) to 3.5 (highest function). The total classification value of the four players on the court at any
            time cannot exceed 8 points.
          </p>
        </div>
      ),
    },
    {
      label: "Media",
      content: (
        <div>
          <p>[Placeholder for media content - videos, images, etc.]</p>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Hero {...heroContent} />
      <SportHistoryTimeline events={WheelchairRugbyEvents} />
      <TabsContent tabContents={tabContents} />
    </div>
  )
}

export default WheelchairRugbyPage
