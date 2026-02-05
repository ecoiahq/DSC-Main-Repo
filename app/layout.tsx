import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Auxx Intelligence | Discover Your Artist DNA",
  description:
    "Identify sustainable pathways for your music career, informed by your sound. Upload your track and receive your personalized artist roadmap with genre-specific strategies for revenue, growth, and market differentiation.",
  keywords: [
    "music career",
    "artist development",
    "music business",
    "independent artist",
    "music monetization",
    "artist roadmap",
    "genre analysis",
    "music industry",
    "artist personality",
    "music strategy",
    "sync licensing",
    "music marketing",
    "artist branding",
    "music entrepreneur",
    "sustainable music career",
    "UK drill",
    "trap",
    "afrobeats",
    "lo-fi",
    "house music",
    "drum and bass",
    "indie artist",
    "music producer",
    "beat maker",
    "songwriter"
  ],
  authors: [{ name: "Auxx Intelligence" }],
  creator: "Auxx Intelligence",
  publisher: "Auxx Intelligence",
  metadataBase: new URL("https://auxx.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Auxx Intelligence | Discover Your Artist DNA",
    description: "Identify sustainable pathways for your music career, informed by your sound. Get personalized strategies for revenue, growth, and market differentiation.",
    type: "website",
    locale: "en_US",
    siteName: "Auxx Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auxx Intelligence | Discover Your Artist DNA",
    description: "Identify sustainable pathways for your music career, informed by your sound. Get personalized strategies for revenue, growth, and market differentiation.",
    creator: "@auxxintel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Music",
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  )
}
