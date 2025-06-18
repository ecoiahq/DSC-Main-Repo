import Link from "next/link"
import Image from "next/image"
import { Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PodcastSection() {
  // This would typically come from an API or CMS
  const podcasts = [
    {
      id: 1,
      title: "The Journey to Paralympic Gold",
      guest: "Emma Parker",
      image: "/placeholder.svg?height=400&width=400",
      duration: "42:15",
      url: "/podcasts/journey-to-gold",
    },
    {
      id: 2,
      title: "Coaching Elite Para Athletes",
      guest: "James Wilson",
      image: "/placeholder.svg?height=400&width=400",
      duration: "38:50",
      url: "/podcasts/coaching-elite",
    },
    {
      id: 3,
      title: "Technology in Para Sports",
      guest: "Dr. Sarah Chen",
      image: "/placeholder.svg?height=400&width=400",
      duration: "45:22",
      url: "/podcasts/technology-para-sports",
    },
  ]

  return (
    <section className="border-t border-gray-800 bg-gray-950 py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-teal-500" />
              <h2 className="text-2xl font-bold">Para Sport Talks</h2>
            </div>
            <p className="mt-1 text-gray-400">Our exclusive podcast series featuring para athletes and experts</p>
          </div>
          <Button variant="outline" className="hidden border-teal-500 text-teal-500 hover:bg-teal-950 sm:inline-flex">
            <Link href="/podcasts">View All Episodes</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {podcasts.map((podcast) => (
            <Link key={podcast.id} href={podcast.url} className="group">
              <div className="overflow-hidden rounded-lg bg-gray-900 transition-colors hover:bg-gray-800">
                <div className="relative">
                  <Image
                    src={podcast.image || "/placeholder.svg"}
                    alt={podcast.title}
                    width={400}
                    height={400}
                    className="aspect-square object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500">
                      <Headphones className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium">
                    {podcast.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium group-hover:text-teal-400">{podcast.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">with {podcast.guest}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex justify-center sm:hidden">
          <Button variant="outline" className="w-full border-teal-500 text-teal-500 hover:bg-teal-950 sm:w-auto">
            <Link href="/podcasts">View All Episodes</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
