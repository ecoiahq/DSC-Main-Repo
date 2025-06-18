"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import MobileNav from "@/components/mobile-nav"
import Image from "next/image"

export default function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Sports categories with direct links to their pages
  const sportsCategories = [
    // Paralympic Summer Sports
    { name: "Para Archery", url: "/sports/para-archery" },
    { name: "Para Athletics", url: "/sports/para-athletics" },
    { name: "Para Badminton", url: "/sports/para-badminton" },
    { name: "Boccia", url: "/sports/boccia" },
    { name: "Para Canoe", url: "/sports/para-canoe" },
    { name: "Para Cycling", url: "/sports/para-cycling" },
    { name: "Para Equestrian", url: "/sports/para-equestrian" },
    { name: "Football 5-a-side", url: "/sports/football-5-a-side" },
    { name: "Goalball", url: "/sports/goalball" },
    { name: "Para Judo", url: "/sports/para-judo" },
    { name: "Para Powerlifting", url: "/sports/para-powerlifting" },
    { name: "Para Rowing", url: "/sports/para-rowing" },
    { name: "Para Shooting", url: "/sports/para-shooting" },
    { name: "Para Swimming", url: "/sports/para-swimming" },
    { name: "Para Table Tennis", url: "/sports/para-table-tennis" },
    { name: "Para Taekwondo", url: "/sports/para-taekwondo" },
    { name: "Para Triathlon", url: "/sports/para-triathlon" },
    { name: "Sitting Volleyball", url: "/sports/sitting-volleyball" },
    { name: "Wheelchair Basketball", url: "/sports/wheelchair-basketball" },
    { name: "Wheelchair Fencing", url: "/sports/wheelchair-fencing" },
    { name: "Wheelchair Rugby", url: "/sports/wheelchair-rugby" },
    { name: "Wheelchair Tennis", url: "/sports/wheelchair-tennis" },

    // Paralympic Winter Sports
    { name: "Para Alpine Skiing", url: "/sports/para-alpine-skiing" },
    { name: "Para Biathlon", url: "/sports/para-biathlon" },
    { name: "Para Cross-Country Skiing", url: "/sports/para-cross-country-skiing" },
    { name: "Para Ice Hockey", url: "/sports/para-ice-hockey" },
    { name: "Para Snowboarding", url: "/sports/para-snowboarding" },

    // Winter Olympic Sports
    { name: "Alpine Skiing", url: "/sports/alpine-skiing" },
    { name: "Biathlon", url: "/sports/biathlon" },
    { name: "Bobsleigh", url: "/sports/bobsleigh" },
    { name: "Cross-Country Skiing", url: "/sports/cross-country-skiing" },
    { name: "Curling", url: "/sports/curling" },
    { name: "Figure Skating", url: "/sports/figure-skating" },
    { name: "Freestyle Skiing", url: "/sports/freestyle-skiing" },
    { name: "Ice Hockey", url: "/sports/ice-hockey" },
    { name: "Luge", url: "/sports/luge" },
    { name: "Nordic Combined", url: "/sports/nordic-combined" },
    { name: "Skeleton", url: "/sports/skeleton" },
    { name: "Ski Jumping", url: "/sports/ski-jumping" },
    { name: "Snowboarding", url: "/sports/snowboarding" },
    { name: "Speed Skating", url: "/sports/speed-skating" },
    { name: "Short Track Speed Skating", url: "/sports/short-track-speed-skating" },

    { name: "All Sports", url: "/sports" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would redirect to search results
    console.log("Searching for:", searchQuery)
    // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="container flex h-16 items-center px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="mr-6 flex items-center">
            <Image src="/dsc-logo-main.png" alt="DSC Logo" width={360} height={120} className="h-24 w-auto" priority />
          </Link>

          {/* Primary Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/news" className="font-medium text-white hover:text-teal-400">
              News
            </Link>

            {/* Sports Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 px-2 font-medium text-white hover:text-teal-400"
                >
                  Sports
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 bg-gray-900 border border-gray-800 max-h-96 overflow-y-auto"
              >
                {sportsCategories.map((category, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link
                      href={category.url}
                      className={`hover:bg-gray-800 ${category.name === "All Sports" ? "text-teal-400" : "hover:text-teal-400"}`}
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/studios" className="font-medium text-white hover:text-teal-400">
              DSC Studios
            </Link>
            <Link href="/summit" className="font-medium text-white hover:text-teal-400">
              2025 Summit
            </Link>
            <Link href="/live" className="font-medium text-white hover:text-teal-400">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600">
                  <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400"></span>
                </span>
                Live
              </span>
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full border-gray-700 bg-gray-900 pl-8 text-sm text-white placeholder:text-gray-400 focus-visible:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Sign In Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-teal-600 text-teal-400 hover:bg-teal-950"
            >
              Sign In
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  )
}
