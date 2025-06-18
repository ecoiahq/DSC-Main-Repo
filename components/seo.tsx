import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  ogImage?: string
  ogType?: string
  canonicalUrl?: string
}

export default function SEO({
  title,
  description,
  ogImage = "/og-image.png",
  ogType = "website",
  canonicalUrl,
}: SEOProps) {
  // Construct the full title with site name
  const fullTitle = `${title} | Disability Sports Channel`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
  )
}
