import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"

export const metadata = {
  title: "Advertise | Disability Sports Channel",
  description:
    "Advertise your brand on Disability Sports Channel with our social sponsorship and advertising packages.",
}

export default function AdvertisePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white" id="top">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden md:h-[50vh]">
            <Image src="/placeholder.svg?key=5xew2" alt="Advertise with DSC" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-end">
              <div className="container px-4 pb-8 md:px-6 md:pb-12">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Advertise with DSC</h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-300">
                  Connect your brand with our engaged audience of para sport enthusiasts, athletes, and supporters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Social Sponsorship & Advertising</h2>
              <p className="mt-4 text-lg text-gray-300">
                Disability Sports Channel offers a range of advertising and sponsorship opportunities to help your brand
                reach our dedicated audience. Our packages are designed to provide maximum visibility and engagement
                across our platform.
              </p>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-12 bg-gray-950">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Packages</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {/* Bronze Package */}
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 transition-transform hover:scale-[1.02]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Bronze</h3>
                  <div className="rounded-full bg-amber-900/20 px-3 py-1 text-amber-400">£500</div>
                </div>
                <p className="mb-6 text-gray-400">Perfect for small businesses looking to increase brand awareness.</p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Banner ad on DSC website (1 month)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>1 sponsored social media post</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Logo in newsletter (1 issue)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Basic analytics report</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Get Started</Button>
              </div>

              {/* Silver Package */}
              <div className="relative rounded-lg border border-gray-800 bg-gray-900 p-8 transition-transform hover:scale-[1.02]">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-teal-600 px-4 py-1 text-sm font-medium">
                  MOST POPULAR
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Silver</h3>
                  <div className="rounded-full bg-gray-300/20 px-3 py-1 text-gray-300">£1,000</div>
                </div>
                <p className="mb-6 text-gray-400">Ideal for medium-sized businesses looking for broader exposure.</p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Banner ad on DSC website (3 months)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>3 sponsored social media posts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Logo in newsletter (3 issues)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>15-second ad in 1 video content</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Detailed analytics report</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Get Started</Button>
              </div>

              {/* Gold Package */}
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 transition-transform hover:scale-[1.02]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Gold</h3>
                  <div className="rounded-full bg-yellow-600/20 px-3 py-1 text-yellow-400">£1,500</div>
                </div>
                <p className="mb-6 text-gray-400">
                  Premium package for businesses seeking maximum visibility and engagement.
                </p>
                <ul className="mb-8 space-y-3">
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Banner ad on DSC website (6 months)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>6 sponsored social media posts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Logo in newsletter (6 issues)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>30-second ad in 2 video contents</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Sponsored article on DSC website</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-teal-400" />
                    <span>Comprehensive analytics report</span>
                  </li>
                </ul>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">Get Started</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Advertise */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold">Why Advertise with DSC?</h2>
              <div className="space-y-6">
                <div className="rounded-lg bg-gray-900 p-6">
                  <h3 className="mb-3 text-xl font-bold text-teal-400">Engaged Audience</h3>
                  <p className="text-gray-300">
                    Our platform reaches over 500,000 monthly visitors who are passionate about para sports, with high
                    engagement rates across all content.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-900 p-6">
                  <h3 className="mb-3 text-xl font-bold text-teal-400">Brand Association</h3>
                  <p className="text-gray-300">
                    Associate your brand with inclusivity, determination, and excellence by partnering with the leading
                    platform for para sports content.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-900 p-6">
                  <h3 className="mb-3 text-xl font-bold text-teal-400">Multi-Platform Reach</h3>
                  <p className="text-gray-300">
                    Your message will reach our audience across our website, social media channels, newsletter, and
                    video content.
                  </p>
                </div>
                <div className="rounded-lg bg-gray-900 p-6">
                  <h3 className="mb-3 text-xl font-bold text-teal-400">Targeted Marketing</h3>
                  <p className="text-gray-300">
                    We can help you target specific demographics within our audience based on interests, location, and
                    engagement patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-teal-900/30 to-gray-900/30 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-gray-300">
                Contact our advertising team to discuss your specific needs and how we can tailor our packages to meet
                your goals.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button className="w-full bg-teal-600 px-6 py-6 text-lg font-medium hover:bg-teal-500 sm:w-auto">
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-teal-600/60 px-6 py-6 text-lg font-medium text-teal-400 hover:bg-teal-950 sm:w-auto"
                >
                  <Link href="/media-kit">Download Media Kit</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
