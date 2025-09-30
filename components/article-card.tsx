import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ArticleCardProps {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  category: string
  url: string
}

export function ArticleCard({ title, excerpt, image, date, author, category, url }: ArticleCardProps) {
  console.log("🎴 ArticleCard rendering:", { title, category })

  return (
    <Link href={url} className="block group">
      <Card className="overflow-hidden border-gray-800 bg-black transition-all hover:border-gray-700">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-6">
          <Badge variant="secondary" className="mb-3 bg-teal-500/10 text-teal-400 hover:bg-teal-500/20">
            {category}
          </Badge>
          <h3 className="mb-2 text-xl font-bold text-white line-clamp-2 group-hover:text-teal-400 transition-colors">
            {title}
          </h3>
          <p className="mb-4 text-gray-400 line-clamp-3">{excerpt}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <time dateTime={date}>{date}</time>
            <span>•</span>
            <span>{author}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
