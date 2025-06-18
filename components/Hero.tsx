import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  children?: React.ReactNode
}

export default function Hero({
  title = "Welcome to Disability Sports Channel",
  subtitle = "Your premier destination for Paralympic and disability sports coverage",
  backgroundImage = "/paralympic-stadium.png",
  children,
}: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">{subtitle}</p>
        {children || (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/premium-content">Watch Premium Content</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
            >
              <Link href="/sports">Explore Sports</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
