import Link from "next/link"
import { ChevronLeft, Share2, Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"
import VideoPlayer from "@/components/video-player"
import { getContentGrid } from "@/lib/data-service"

export default function LiveVideoPage() {
  // Get related content
  const relatedContent = getContentGrid("Wheelchair Basketball")

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/live" className="flex items-center gap-1 text-gray-400 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              Back to Live
            </Link>
          </Button>

          {/* Video player */}
          <VideoPlayer poster="/wheelchair-basketball-action.png" isLive={true} viewerCount="12,458" />

          <div className="mt-6">
            <h1 className="text-2xl font-bold md:text-3xl">
              Paralympic Qualifiers: USA vs Canada - Wheelchair Basketball Semi-Final
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>Live from Tokyo Paralympic Arena</span>
              <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-white">
                Wheelchair Basketball
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                Like
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>
            <p className="mt-6 text-gray-300">
              Follow live coverage of the Paralympic Qualifiers semi-finals, with USA and Canada battling for a spot in
              the final. The winner will face either Great Britain or Australia in tomorrow's final.
            </p>

            {/* Live chat/commentary */}
            <div className="mt-8 rounded-lg border border-gray-800 p-4">
              <h2 className="mb-4 text-lg font-medium">Live Commentary</h2>
              <div className="space-y-4">
                <div className="rounded bg-gray-900 p-3">
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-teal-400">Q4 2:15</span> - Thompson with a huge three-pointer for
                    USA! That extends their lead to 7 points with just over 2 minutes remaining.
                  </p>
                </div>
                <div className="rounded bg-gray-900 p-3">
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-teal-400">Q4 3:42</span> - Canada calls a timeout as they look to
                    regroup after that 8-0 run from USA.
                  </p>
                </div>
                <div className="rounded bg-gray-900 p-3">
                  <p className="text-sm text-gray-300">
                    <span className="font-bold text-teal-400">Q4 5:10</span> - Anderson with a brilliant assist to
                    Miller who finishes at the rim. Canada now trailing by just 2 points.
                  </p>
                </div>
              </div>
            </div>

            {/* Related content */}
            <div className="mt-12">
              <h2 className="mb-6 text-xl font-bold">More Wheelchair Basketball</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedContent.map((item) => (
                  <Link key={item.id} href={item.url} className="group">
                    <div className="overflow-hidden rounded-lg">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
          </div>
        </div>
      </main>
      <EnhancedFooter />
    </div>
  )
}
