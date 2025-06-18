import Link from "next/link"
import Image from "next/image"

interface ContentGridProps {
  title: string
}

export default function ContentGrid({ title }: ContentGridProps) {
  // This would typically come from an API or CMS
  const contentItems = [
    {
      id: 1,
      title: "Para Athletics World Championships Highlights",
      image: "/para-athletics-track.png",
      category: "Athletics",
      url: "/watch/para-athletics-highlights",
    },
    {
      id: 2,
      title: "Wheelchair Rugby: The Clash of Titans",
      image: "/placeholder.svg?key=bzlq9",
      category: "Rugby",
      url: "/watch/wheelchair-rugby-titans",
    },
    {
      id: 3,
      title: "Swimming Stars: Path to Paris 2024",
      image: "/para-swimming-competition.png",
      category: "Swimming",
      url: "/watch/swimming-paris-2024",
    },
    {
      id: 4,
      title: "Inside Look: GB Sitting Volleyball Team",
      image: "/placeholder.svg?height=400&width=600&query=sitting volleyball team",
      category: "Volleyball",
      url: "/watch/sitting-volleyball-gb",
    },
  ]

  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contentItems.map((item) => (
            <Link key={item.id} href={item.url} className="group">
              <div className="overflow-hidden rounded-lg">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium">
                    {item.category}
                  </div>
                </div>
                <h3 className="mt-2 text-base font-medium group-hover:text-teal-400">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
