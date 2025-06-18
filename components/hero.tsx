import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

interface HeroProps {
  title?: string
  subtitle?: string
  description?: string
  primaryAction?: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  backgroundImage?: string
  className?: string
}

export default function Hero({
  title = "Disability Sports Channel",
  subtitle = "Celebrating Athletic Excellence",
  description = "Your premier destination for disability sports coverage, featuring the latest news, live events, and inspiring stories from Paralympic and adaptive sports.",
  primaryAction = {
    text: "Watch Live",
    href: "/live",
  },
  secondaryAction = {
    text: "Browse Sports",
    href: "/sports",
  },
  backgroundImage = "/paralympic-stadium.png",
  className = "",
}: HeroProps) {
  return (
    <section className={`relative min-h-[600px] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">{title}</h1>

          <p className="text-xl md:text-2xl mb-6 font-medium text-blue-200">{subtitle}</p>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200 leading-relaxed">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a href={primaryAction.href} className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                {primaryAction.text}
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold"
              asChild
            >
              <a href={secondaryAction.href} className="flex items-center gap-2">
                {secondaryAction.text}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  )
}
