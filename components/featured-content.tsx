import Link from "next/link"
import Image from "next/image"

export default function FeaturedContent() {
  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-lg">
            <Link href="/news/dan-brooke-paralympicsgb">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/person-suit-green.png"
                  alt="Dan Brooke"
                  width={1200}
                  height={600}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h2 className="mb-2 text-2xl font-bold text-white">Dan Brooke Named Chair of ParalympicsGB</h2>
                <p className="text-sm text-gray-300">Simeon Wakely</p>
              </div>
            </Link>
          </div>
          <div className="group relative overflow-hidden rounded-lg">
            <Link href="/news/patrick-anderson-wheelchair-basketball">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/wheelchair-basketball-action.png"
                  alt="Wheelchair Basketball"
                  width={1200}
                  height={600}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <h2 className="mb-2 text-2xl font-bold text-white">
                  Patrick Anderson: The Unstoppable Force of Wheelchair Basketball
                </h2>
                <p className="text-sm text-gray-300">Simeon Wakely</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
