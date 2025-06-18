import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Share2, Heart, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContentGrid from "@/components/content-grid"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"

interface VideoPageProps {
  params: {
    slug: string
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  // In a real app, you would fetch video data based on the slug
  const videoData = {
    title: "Patrick Anderson: The Unstoppable Force of Wheelchair Basketball",
    description:
      "An in-depth look at the career of wheelchair basketball legend Patrick Anderson and his impact on the sport globally.",
    views: "24.5K",
    date: "May 1, 2025",
    category: "Basketball",
    duration: "28:45",
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/" className="flex items-center gap-1 text-gray-400 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900">
            <Image src="/placeholder.svg?key=zlmmp" alt="Video thumbnail" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/90 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 rounded bg-black/70 px-2 py-1 text-xs font-medium">
              {videoData.duration}
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-2xl font-bold md:text-3xl">{videoData.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>{videoData.views} views</span>
              <span>{videoData.date}</span>
              <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-white">
                {videoData.category}
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
            <p className="mt-6 text-gray-300">{videoData.description}</p>
          </div>
        </div>
        <ContentGrid title="More Like This" />
      </main>
      <EnhancedFooter />
    </div>
  )
}
