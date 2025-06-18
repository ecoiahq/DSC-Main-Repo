import EnhancedFooter from "@/components/enhanced-footer"
import BBCSportSection from "@/components/bbc-sport-section"
import NewsletterBanner from "@/components/newsletter-banner"
import NetflixStyleSection from "@/components/netflix-style-section"
import SiteHeader from "@/components/site-header"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Section 1: BBC Sport Style with dark theme (Featured Stories) */}
        <BBCSportSection />

        {/* Section 2: Enhanced Netflix Style with dark theme (Unlimited para sports) */}
        <NetflixStyleSection />

        {/* Section 4: Newsletter Banner with dark theme */}
        <NewsletterBanner />
      </main>
      <EnhancedFooter />
    </div>
  )
}
