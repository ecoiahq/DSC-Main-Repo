import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User } from "lucide-react"

interface ArticleCardProps {
  article: {
    id: string | number
    title: string
    excerpt: string
    image: string
    date: string
    author: string
    category: string
    url: string
    sportTags?: string[]
  }
  className?: string
}

export default function ArticleCard({ article, className = "" }: ArticleCardProps) {
  // Ensure category is always a string
  const categoryDisplay =
    typeof article.category === "string"
      ? article.category
      : article.category?.title || article.category?.name || "News"

  console.log("🎴 ArticleCard - Rendering:", {
    title: article.title,
    category: categoryDisplay,
    rawCategory: article.category,
  })

  return (
    <Card
      className={`group overflow-hidden bg-gray-900 border-gray-800 hover:border-teal-600 transition-all duration-300 ${className}`}
    >
      <Link href={article.url}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3 bg-teal-600 hover:bg-teal-700 text-white font-medium">
            {categoryDisplay}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 text-white group-hover:text-teal-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
          </div>
          {article.sportTags && article.sportTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {article.sportTags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-gray-700 text-gray-400 hover:border-teal-600 hover:text-teal-400"
                >
                  {tag.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Badge>
              ))}
              {article.sportTags.length > 2 && (
                <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                  +{article.sportTags.length - 2} more
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
