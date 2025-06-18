"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import Image from "next/image"
import {
  Film,
  Headphones,
  Clock,
  Calendar,
  ChevronRight,
  Check,
  Play,
  Star,
  TrendingUp,
  Award,
  Info,
  BookmarkPlus,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PremiumContentPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [showTrailer, setShowTrailer] = useState(false)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Featured content for the hero carousel
  const featuredContent = [
    {
      id: "road-to-milano",
      title: "Road to Milano-Cortina 2026",
      description:
        "Follow the journey of Paralympic athletes as they prepare for the Winter Paralympic Games in Milano-Cortina.",
      image: "/milano-cortina-2026.png",
      category: "Documentaries",
      duration: "52:18",
      rating: 4.9,
      new: true,
    },
    {
      id: "breaking-barriers",
      title: "Breaking Barriers: The Story of Wheelchair Basketball",
      description:
        "An inspiring documentary about the evolution of wheelchair basketball and the athletes who changed the game forever.",
      image: "/wheelchair-basketball-action.png",
      category: "Documentaries",
      duration: "1:24:30",
      rating: 4.8,
      new: false,
    },
    {
      id: "paralympic-journey",
      title: "The Journey to Paralympic Gold",
      description:
        "Elite athletes share their personal stories of triumph, determination and the road to Paralympic glory.",
      image: "/female-paralympic-athlete.png",
      category: "Para Sport Talks",
      duration: "42:15",
      rating: 4.7,
      new: true,
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
                src={content.image || "/placeholder.svg"}
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
                  {featuredContent[featuredIndex].new && (
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
                    onClick={() => setShowTrailer(true)}
                  >
                    <Play className="h-5 w-5" /> Watch Trailer
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

          {/* Trailer Modal */}
          {showTrailer && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <div className="relative w-full max-w-4xl aspect-video bg-black">
                <Button
                  variant="ghost"
                  className="absolute -top-12 right-0 text-white hover:bg-white/10 rounded-full p-2"
                  onClick={() => setShowTrailer(false)}
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
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <div className="text-center">
                    <p className="text-xl font-medium mb-4">Trailer would play here</p>
                    <p className="text-gray-400">This is a placeholder for the trailer video player</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

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
                          src={`/placeholder.svg?key=d05v3&key=4eb0x&height=225&width=400&query=Paralympic documentary ${item}`}
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
        <motion.section
          className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-black relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] bg-repeat opacity-5"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Subscription Plan</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Get unlimited access to all premium content with our flexible subscription options. All plans include
                AWS-powered streaming for the best viewing experience.
              </p>

              {/* Plan comparison toggle */}
              <div className="flex items-center justify-center mt-8 mb-4">
                <span className="text-gray-400 mr-3">Monthly</span>
                <div className="relative inline-block w-14 h-7 rounded-full bg-gray-800 transition-colors duration-200">
                  <input type="checkbox" id="toggle" className="sr-only peer" />
                  <label
                    htmlFor="toggle"
                    className="absolute cursor-pointer inset-0 rounded-full bg-gray-800 peer-checked:bg-teal-900 transition-colors duration-200"
                  >
                    <span className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-7"></span>
                    <span className="sr-only">Toggle billing period</span>
                  </label>
                </div>
                <span className="text-gray-400 ml-3">
                  Annual <span className="text-teal-400 text-xs font-bold">SAVE 25%</span>
                </span>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <SubscriptionCard
                  tier="Monthly"
                  price="£9.99"
                  period="per month"
                  features={[
                    "Full access to all premium content",
                    "HD streaming on all devices",
                    "New content added weekly",
                    "Cancel anytime",
                  ]}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <SubscriptionCard
                  tier="Annual"
                  price="£89.99"
                  period="per year"
                  features={[
                    "Everything in Monthly plan",
                    "Save 25% compared to monthly",
                    "Early access to new releases",
                    "Offline downloads",
                  ]}
                  isHighlighted={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                <SubscriptionCard
                  tier="Premium"
                  price="£129.99"
                  period="per year"
                  features={[
                    "Everything in Annual plan",
                    "4K Ultra HD streaming",
                    "Exclusive behind-the-scenes content",
                    "Virtual meet & greets with athletes",
                    "Discounted tickets to DSC events",
                  ]}
                />
              </motion.div>
            </div>

            {/* Plan comparison button */}
            <div className="flex justify-center mt-10">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-800 flex items-center gap-2">
                      <Info className="h-4 w-4" /> Compare Plans
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-80 p-0">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                      <h4 className="font-medium mb-2">Plan Comparison</h4>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-2">Feature</th>
                            <th className="text-center py-2">Monthly</th>
                            <th className="text-center py-2">Annual</th>
                            <th className="text-center py-2">Premium</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-1">Content Library</td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1">HD Quality</td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1">4K Quality</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1">Offline Downloads</td>
                            <td className="text-center">-</td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1">Exclusive Content</td>
                            <td className="text-center">-</td>
                            <td className="text-center">-</td>
                            <td className="text-center">
                              <Check className="h-4 w-4 mx-auto text-teal-400" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </motion.section>

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

        {/* AWS Integration Callout with Enhanced UI */}
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
                        className="text-blue-400"
                      >
                        <path d="M2 19V9a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
                        <path d="M12 12v.01" />
                        <path d="M8 12v.01" />
                        <path d="M16 12v.01" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">Powered by AWS</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Our premium content is delivered through Amazon Web Services, ensuring high-quality, reliable
                    streaming with minimal buffering. Enjoy adaptive bitrate streaming that automatically adjusts to
                    your internet connection for the best possible viewing experience.
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
                      <span>Ultra-low latency for live events</span>
                    </li>
                  </ul>
                  <Button className="bg-blue-600 hover:bg-blue-500 flex items-center gap-2">
                    Learn more about our technology
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="md:w-1/2 bg-gradient-to-br from-blue-900/20 to-gray-900 flex items-center justify-center p-8">
                  <div className="relative w-full max-w-xs aspect-square">
                    <Image
                      src="/placeholder.svg?key=kyr8u"
                      alt="AWS Cloud Technology"
                      width={300}
                      height={300}
                      className="object-contain"
                    />
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
                className="border-gray-700 hover:bg-gray-800 text-lg px-8 py-6 rounded-full"
                asChild
              >
                <Link href="#subscription-plans">View Plans</Link>
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
              : "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50"
          } rounded-full py-3 transition-all duration-300`}
          asChild
        >
          <Link href={`/premium-content/signup?plan=${tier.toLowerCase()}`}>Subscribe Now</Link>
        </Button>

        <Button
          variant="outline"
          className="w-full border-gray-700 hover:bg-gray-800 rounded-full py-3 flex items-center justify-center gap-2"
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
