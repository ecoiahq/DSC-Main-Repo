"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import Image from "next/image"
import { Film, Headphones, Clock, Calendar, ChevronRight, Check, Play, Star, TrendingUp, Award, Info, BookmarkPlus, Download, FileText, Search } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

interface VimeoVideo {
  id: string
  vimeoId: string // Vimeo video ID for API integration
  title: string
  description: string
  thumbnail: string
  category: string
  duration: string
  rating: number
  isNew?: boolean
}

interface Magazine {
  id: string
  title: string
  issue: string
  month: string
  year: string
  coverImage: string
  downloadUrl: string
  fileSize: string
  pageCount: number
}

export default function PremiumContentPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showTrailer, setShowTrailer] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VimeoVideo | null>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Featured content for the hero carousel
  const featuredContent: VimeoVideo[] = [
    {
      id: "road-to-milano",
      vimeoId: "123456789", // Replace with actual Vimeo video ID
      title: "Road to Milano-Cortina 2026",
      description:
        "Follow the journey of Paralympic athletes as they prepare for the Winter Paralympic Games in Milano-Cortina.",
      thumbnail: "/milano-cortina-2026.png",
      category: "Documentaries",
      duration: "52:18",
      rating: 4.9,
      isNew: true,
    },
    {
      id: "breaking-barriers",
      vimeoId: "987654321",
      title: "Breaking Barriers: The Story of Wheelchair Basketball",
      description:
        "An inspiring documentary about the evolution of wheelchair basketball and the athletes who changed the game forever.",
      thumbnail: "/wheelchair-basketball-action.png",
      category: "Documentaries",
      duration: "1:24:30",
      rating: 4.8,
      isNew: false,
    },
    {
      id: "paralympic-journey",
      vimeoId: "456789012",
      title: "The Journey to Paralympic Gold",
      description:
        "Elite athletes share their personal stories of triumph, determination and the road to Paralympic glory.",
      thumbnail: "/female-paralympic-athlete.png",
      category: "Para Sport Talks",
      duration: "42:15",
      rating: 4.7,
      isNew: true,
    },
  ]

  // Trending content
  const trendingContent = [
    {
      title: "Mental Health in Elite Para Sport",
      category: "Para Sport Talks",
      image: "/sports-psychology-session.png",
      type: "podcast",
      duration: "51:08",
      date: "April 10, 2025",
      trending: true,
    },
    {
      title: "Sophia Lee: Breaking Records",
      category: "Athlete Profiles",
      image: "/para-swimming-competition.png",
      type: "video",
      duration: "28:45",
      date: "March 22, 2025",
      trending: true,
    },
    {
      title: "Paralympic Legacy: London 2012",
      category: "Documentaries",
      image: "/paralympic-stadium.png",
      type: "video",
      duration: "1:12:45",
      date: "February 18, 2025",
      trending: true,
    },
    {
      title: "Dylan Alcott: Beyond Tennis",
      category: "Athlete Profiles",
      image: "/wheelchair-tennis-match.png",
      type: "video",
      duration: "35:22",
      date: "January 15, 2025",
      trending: true,
    },
  ]

  const magazines: Magazine[] = [
    {
      id: "mag-2025-05",
      title: "Paralympic Pulse",
      issue: "May 2025 Edition",
      month: "May",
      year: "2025",
      coverImage: "/magazine-may-2025.png",
      downloadUrl: "/api/download/magazine/2025-05", // Will connect to API
      fileSize: "24.5 MB",
      pageCount: 68,
    },
    {
      id: "mag-2025-04",
      title: "Paralympic Pulse",
      issue: "April 2025 Edition",
      month: "April",
      year: "2025",
      coverImage: "/magazine-april-2025.png",
      downloadUrl: "/api/download/magazine/2025-04",
      fileSize: "22.8 MB",
      pageCount: 64,
    },
    {
      id: "mag-2025-03",
      title: "Paralympic Pulse",
      issue: "March 2025 Edition",
      month: "March",
      year: "2025",
      coverImage: "/magazine-march-2025.png",
      downloadUrl: "/api/download/magazine/2025-03",
      fileSize: "26.1 MB",
      pageCount: 72,
    },
    {
      id: "mag-2025-02",
      title: "Paralympic Pulse",
      issue: "February 2025 Edition",
      month: "February",
      year: "2025",
      coverImage: "/magazine-feb-2025.png",
      downloadUrl: "/api/download/magazine/2025-02",
      fileSize: "23.4 MB",
      pageCount: 66,
    },
  ]

  // Auto-rotate featured content
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredContent.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [featuredContent.length])

  // Animation loading effect
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setActiveCategory(value)
  }

  const openVideoPlayer = (video: VimeoVideo) => {
    setSelectedVideo(video)
    setShowTrailer(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Carousel Section */}
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden border-b border-gray-800/50">
          {/* Background image and overlay with animated gradient */}
          {featuredContent.map((content, index) => (
            <motion.div
              key={content.id}
              className="absolute inset-0 z-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: featuredIndex === index ? 1 : 0,
                scale: featuredIndex === index ? 1 : 1.05,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/70 z-10"></div>
              <Image
                src={content.thumbnail || "/placeholder.svg"}
                alt={content.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          ))}

          {/* Content */}
          <div className="container relative z-10 mx-auto px-4 md:px-6 h-full flex items-center">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                key={featuredContent[featuredIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-teal-600 hover:bg-teal-500 px-3 py-1 text-xs font-semibold">
                    {featuredContent[featuredIndex].category}
                  </Badge>
                  {featuredContent[featuredIndex].isNew && (
                    <Badge className="bg-red-600 hover:bg-red-500 px-3 py-1 text-xs font-semibold">NEW</Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  {featuredContent[featuredIndex].title}
                </h1>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-teal-400" />
                    <span>{featuredContent[featuredIndex].duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{featuredContent[featuredIndex].rating}/5</span>
                  </div>
                </div>

                <p className="text-xl text-gray-300 mb-8">{featuredContent[featuredIndex].description}</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-teal-600 hover:bg-teal-500 text-lg px-8 py-6 rounded-full shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
                    onClick={() => openVideoPlayer(featuredContent[featuredIndex])}
                  >
                    <Play className="h-5 w-5" /> Watch Now
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Carousel Navigation */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
              {featuredContent.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    featuredIndex === index ? "bg-teal-500 w-8" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  onClick={() => setFeaturedIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {showTrailer && selectedVideo && (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
              <div className="relative w-full max-w-6xl">
                <Button
                  variant="ghost"
                  className="absolute -top-12 right-0 text-white hover:bg-white/10 rounded-full p-2"
                  onClick={() => {
                    setShowTrailer(false)
                    setSelectedVideo(null)
                  }}
                >
                  <span className="sr-only">Close</span>
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
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
                
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-gray-800">
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 p-8">
                    <Film className="h-16 w-16 text-teal-500 mb-4" />
                    <p className="text-xl font-medium mb-2 text-center">{selectedVideo.title}</p>
                    <p className="text-gray-400 text-center mb-6">Vimeo Video ID: {selectedVideo.vimeoId}</p>
                    <div className="bg-gray-800 rounded-lg p-4 max-w-2xl">
                      <p className="text-sm text-gray-300 mb-2">
                        <strong>Integration Ready:</strong> Replace the content below with:
                      </p>
                      <code className="text-xs text-teal-400 block bg-black p-3 rounded">
                        {`<iframe
  src="https://player.vimeo.com/video/${selectedVideo.vimeoId}?autoplay=1"
  width="100%"
  height="100%"
  frameborder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
></iframe>`}
                      </code>
                    </div>
                  </div>
                  {/* When ready, replace above with actual Vimeo embed */}
                </div>

                <div className="mt-4 bg-gray-900 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{selectedVideo.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedVideo.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{selectedVideo.rating}/5</span>
                    </div>
                    <Badge className="bg-teal-600">{selectedVideo.category}</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-teal-500" />
                <h2 className="text-2xl md:text-3xl font-bold">Monthly Magazine</h2>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search issues..."
                  className="pl-10 bg-gray-900 border-gray-800 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {magazines.map((magazine, index) => (
                <motion.div
                  key={magazine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-teal-900/50 transition-all duration-300 overflow-hidden group h-full flex flex-col">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={magazine.coverImage || `/placeholder.svg?height=400&width=300&query=Paralympic magazine cover ${magazine.month} ${magazine.year}`}
                        alt={magazine.issue}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-teal-600 hover:bg-teal-500">New Issue</Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold mb-1">{magazine.title}</h3>
                        <p className="text-sm text-gray-300">{magazine.issue}</p>
                      </div>
                    </div>

                    <CardContent className="p-4 flex-grow">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{magazine.pageCount} pages</span>
                        </div>
                        <span className="text-xs">{magazine.fileSize}</span>
                      </div>
                      <p className="text-sm text-gray-400">
                        Exclusive interviews, athlete profiles, and in-depth coverage of Paralympic sports.
                      </p>
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      <Button 
                        className="w-full bg-teal-600 hover:bg-teal-500 flex items-center justify-center gap-2"
                        asChild
                      >
                        <a href={magazine.downloadUrl} download>
                          <Download className="h-4 w-4" /> Download PDF
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                View Archive <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Trending Now Section */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-red-500" />
                <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
              </div>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingContent.map((content, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <TrendingContentCard
                    title={content.title}
                    category={content.category}
                    image={content.image}
                    type={content.type}
                    duration={content.duration}
                    date={content.date}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Award-Winning Content */}
        <motion.section
          className="py-16 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent opacity-40"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <Award className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl md:text-3xl font-bold">Award-Winning Documentaries</h2>
            </div>

            <div className="relative">
              <div className="flex overflow-x-auto pb-8 space-x-6 scrollbar-hide snap-x">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex-none w-[300px] md:w-[400px] snap-start">
                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-teal-900/50 transition-all duration-300 group">
                      <div className="relative aspect-video">
                        <Image
                          src={`/paralympic-documentary-.jpg?key=d05v3&key=4eb0x&height=225&width=400&query=Paralympic documentary ${item}`}
                          alt={`Award winning documentary ${item}`}
                          width={400}
                          height={225}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-yellow-600 hover:bg-yellow-500">Award Winner</Badge>
                          </div>
                          <h3 className="text-lg font-bold">Paralympic Heroes: The Untold Story {item}</h3>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                          <Button className="bg-teal-600 hover:bg-teal-500 rounded-full w-12 h-12 flex items-center justify-center">
                            <Play className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>1:15:30</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>4.8/5</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          An inspiring journey through the challenges and triumphs of Paralympic athletes.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className={`w-2 h-2 rounded-full ${item === 1 ? "bg-teal-500" : "bg-gray-600"}`} />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Content Categories with Enhanced UI */}
        <motion.section
          className="py-16 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Explore Premium Content
            </h2>

            <Tabs defaultValue="all" className="w-full" value={activeCategory} onValueChange={handleCategoryChange}>
              <div className="flex justify-center mb-8">
                <TabsList className="bg-gray-900/50 backdrop-blur-sm rounded-full p-1.5 border border-gray-800/50">
                  <TabsTrigger value="all" className="rounded-full px-6 py-2 data-[state=active]:bg-teal-600">
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="para-sport-talks"
                    className="rounded-full px-6 py-2 data-[state=active]:bg-teal-600"
                  >
                    Para Sport Talks
                  </TabsTrigger>
                  <TabsTrigger value="documentaries" className="rounded-full px-6 py-2 data-[state=active]:bg-teal-600">
                    Documentaries
                  </TabsTrigger>
                  <TabsTrigger
                    value="athlete-profiles"
                    className="rounded-full px-6 py-2 data-[state=active]:bg-teal-600"
                  >
                    Athlete Profiles
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ContentCard
                    title="The Journey to Paralympic Gold"
                    category="Para Sport Talks"
                    image="/female-paralympic-athlete.png"
                    type="podcast"
                    duration="42:15"
                    date="May 1, 2025"
                    featured={true}
                  />
                  <ContentCard
                    title="Breaking Barriers: The Story of Wheelchair Basketball"
                    category="Documentaries"
                    image="/wheelchair-basketball-action.png"
                    type="video"
                    duration="1:24:30"
                    date="April 15, 2025"
                  />
                  <ContentCard
                    title="Mental Health in Elite Para Sport"
                    category="Para Sport Talks"
                    image="/sports-psychology-session.png"
                    type="podcast"
                    duration="51:08"
                    date="April 10, 2025"
                  />
                  <ContentCard
                    title="Sophia Lee: Breaking Records"
                    category="Athlete Profiles"
                    image="/para-swimming-competition.png"
                    type="video"
                    duration="28:45"
                    date="March 22, 2025"
                  />
                  <ContentCard
                    title="Technology in Para Sports"
                    category="Para Sport Talks"
                    image="/placeholder.svg?key=10jt4"
                    type="podcast"
                    duration="45:22"
                    date="April 17, 2025"
                  />
                  <ContentCard
                    title="Road to Milano-Cortina 2026"
                    category="Documentaries"
                    image="/milano-cortina-2026.png"
                    type="video"
                    duration="52:18"
                    date="March 5, 2025"
                    featured={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="para-sport-talks" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ContentCard
                    title="The Journey to Paralympic Gold"
                    category="Para Sport Talks"
                    image="/female-paralympic-athlete.png"
                    type="podcast"
                    duration="42:15"
                    date="May 1, 2025"
                    featured={true}
                  />
                  <ContentCard
                    title="Mental Health in Elite Para Sport"
                    category="Para Sport Talks"
                    image="/sports-psychology-session.png"
                    type="podcast"
                    duration="51:08"
                    date="April 10, 2025"
                  />
                  <ContentCard
                    title="Technology in Para Sports"
                    category="Para Sport Talks"
                    image="/placeholder.svg?key=jfn6f"
                    type="podcast"
                    duration="45:22"
                    date="April 17, 2025"
                  />
                  <ContentCard
                    title="Coaching Elite Para Athletes"
                    category="Para Sport Talks"
                    image="/placeholder.svg?key=48n2k"
                    type="podcast"
                    duration="38:50"
                    date="April 24, 2025"
                  />
                  <ContentCard
                    title="Breaking Barriers in Para Swimming"
                    category="Para Sport Talks"
                    image="/para-swimming-competition.png"
                    type="podcast"
                    duration="39:45"
                    date="April 3, 2025"
                  />
                  <ContentCard
                    title="The Business of Para Sports"
                    category="Para Sport Talks"
                    image="/placeholder.svg?key=zh6l0"
                    type="podcast"
                    duration="47:30"
                    date="March 27, 2025"
                  />
                </div>
              </TabsContent>

              <TabsContent value="documentaries" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ContentCard
                    title="Breaking Barriers: The Story of Wheelchair Basketball"
                    category="Documentaries"
                    image="/wheelchair-basketball-action.png"
                    type="video"
                    duration="1:24:30"
                    date="April 15, 2025"
                  />
                  <ContentCard
                    title="Road to Milano-Cortina 2026"
                    category="Documentaries"
                    image="/milano-cortina-2026.png"
                    type="video"
                    duration="52:18"
                    date="March 5, 2025"
                    featured={true}
                  />
                  <ContentCard
                    title="Paralympic Legacy: London 2012"
                    category="Documentaries"
                    image="/paralympic-stadium.png"
                    type="video"
                    duration="1:12:45"
                    date="February 18, 2025"
                  />
                </div>
              </TabsContent>

              <TabsContent value="athlete-profiles" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ContentCard
                    title="Sophia Lee: Breaking Records"
                    category="Athlete Profiles"
                    image="/para-swimming-competition.png"
                    type="video"
                    duration="28:45"
                    date="March 22, 2025"
                  />
                  <ContentCard
                    title="John Stubbs: The Para Archery Legend"
                    category="Athlete Profiles"
                    image="/para-archery-competition.png"
                    type="video"
                    duration="32:10"
                    date="February 28, 2025"
                  />
                  <ContentCard
                    title="Dylan Alcott: Beyond Tennis"
                    category="Athlete Profiles"
                    image="/wheelchair-tennis-match.png"
                    type="video"
                    duration="35:22"
                    date="January 15, 2025"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.section>

        {/* Coming Soon Section */}
        <motion.section
          className="py-16 bg-gradient-to-b from-black to-gray-950 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] bg-repeat opacity-5"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="h-6 w-6 text-purple-500" />
              <h2 className="text-2xl md:text-3xl font-bold">Coming Soon</h2>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative aspect-video md:aspect-auto">
                  <Image
                    src="/placeholder.svg?key=3auux"
                    alt="Coming Soon: Winter Paralympic Champions"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent md:bg-gradient-to-l"></div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <Badge className="bg-purple-600 hover:bg-purple-500 w-fit mb-4">Coming June 2025</Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Winter Paralympic Champions</h3>
                  <p className="text-gray-300 mb-6">
                    An exclusive documentary series following the world's best Paralympic winter sport athletes as they
                    push the boundaries of what's possible on snow and ice.
                  </p>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-white">28</span>
                      <span className="text-xs text-gray-400">Days</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-white">14</span>
                      <span className="text-xs text-gray-400">Hours</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-white">36</span>
                      <span className="text-xs text-gray-400">Minutes</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold text-white">52</span>
                      <span className="text-xs text-gray-400">Seconds</span>
                    </div>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-500 rounded-full flex items-center gap-2 w-fit">
                    <BookmarkPlus className="h-5 w-5" /> Get Notified
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Subscription Plans with Interactive Elements */}

        {/* Testimonials Section */}
        <motion.section
          className="py-16 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Subscribers Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "The premium content is absolutely worth it. I've learned so much about Paralympic sports and the athletes' journeys.",
                  name: "Sarah Johnson",
                  title: "Subscriber since 2024",
                  avatar: "/woman-portrait.png",
                },
                {
                  quote:
                    "As a coach, the technical analysis and behind-the-scenes content has been invaluable for my training programs.",
                  name: "Michael Chen",
                  title: "Para Swimming Coach",
                  avatar: "/asian-man-portrait.png",
                },
                {
                  quote:
                    "The documentaries are inspiring and the streaming quality is excellent. Best subscription I've made this year!",
                  name: "Emma Williams",
                  title: "Sports Enthusiast",
                  avatar: "/young-woman-portrait.png",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 md:p-8"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <svg className="h-8 w-8 text-teal-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                      </svg>
                      <p className="text-gray-300">{testimonial.quote}</p>
                    </div>
                    <div className="mt-auto flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="py-16 md:py-20 border-t border-gray-800/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                      <Film className="text-blue-400" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Powered by Vimeo</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Our premium video content is delivered through Vimeo's professional video platform, ensuring 
                    high-quality, reliable streaming with advanced player controls. Enjoy adaptive bitrate streaming 
                    that automatically adjusts to your internet connection for the best possible viewing experience.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-teal-400" />
                      <span>Adaptive bitrate streaming</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-teal-400" />
                      <span>Global content delivery network</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-teal-400" />
                      <span>4K HDR support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-teal-400" />
                      <span>Advanced player customization</span>
                    </li>
                  </ul>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-2"><strong>For Developers:</strong></p>
                    <p className="text-xs text-gray-400">
                      Videos are embedded using Vimeo's Player API. Connect your Vimeo account and update video IDs 
                      in the content configuration to integrate your library.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-blue-900/20 to-gray-900 flex items-center justify-center p-8">
                  <div className="text-center">
                    <svg viewBox="0 0 24 24" className="w-32 h-32 mx-auto mb-4" fill="currentColor">
                      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                    </svg>
                    <p className="text-2xl font-bold text-blue-400">Vimeo Professional</p>
                    <p className="text-gray-400 mt-2">High-quality video hosting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Ready to Start Your Premium Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of subscribers enjoying exclusive Paralympic content. Choose a plan that works for you.
            </p>
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-gray-700 hover:bg-gray-800 text-lg px-8 py-6 rounded-full bg-transparent"
                asChild
              >
                <Link href="/membership-plans">View Plans</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <EnhancedFooter />
    </div>
  )
}

interface ContentCardProps {
  title: string
  category: string
  image: string
  type: "video" | "podcast"
  duration: string
  date: string
  featured?: boolean
}

function ContentCard({ title, category, image, type, duration, date, featured = false }: ContentCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
      <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-teal-900/50 transition-all duration-300 overflow-hidden group">
        <div className="relative aspect-video">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

          {featured && (
            <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-md">
              Featured
            </div>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-600/90 flex items-center justify-center">
              {type === "video" ? (
                <Film className="h-4 w-4 text-white" />
              ) : (
                <Headphones className="h-4 w-4 text-white" />
              )}
            </div>
            <span className="text-sm font-medium text-white">{category}</span>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
            <Button className="bg-teal-600 hover:bg-teal-500 rounded-full w-12 h-12 flex items-center justify-center">
              {type === "video" ? <Play className="h-5 w-5" /> : <Headphones className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700/50 group-hover:bg-teal-700 group-hover:border-teal-600/50 transition-colors duration-300">
            {type === "video" ? "Watch Now" : "Listen Now"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function TrendingContentCard({ title, category, image, type, duration, date }: ContentCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-red-900/50 rounded-lg overflow-hidden group">
        <div className="relative aspect-video">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-md flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Trending
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gray-800/80 hover:bg-gray-700/80 text-xs">{category}</Badge>
              <Badge className="bg-gray-800/80 hover:bg-gray-700/80 text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" /> {duration}
              </Badge>
            </div>
            <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
            <Button className="bg-red-600 hover:bg-red-500 rounded-full w-12 h-12 flex items-center justify-center">
              {type === "video" ? <Play className="h-5 w-5" /> : <Headphones className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface SubscriptionCardProps {
  tier: string
  price: string
  period: string
  features: string[]
  isHighlighted?: boolean
}

function SubscriptionCard({ tier, price, period, features, isHighlighted = false }: SubscriptionCardProps) {
  return (
    <div
      className={`${
        isHighlighted ? "border-2 border-teal-500/70 -mt-4 mb-4" : "border border-gray-800/50"
      } bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm rounded-xl p-8 transition-all duration-300 hover:border-teal-500/50 h-full flex flex-col`}
    >
      {isHighlighted && (
        <div className="bg-teal-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4 shadow-lg shadow-teal-900/20">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-bold text-teal-400 mb-2">{tier}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {price}
        </span>
        <span className="text-gray-400 ml-2">{period}</span>
      </div>

      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-teal-900/30 flex items-center justify-center">
              <Check className="h-3 w-3 text-teal-400" />
            </div>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3 mt-auto">
        <Button
          className={`w-full ${
            isHighlighted
              ? "bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-900/20"
              : "bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700 border border-gray-200"
          } rounded-full py-3 transition-all duration-300`}
          asChild
        >
          <Link href={`/premium-content/signup?plan=${tier.toLowerCase()}`}>Subscribe Now</Link>
        </Button>

        <Button
          variant="outline"
          className="w-full border-gray-700 hover:bg-gray-800 rounded-full py-3 flex items-center justify-center gap-2 bg-transparent"
          asChild
        >
          <Link href={`/premium-content/preview?plan=${tier.toLowerCase()}`}>
            <Play className="h-4 w-4" /> Preview Content
          </Link>
        </Button>
      </div>
    </div>
  )
}
