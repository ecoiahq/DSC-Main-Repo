"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Sports categories with direct links to their pages
  const sportsCategories = [
    { name: "Wheelchair Basketball", url: "/sports/wheelchair-basketball" },
    { name: "Para Athletics", url: "/sports/para-athletics" },
    { name: "Para Swimming", url: "/sports/para-swimming" },
    { name: "Sitting Volleyball", url: "/sports/sitting-volleyball" },
    { name: "Wheelchair Rugby", url: "/sports/wheelchair-rugby" },
    { name: "Para Cycling", url: "/sports/para-cycling" },
    { name: "All Sports", url: "/sports" },
  ]

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
        <Link href="/" className="flex items-center" onClick={onClose}>
          <span className="text-[48px] font-bold text-teal-400 tracking-tight">DSC</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>
      </div>

      <nav className="mt-4 px-4">
        <ul className="space-y-4">
          <li>
            <Link href="/news" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              News
            </Link>
          </li>
          <li>
            <div className="flex items-center justify-between py-2" onClick={() => toggleSection("sports")}>
              <span className="text-lg font-medium text-white">Sports</span>
              <ChevronRight
                className={`h-5 w-5 transition-transform ${expandedSection === "sports" ? "rotate-90" : ""}`}
              />
            </div>
            {expandedSection === "sports" && (
              <ul className="ml-4 mt-2 space-y-2">
                {sportsCategories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={category.url}
                      className={`block py-1 ${
                        category.name === "All Sports" ? "text-teal-400" : "text-gray-300 hover:text-teal-400"
                      }`}
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li>
            <Link href="/studios" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              DSC Studios
            </Link>
          </li>
          <li>
            <Link href="/summit" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              2025 Summit
            </Link>
          </li>
          <li>
            <Link href="/live" className="block py-2 text-lg font-medium text-white" onClick={onClose}>
              <span className="flex items-center gap-2">
                <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600">
                  <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400"></span>
                </span>
                Live
              </span>
            </Link>
          </li>
        </ul>

        <div className="mt-8 space-y-4">
          <Button className="w-full bg-teal-600 hover:bg-teal-700">Sign In</Button>
          <Button variant="outline" className="w-full border-teal-600 text-teal-400 hover:bg-teal-950">
            Sign Up
          </Button>
        </div>
      </nav>
    </div>
  )
}
