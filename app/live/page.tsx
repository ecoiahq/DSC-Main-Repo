"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Play,
  Info,
  Calendar,
  Clock,
  Users,
  Settings,
  Volume2,
  MessageSquare,
  ChevronRight,
  Share2,
  Bookmark,
  MoreHorizontal,
  ThumbsUp,
  Award,
  Maximize2,
  PictureInPicture,
  Shield,
  Tv2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"
import StreamyardIntegration from "@/components/streamyard-integration"
import { getLiveEvents, getUpcomingEvents } from "@/lib/data-service"

export default function LivePage() {
  // Get data from our service
  const liveEvents = getLiveEvents()
  const upcomingEvents = getUpcomingEvents()
  const featuredEvent = liveEvents[0] // Use the first live event as featured

  // Add these media queries to handle mobile responsiveness
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<"featured" | "multiview">("featured")
  const [volume, setVolume] = useState(80)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [viewCount, setViewCount] = useState(featuredEvent.viewers)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "SportsLover42",
      color: "text-teal-400",
      message: "What an amazing play by Thompson!",
      time: "2 min ago",
    },
    {
      id: 2,
      user: "BasketballFan",
      color: "text-purple-400",
      message: "USA's defense is really strong today",
      time: "1 min ago",
    },
    {
      id: 3,
      user: "CanadaSupporter",
      color: "text-yellow-400",
      message: "We need to improve our shooting percentage",
      time: "1 min ago",
    },
    {
      id: 4,
      user: "Moderator",
      color: "text-blue-400",
      message: "Welcome everyone to the semifinal match! Keep the chat respectful.",
      time: "30 sec ago",
    },
    {
      id: 5,
      user: "ParaSportsFan",
      color: "text-green-400",
      message: "The skill level in this tournament has been incredible!",
      time: "just now",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [chatUsername, setChatUsername] = useState("")

  // Simulate increasing view count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      user: chatUsername || "You",
      color: "text-white",
      message: chatInput,
      time: "just now",
    }

    setChatMessages((prev) => [...prev, newMessage])
    setChatInput("")
    setChatUsername("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      {/* Live Status Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-1.5">
        <div className="container flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </div>
            <span className="text-sm font-medium">LIVE NOW: {liveEvents.length} Events</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{viewCount.toLocaleString()} Viewers</span>
            <Badge variant="outline" className="border-white/30 text-xs">
              <Clock className="mr-1 h-3 w-3" />
              <span>Live for 32 minutes</span>
            </Badge>
          </div>
        </div>
      </div>

      <main className={`flex-1 ${isFullscreen ? "pt-0" : "pt-6"}`}>
        {/* View Mode Selector */}
        {!isFullscreen && (
          <div className="container mb-4 px-4 md:px-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Live Broadcasts</h1>
              <div className="flex items-center gap-2 rounded-lg bg-gray-800 p-1">
                <Button
                  variant={viewMode === "featured" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("featured")}
                  className={viewMode === "featured" ? "bg-gray-700" : ""}
                >
                  <Tv2 className="mr-2 h-4 w-4" />
                  Featured
                </Button>
                <Button
                  variant={viewMode === "multiview" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("multiview")}
                  className={viewMode === "multiview" ? "bg-gray-700" : ""}
                >
                  <PictureInPicture className="mr-2 h-4 w-4" />
                  Multi-View
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Featured View */}
        {viewMode === "featured" && (
          <section className={`${isFullscreen ? "pt-0" : "pt-0"} relative bg-gradient-to-b from-gray-900 to-black`}>
            <div className={`container ${isFullscreen ? "px-0" : "px-4 md:px-6"}`}>
              <div
                className={`grid ${isFullscreen ? "grid-cols-1" : isMobile ? "grid-cols-1 gap-4" : "gap-8 lg:grid-cols-3"}`}
              >
                <div className={`${isFullscreen ? "" : "lg:col-span-2"} space-y-6`}>
                  {/* Video player container with proper spacing */}
                  <div className="relative overflow-hidden rounded-lg bg-gray-900">
                    {/* StreamYard Integration */}
                    <div className="relative">
                      <StreamyardIntegration
                        streamId="abcd1234"
                        fallbackImage={featuredEvent.image || "/placeholder.svg?key=u6ex1"}
                        height={isFullscreen ? "calc(100vh - 64px)" : "500px"}
                        showChat={false}
                        useOBS={true}
                      />

                      {/* Video Controls Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                            <Badge variant="destructive" className="px-2 py-0 text-xs">
                              LIVE
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
                                    onClick={() => setIsLiked(!isLiked)}
                                  >
                                    <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{isLiked ? "Unlike" : "Like"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                  >
                                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-white" : ""}`} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{isBookmarked ? "Remove Bookmark" : "Bookmark"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Share</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm"
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                  >
                                    <Maximize2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="mb-2 flex items-center gap-4">
                          <div className="flex-1">
                            <Slider defaultValue={[33]} max={100} step={1} className="h-1" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            <Slider
                              value={[volume]}
                              max={100}
                              step={1}
                              className="h-1 w-20"
                              onValueChange={(val) => setVolume(val[0])}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>00:32:15</span>
                          <span>LIVE</span>
                        </div>
                      </div>

                      {/* Live Indicator */}
                      <div className="absolute top-4 left-4 flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                        </span>
                        LIVE
                      </div>

                      {/* Quality Badge */}
                      <div className="absolute top-12 right-4 rounded bg-black/70 px-2 py-1 text-xs font-medium">
                        <div className="flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          <span>HD 1080p</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isFullscreen && (
                    <>
                      <div className="mt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge className="mb-2 bg-teal-600 text-xs">SEMIFINAL</Badge>
                            <h2 className="text-2xl font-bold">{featuredEvent.title}</h2>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bookmark className="mr-2 h-4 w-4" />
                                Save
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="mr-2 h-4 w-4" />
                                Report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg?key=d8fj2" alt="DSC" />
                              <AvatarFallback>DSC</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">DSC Sports</p>
                              <p className="text-xs text-gray-400">Official Broadcast</p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="ml-auto flex items-center gap-1 border-teal-500/30 text-teal-400"
                          >
                            <Award className="h-3 w-3" />
                            Featured Event
                          </Badge>
                        </div>

                        <p className="mt-4 text-gray-300">
                          Watch the thrilling semifinal match between USA and Canada in the Wheelchair Basketball
                          Championship. Expert commentary provided by former Paralympic gold medalist James Wilson and
                          sports journalist Sarah Chen.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>May 4, 2025</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>Started 32 minutes ago</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Users className="h-4 w-4" />
                            <span>{viewCount.toLocaleString()} viewers</span>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4">
                          <Button className="bg-teal-600 text-white hover:bg-teal-700">
                            <Play className="mr-2 h-4 w-4" />
                            Watch in HD
                          </Button>
                          <Button variant="outline" className="border-white/20 hover:bg-white/10">
                            <Info className="mr-2 h-4 w-4" />
                            Event Details
                          </Button>
                          <Button variant="ghost" className="hover:bg-white/10">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Tabs defaultValue="chat" className="w-full">
                          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                            <TabsTrigger value="chat" className="data-[state=active]:bg-gray-700">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Live Chat
                            </TabsTrigger>
                            <TabsTrigger value="stats" className="data-[state=active]:bg-gray-700">
                              <Award className="mr-2 h-4 w-4" />
                              Match Stats
                            </TabsTrigger>
                            <TabsTrigger value="info" className="data-[state=active]:bg-gray-700">
                              <Info className="mr-2 h-4 w-4" />
                              Event Info
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="chat" className="rounded-b-lg bg-gray-800 p-4">
                            <div className="h-64 overflow-y-auto rounded bg-gray-900 p-4">
                              <div className="space-y-4">
                                {chatMessages.map((msg) => (
                                  <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-2"
                                  >
                                    <div className="flex items-start gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className={`text-xs ${msg.color} bg-gray-800`}>
                                          {msg.user.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className={`text-sm font-bold ${msg.color}`}>{msg.user}</span>
                                          <span className="text-xs text-gray-500">{msg.time}</span>
                                        </div>
                                        <p className="text-sm">{msg.message}</p>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            <form onSubmit={handleChatSubmit} className="mt-4 space-y-2">
                              <input
                                type="text"
                                placeholder="Enter your username..."
                                className="w-full rounded bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                value={chatUsername}
                                onChange={(e) => setChatUsername(e.target.value)}
                                required
                              />
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Type a message..."
                                  className="flex-1 rounded bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                                  value={chatInput}
                                  onChange={(e) => setChatInput(e.target.value)}
                                />
                                <Button
                                  type="submit"
                                  className="bg-teal-600 text-white hover:bg-teal-700 whitespace-nowrap"
                                >
                                  Send
                                </Button>
                              </div>
                            </form>
                          </TabsContent>
                          <TabsContent value="stats" className="rounded-b-lg bg-gray-800 p-4">
                            <div className="grid gap-6 md:grid-cols-2">
                              <div>
                                <div className="mb-4 flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-teal-500"></div>
                                  <h3 className="font-bold">USA</h3>
                                </div>
                                <div className="space-y-4">
                                  <div className="mb-3">
                                    <div className="mb-2 flex justify-between text-sm">
                                      <span>Points</span>
                                      <span className="font-bold">42</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-teal-500" style={{ width: "60%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>Field Goal %</span>
                                      <span className="font-bold">48.3%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-teal-500" style={{ width: "48.3%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>3PT %</span>
                                      <span className="font-bold">35.7%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-teal-500" style={{ width: "35.7%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>Rebounds</span>
                                      <span className="font-bold">24</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-teal-500" style={{ width: "55%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>Assists</span>
                                      <span className="font-bold">18</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-teal-500" style={{ width: "60%" }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="mb-4 flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                                  <h3 className="font-bold">Canada</h3>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>Points</span>
                                      <span className="font-bold">38</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-red-500" style={{ width: "54%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>Field Goal %</span>
                                      <span className="font-bold">44.1%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-red-500" style={{ width: "44.1%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>3PT %</span>
                                      <span className="font-bold">31.2%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-red-500" style={{ width: "31.2%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>Rebounds</span>
                                      <span className="font-bold">22</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-red-500" style={{ width: "50%" }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-1 flex justify-between text-sm">
                                      <span>Assists</span>
                                      <span className="font-bold">15</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-gray-700">
                                      <div className="h-2 rounded-full bg-red-500" style={{ width: "50%" }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 rounded-lg bg-gray-900 p-4">
                              <h4 className="mb-3 font-bold">Top Performers</h4>
                              <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder.svg?key=p8fj2" alt="Player" />
                                    <AvatarFallback>JT</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">Jason Thompson</p>
                                    <p className="text-sm text-gray-400">USA • 16 pts, 8 reb</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder.svg?key=m4fj2" alt="Player" />
                                    <AvatarFallback>ML</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">Michael Lee</p>
                                    <p className="text-sm text-gray-400">CAN • 14 pts, 6 ast</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="info" className="rounded-b-lg bg-gray-800 p-4">
                            <div className="grid gap-6 md:grid-cols-2">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-bold">Tournament</h3>
                                  <p className="text-gray-300">2025 World Wheelchair Basketball Championship</p>
                                </div>
                                <div>
                                  <h3 className="font-bold">Stage</h3>
                                  <p className="text-gray-300">Semifinal</p>
                                </div>
                                <div>
                                  <h3 className="font-bold">Venue</h3>
                                  <p className="text-gray-300">National Paralympic Center, London, UK</p>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-bold">Commentators</h3>
                                  <div className="mt-2 flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src="/placeholder.svg?key=j2fj2" alt="James Wilson" />
                                      <AvatarFallback>JW</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">James Wilson</p>
                                      <p className="text-xs text-gray-400">Former Paralympic Gold Medalist</p>
                                    </div>
                                  </div>
                                  <div className="mt-2 flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src="/placeholder.svg?key=s2fj2" alt="Sarah Chen" />
                                      <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">Sarah Chen</p>
                                      <p className="text-xs text-gray-400">Sports Journalist</p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-bold">Broadcast Details</h3>
                                  <p className="text-gray-300">Live in 1080p HD with multi-camera setup</p>
                                  <p className="text-gray-300">Powered by StreamYard and AWS</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 rounded-lg bg-gray-900 p-4">
                              <h4 className="mb-3 font-bold">Tournament Bracket</h4>
                              <div className="overflow-x-auto pb-4">
                                <div className="min-w-[600px] pr-4">
                                  <div className="grid grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-gray-400">Quarterfinals</p>
                                      <div className="rounded border border-gray-700 p-2">
                                        <p className="text-xs font-medium text-teal-400">USA</p>
                                        <p className="text-xs">def. Australia (68-54)</p>
                                      </div>
                                      <div className="rounded border border-gray-700 p-2">
                                        <p className="text-xs font-medium text-red-400">Canada</p>
                                        <p className="text-xs">def. Spain (62-58)</p>
                                      </div>
                                      <div className="rounded border border-gray-700 p-2">
                                        <p className="text-xs font-medium text-blue-400">Great Britain</p>
                                        <p className="text-xs">def. Germany (71-65)</p>
                                      </div>
                                      <div className="rounded border border-gray-700 p-2">
                                        <p className="text-xs font-medium text-yellow-400">Japan</p>
                                        <p className="text-xs">def. France (59-57)</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-gray-400">Semifinals</p>
                                      <div className="rounded border border-gray-700 p-2">
                                        <p className="text-xs font-medium text-teal-400">USA</p>
                                        <p className="text-xs">vs. Canada</p>
                                        <p className="text-xs text-red-400">LIVE NOW</p>
                                      </div>
                                      <div className="mt-8 rounded border border-gray-700 p-2">
                                        <p className="text-xs font-medium text-blue-400">Great Britain</p>
                                        <p className="text-xs">vs. Japan</p>
                                        <p className="text-xs text-gray-400">Tomorrow, 2PM</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-gray-400">Final</p>
                                      <div className="mt-12 rounded border border-gray-700 p-2">
                                        <p className="text-xs">Winner SF1</p>
                                        <p className="text-xs">vs.</p>
                                        <p className="text-xs">Winner SF2</p>
                                        <p className="text-xs text-gray-400">May 8, 7PM</p>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-xs font-medium text-gray-400">Champion</p>
                                      <div className="mt-12 rounded border border-gray-700 p-2 text-center">
                                        <p className="text-xs">TBD</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </>
                  )}
                </div>

                {!isFullscreen && (
                  <div>
                    <h3 className="mb-4 text-xl font-bold">Also Live Now</h3>
                    <div className="mt-6 space-y-4">
                      {liveEvents.slice(1).map((event) => (
                        <Link key={event.id} href={event.url} className="group mb-4 block">
                          <div className="overflow-hidden rounded-lg bg-gray-800 transition-colors hover:bg-gray-700">
                            <div className="relative aspect-video w-full">
                              <Image
                                src={
                                  event.image || "/placeholder.svg?height=180&width=320&query=para sports live event"
                                }
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                <Image
                                  src="/placeholder.svg?height=180&width=320"
                                  alt="Play overlay"
                                  fill
                                  className="object-cover opacity-40"
                                />
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white z-10">
                                  <Play className="h-5 w-5 text-black" />
                                </div>
                              </div>
                              <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                                </span>
                                LIVE
                              </div>
                              <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium">
                                {event.viewers} watching
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="mb-1 text-xs font-medium text-gray-400">{event.category}</div>
                              <h4 className="font-medium group-hover:text-white">{event.title}</h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <h3 className="mb-4 mt-8 text-xl font-bold">Coming Up Next</h3>
                    <div className="space-y-4">
                      {upcomingEvents.slice(0, 3).map((event) => (
                        <Link key={event.id} href={event.url} className="group block">
                          <div className="overflow-hidden rounded-lg bg-gray-800 transition-colors hover:bg-gray-700">
                            <div className="relative aspect-video w-full">
                              <Image
                                src={event.image || "/placeholder.svg?height=180&width=320&query=para sports event"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                <Image
                                  src="/placeholder.svg?height=180&width=320"
                                  alt="Play overlay"
                                  fill
                                  className="object-cover opacity-40"
                                />
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white z-10">
                                  <Play className="h-5 w-5 text-black" />
                                </div>
                              </div>
                              <div className="absolute top-2 left-2 rounded bg-gray-700 px-2 py-1 text-xs font-medium text-white">
                                {event.time}
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="mb-1 text-xs font-medium text-gray-400">{event.category}</div>
                              <h4 className="font-medium group-hover:text-white">{event.title}</h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                        View Full Schedule
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Multi-View Mode */}
        {viewMode === "multiview" && !isFullscreen && (
          <section className="relative bg-gradient-to-b from-gray-900 to-black py-6">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 md:grid-cols-2">
                {liveEvents.slice(0, 4).map((event, index) => (
                  <div
                    key={event.id}
                    className={`relative mb-4 overflow-hidden rounded-lg bg-gray-900 ${
                      index === 0 ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg?height=320&width=640&query=para sports live event"}
                        alt={event.title}
                        width={640}
                        height={320}
                        className="aspect-video object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                        <Image
                          src="/placeholder.svg?height=180&width=320"
                          alt="Play overlay"
                          fill
                          className="object-cover opacity-40"
                        />
                        <Button className="bg-white text-black hover:bg-gray-200 z-10">
                          <Play className="mr-2 h-4 w-4" />
                          Watch
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                        </span>
                        LIVE
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="rounded bg-black/70 p-2">
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-xs text-gray-400">{event.category}</span>
                            <div className="flex items-center gap-1 text-xs">
                              <Users className="h-3 w-3" />
                              <span>{event.viewers} watching</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold">All Live Events</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {liveEvents.map((event) => (
                    <Link key={event.id} href={event.url} className="group">
                      <div className="overflow-hidden rounded-lg bg-gray-800 transition-colors hover:bg-gray-700">
                        <div className="relative aspect-video w-full">
                          <Image
                            src={event.image || "/placeholder.svg?height=180&width=320&query=para sports live event"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                            </span>
                            LIVE
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="mb-1 text-xs font-medium text-gray-400">{event.category}</div>
                          <h4 className="font-medium group-hover:text-white">{event.title}</h4>
                          <div className="mt-2 flex items-center justify-between">
                            <Badge variant="outline" className="border-gray-700 text-xs">
                              HD
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Users className="h-3 w-3" />
                              <span>{event.viewers} watching</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {!isFullscreen && (
          <section className="mt-8 border-t border-gray-800 py-12">
            <div className="container px-4 md:px-6">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Upcoming Live Events</h2>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  View Calendar <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} href={event.url} className="group mb-4">
                    <div className="overflow-hidden rounded-lg bg-gray-900 transition-colors hover:bg-gray-800">
                      <div className="relative aspect-video h-48">
                        <Image
                          src={event.image || "/placeholder.svg?height=320&width=600&query=para sports event"}
                          alt={event.title}
                          fill
                          className="aspect-video object-cover"
                        />
                        <div className="absolute top-2 left-2 rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white">
                          {event.time}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="mb-2 text-xs font-medium text-gray-400">{event.category}</div>
                        <h3 className="font-medium group-hover:text-white">{event.title}</h3>
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date || "May 5, 2025"}</span>
                        </div>
                        <Button className="mt-4 w-full bg-teal-600 text-white hover:bg-teal-700">Set Reminder</Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {!isFullscreen && <EnhancedFooter />}
    </div>
  )
}
