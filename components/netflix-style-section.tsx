"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"

export default function NetflixStyleSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate a brief loading state before redirecting
    setTimeout(() => {
      // Store email in session storage to use it on the next page
      sessionStorage.setItem("dsc_user_email", email)
      router.push(`/membership-plans?email=${encodeURIComponent(email)}`)
    }, 500)
  }

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden py-20">
      {/* Using Image component directly for better control */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/paralympic-collage.png"
          alt="Paralympic athletes collage"
          fill
          priority
          className="object-cover"
          style={{
            filter: "brightness(0.4) blur(3px)",
          }}
        />
      </div>

      {/* Simple gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-600/40 px-5 py-2 backdrop-blur-md mb-8 border border-teal-500/30 shadow-lg shadow-teal-900/20">
          <div className="h-2.5 w-2.5 rounded-full bg-teal-400 animate-pulse"></div>
          <span className="text-sm font-semibold tracking-wide text-teal-300">DSC PREMIUM</span>
        </div>

        <h2 className="max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl text-white [text-shadow:_0_1px_10px_rgba(20,184,166,0.15)]">
          Unlimited para sports, documentaries and more
        </h2>

        <p className="mt-6 text-xl text-white/90 max-w-2xl">
          Stream live events, watch exclusive documentaries, and enjoy on-demand content featuring the world's best para
          athletes.
        </p>

        <p className="mt-4 text-lg font-medium text-teal-400">Starts at £4.99. Cancel at any time.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 max-w-2xl w-full">
          <div className="flex items-center gap-4 bg-gray-900/40 backdrop-blur-md p-4 rounded-lg border border-gray-700/50 shadow-lg shadow-black/20 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-400"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-white">Exclusive Content</h3>
              <p className="text-sm text-gray-300">Access Para Sport Talks and premium documentaries</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-900/40 backdrop-blur-md p-4 rounded-lg border border-gray-700/50 shadow-lg shadow-black/20 hover:bg-gray-800/50 transition-all duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-teal-400"
              >
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-white">Global Coverage</h3>
              <p className="text-sm text-gray-300">Access content from paralympic events worldwide</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full max-w-lg">
          <p className="mb-4 text-gray-300">Ready to watch? Enter your email to create or restart your membership.</p>

          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 border-gray-700/50 bg-gray-900/40 text-white backdrop-blur-md focus-visible:ring-teal-500 shadow-inner shadow-black/20"
                required
              />
              {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 bg-teal-600 px-6 text-lg font-medium hover:bg-teal-500 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-900/30 hover:shadow-teal-900/40 hover:scale-[1.02]"
            >
              {isSubmitting ? "Processing..." : "Get Started"}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
