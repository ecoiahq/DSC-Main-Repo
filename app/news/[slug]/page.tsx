import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { client, urlFor, sanityConfigured } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Disable static generation for now to allow dynamic routing
export const dynamic = "force-dynamic"

// Enhanced helper function to get image URL from Sanity
function getSanityImageUrl(imageField: any, width = 1200, height = 675): string {
  console.log("🖼️ getSanityImageUrl called with:", { imageField, width, height })

  if (!imageField) {
    console.log("❌ No image field provided")
    return "/placeholder.svg"
  }

  // Method 1: Check if it's already a direct asset URL
  if (imageField.asset?.url) {
    console.log("✅ Using direct asset URL:", imageField.asset.url)
    return imageField.asset.url
  }

  // Method 2: Check if it's a string URL (already processed)
  if (typeof imageField === "string") {
    if (imageField.includes("cdn.sanity.io")) {
      console.log("✅ Using existing Sanity CDN URL:", imageField)
      return imageField
    }

    // Handle local file paths
    if (imageField.startsWith("/") || imageField.startsWith("http")) {
      console.log("✅ Using local/external URL:", imageField)
      return imageField
    }
  }

  // Method 3: Use urlFor builder for Sanity assets
  if (urlFor && imageField.asset) {
    try {
      const url = urlFor(imageField).width(width).height(height).fit("crop").auto("format").url()
      console.log("✅ Generated URL with urlFor:", url)
      return url || "/placeholder.svg"
    } catch (error) {
      console.error("❌ Error with urlFor:", error)
    }
  }

  // Method 4: Build URL manually from asset reference
  if (imageField.asset?._ref && imageField.asset._ref.startsWith("image-")) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

    if (projectId && dataset) {
      const assetId = imageField.asset._ref
      // Parse asset reference: image-{id}-{dimensions}-{format}
      const match = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)

      if (match) {
        const [, id, dimensions, format] = match
        const manualUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${width}&h=${height}&fit=crop&auto=format`
        console.log("✅ Generated manual URL:", manualUrl)
        return manualUrl
      }
    }
  }

  console.log("❌ All methods failed, using placeholder")
  return "/placeholder.svg"
}

// Custom PortableText components for proper formatting
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={getSanityImageUrl(value, 800, 450) || "/placeholder.svg"}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="rounded-lg w-full"
        />
        {value.caption && <p className="text-sm text-gray-400 mt-2 text-center italic">{value.caption}</p>}
      </div>
    ),
  },
  block: {
    // Headings
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-6 mt-8 text-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mb-4 mt-6 text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mb-3 mt-5 text-white">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mb-2 mt-4 text-white">{children}</h4>,

    // Paragraphs
    normal: ({ children }: any) => <p className="mb-4 text-gray-300 leading-relaxed text-lg">{children}</p>,

    // Block quotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-teal-600 pl-6 my-6 italic text-gray-300 bg-gray-900 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Bullet lists
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">{children}</ul>,
    // Numbered lists
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    // List items
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
  marks: {
    // Bold text
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    // Italic text
    em: ({ children }: any) => <em className="italic">{children}</em>,
    // Underline
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    // Strike through
    "strike-through": ({ children }: any) => <s className="line-through">{children}</s>,
    // Code
    code: ({ children }: any) => (
      <code className="bg-gray-800 text-teal-400 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    // Links
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-teal-400 hover:text-teal-300 underline transition-colors"
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
}

async function getArticle(slug: string) {
  try {
    // Enhanced slug cleaning - handle trailing slashes and various formats
    const cleanSlug = slug.trim().replace(/\/$/, "") // Remove trailing slash
    const slugVariations = [
      cleanSlug,
      slug,
      slug.replace(/\/$/, ""), // Remove trailing slash
      slug.replace(/^%20/, "").trim(),
      decodeURIComponent(slug).trim(),
      decodeURIComponent(slug).trim().replace(/\/$/, ""),
      cleanSlug.toLowerCase(),
      slug.toLowerCase().replace(/\/$/, ""),
    ]

    console.log(`🔍 Looking for article with slug: "${slug}"`)
    console.log(`🔍 Clean slug: "${cleanSlug}"`)
    console.log(`🔍 Slug variations:`, slugVariations)

    if (sanityConfigured && client) {
      // First, let's see what posts actually exist
      const allPosts = await client.fetch(`*[_type == "post"] {
        _id,
        title,
        "slug": slug.current,
        publishedAt
      }`)
      console.log("📋 All available posts:", allPosts)

      // Enhanced query to fetch ALL image fields with comprehensive slug matching
      const postQuery = `*[_type == "post" && (
        slug.current == $slug || 
        slug.current == $cleanSlug ||
        slug.current == $decodedSlug ||
        slug.current == $trimmedSlug ||
        slug.current == $noTrailingSlash ||
        slug.current == $decodedNoTrailing
      )][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        thumbnail {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        image {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        mainImage {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        body,
        featured,
        author->{
          name
        },
        category->{
          title
        },
        sportTags
      }`

      const post = await client.fetch(postQuery, {
        slug,
        cleanSlug,
        decodedSlug: decodeURIComponent(slug).trim(),
        trimmedSlug: slug.replace(/^%20/, "").trim(),
        noTrailingSlash: slug.replace(/\/$/, ""),
        decodedNoTrailing: decodeURIComponent(slug).trim().replace(/\/$/, ""),
      })

      console.log("📄 Post query result:", post)

      if (post) {
        // Transform post to article format with proper image handling
        let excerpt = post.excerpt || "Read more about this story..."

        // If no excerpt, extract from body
        if (!post.excerpt && post.body && Array.isArray(post.body)) {
          const textBlock = post.body.find(
            (block: any) => block._type === "block" && block.children && Array.isArray(block.children),
          )
          if (textBlock) {
            const textSpan = textBlock.children.find((child: any) => child._type === "span" && child.text)
            if (textSpan && textSpan.text) {
              excerpt = textSpan.text.substring(0, 200) + "..."
            }
          }
        }

        // Get the featured image - try thumbnail, image, then mainImage
        let featuredImage = null
        if (post.thumbnail?.asset) {
          featuredImage = post.thumbnail
          console.log("📸 Using thumbnail for featured image")
        } else if (post.image?.asset) {
          featuredImage = post.image
          console.log("📸 Using image for featured image")
        } else if (post.mainImage?.asset) {
          featuredImage = post.mainImage
          console.log("📸 Using mainImage for featured image")
        }

        return {
          _id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: excerpt,
          content: post.body,
          featuredImage: featuredImage,
          publishedAt: post.publishedAt,
          author: { name: post.author?.name || "Admin" },
          category: { title: post.category?.title || "News" },
          sportTags: post.sportTags || [],
        }
      }

      // Check if there are any similar slugs (partial matching)
      const similarSlugs = await client.fetch(`*[_type == "post"] {
        "slug": slug.current,
        title,
        _type
      }`)

      console.log("🔍 All available slugs:", similarSlugs)

      // Try partial matching with all slug variations
      for (const testSlug of slugVariations) {
        const partialMatch = similarSlugs.find(
          (item: any) =>
            item.slug &&
            (item.slug.includes(testSlug) ||
              testSlug.includes(item.slug) ||
              item.slug.toLowerCase().includes(testSlug.toLowerCase()) ||
              testSlug.toLowerCase().includes(item.slug.toLowerCase())),
        )

        if (partialMatch) {
          console.log("🎯 Found partial match:", partialMatch)
          // Recursively call with the correct slug
          return getArticle(partialMatch.slug)
        }
      }

      // Try articles as fallback
      const articleQuery = `*[_type == "article" && (
        slug.current == $slug || 
        slug.current == $cleanSlug ||
        slug.current == $decodedSlug ||
        slug.current == $trimmedSlug ||
        slug.current == $noTrailingSlash ||
        slug.current == $decodedNoTrailing
      )][0] {
        _id,
        title,
        slug,
        excerpt,
        content,
        featuredImage {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        publishedAt,
        sportTags,
        author->{
          name,
          slug,
          image,
          bio
        },
        category->{
          title,
          slug
        }
      }`

      const article = await client.fetch(articleQuery, {
        slug,
        cleanSlug,
        decodedSlug: decodeURIComponent(slug).trim(),
        trimmedSlug: slug.replace(/^%20/, "").trim(),
        noTrailingSlash: slug.replace(/\/$/, ""),
        decodedNoTrailing: decodeURIComponent(slug).trim().replace(/\/$/, ""),
      })

      console.log("📰 Article query result:", article)

      if (article) return article
    }

    // Enhanced static fallback with the specific article
    const staticArticles = [
      {
        _id: "static-oceania-euro",
        title: "From Oceania to Europe: The Para Swimming World Series Makes a Splash",
        slug: { current: "from-oceania-to-europe-the-para-swimming-world-series-makes-a-splash" },
        excerpt:
          "The Para Swimming World Series continues to grow as it expands from Oceania to European venues, bringing world-class competition to new audiences and providing athletes with more opportunities to compete at the highest level.",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "The Para Swimming World Series has made a significant splash as it expands its reach from the traditional Oceania circuit to include prestigious European venues. This expansion represents a major milestone in the development of para swimming as a truly global sport.",
              },
            ],
          },
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Athletes from around the world are now benefiting from increased competition opportunities, with the European leg of the series providing new challenges and experiences. The expansion has been welcomed by swimmers, coaches, and fans alike, as it brings world-class para swimming to new audiences across Europe.",
              },
            ],
          },
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "The series continues to showcase the incredible talent and determination of para swimmers, with record-breaking performances and inspiring stories of athletic excellence. As the sport continues to grow, events like these play a crucial role in raising the profile of para swimming and inspiring the next generation of athletes.",
              },
            ],
          },
        ],
        featuredImage: "/para-swimming-competition.png",
        publishedAt: "2024-06-15T10:00:00Z",
        author: { name: "Sarah Mitchell" },
        category: { title: "Para Swimming" },
        sportTags: ["para-swimming"],
      },
      {
        _id: "static-1",
        title: "From Oceania to Euro: A Paralympic Journey",
        slug: { current: "from-oceania-to-euro" },
        excerpt:
          "Follow the incredible journey of Paralympic athletes as they transition from Oceania competitions to European championships, showcasing the global nature of Paralympic sport.",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "The Paralympic movement has always been about breaking barriers and connecting athletes across continents. This story follows several remarkable athletes who have made the transition from competing in Oceania to establishing themselves on the European Paralympic circuit.",
              },
            ],
          },
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "From the swimming pools of Australia to the athletics tracks of Germany, these athletes have shown that Paralympic sport truly knows no boundaries. Their journeys represent not just personal achievement, but the global unity that defines the Paralympic movement.",
              },
            ],
          },
        ],
        featuredImage: "/paralympic-stadium.png",
        publishedAt: "2024-06-15T10:00:00Z",
        author: { name: "Sarah Mitchell" },
        category: { title: "Paralympic Stories" },
        sportTags: ["para-athletics", "para-swimming"],
      },
    ]

    // Try to match with all slug variations
    for (const testSlug of slugVariations) {
      const found = staticArticles.find(
        (article) =>
          article.slug.current === testSlug ||
          article.slug.current.toLowerCase() === testSlug.toLowerCase() ||
          article.slug.current.includes(testSlug) ||
          testSlug.includes(article.slug.current),
      )
      if (found) {
        console.log(`✅ Found static article with slug: ${testSlug}`)
        return found
      }
    }

    console.log(`❌ No article found for any of these slugs:`, slugVariations)
    return null
  } catch (error) {
    console.error("💥 Error fetching article:", error)
    return null
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  console.log("ArticlePage called with slug:", params.slug)

  const article = await getArticle(params.slug)

  if (!article) {
    console.log("Article not found, showing 404")
    notFound()
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Use the enhanced helper function to get the proper image URL
  const imageUrl = getSanityImageUrl(article.featuredImage, 1200, 675)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <article className="py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              {/* Back Button */}
              <Button asChild variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                <Link href="/news">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>
              </Button>

              {/* Article Header */}
              <header className="mb-8">
                <div className="mb-4 inline-block rounded bg-teal-600 px-3 py-1 text-sm font-medium text-white">
                  {article.category?.title}
                </div>
                <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{article.title}</h1>
                <p className="mb-6 text-xl text-gray-300">{article.excerpt}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>By {article.author?.name}</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-8">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  width={1200}
                  height={675}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="max-w-none">
                {article.content ? (
                  <PortableText value={article.content} components={portableTextComponents} />
                ) : (
                  <p className="text-gray-300">Article content will be displayed here when available.</p>
                )}
              </div>

              {/* Sport Tags */}
              {article.sportTags && article.sportTags.length > 0 && (
                <div className="mt-8 border-t border-gray-800 pt-8">
                  <h3 className="mb-4 text-lg font-semibold">Related Sports</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.sportTags.map((tag: string) => (
                      <span key={tag} className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                        {tag.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <EnhancedFooter />
    </div>
  )
}
