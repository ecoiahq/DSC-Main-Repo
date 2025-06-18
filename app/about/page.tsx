import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us | Disability Sports Channel",
  description: "Learn about the Disability Sports Channel, our mission, values, and the team behind our platform.",
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gray-900 py-16 md:py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/paralympic-collage.png"
              alt="Paralympic athletes collage"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                About <span className="text-teal-400">Disability Sports Channel</span>
              </h1>
              <p className="mb-8 text-xl text-gray-300">
                Championing para sports and athletes through innovative content, news, and entertainment.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <div className="prose prose-lg mx-auto">
                <p>
                  Disability Sports Channel specialise in digital streaming services and sports media production,
                  committed to delivering comprehensive coverage, thought leadership, and educational content on
                  disability sports. Our core mission is to address the pervasive lack of representation of people with
                  disabilities and disability sports competitions in the media.
                </p>
                <p>
                  While we acknowledge that disability sports coverage often peaks during the Paralympic Games, our
                  dedication extends to broadcasting disability sports year-round. Through our platform, we aim to
                  showcase the remarkable dedication of athletes, teams, and governing bodies who tirelessly strive for
                  recognition in a society that often overlooks their efforts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold">Inclusivity</h3>
                <p className="text-gray-600">
                  We champion diversity and ensure our platform is accessible to everyone, regardless of ability.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold">Excellence</h3>
                <p className="text-gray-600">
                  We strive for the highest quality in our content, production, and service to our community.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="m4.93 4.93 2.83 2.83"></path>
                    <path d="m16.24 16.24 2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="m4.93 19.07 2.83-2.83"></path>
                    <path d="m16.24 7.76 2.83-2.83"></path>
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold">Innovation</h3>
                <p className="text-gray-600">
                  We continuously explore new ways to showcase para sports and enhance the viewer experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-teal-600 py-16 text-white md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Join Our Community</h2>
              <p className="mb-8 text-xl">
                Be part of the movement to elevate para sports. Subscribe to our newsletter, follow us on social media,
                or reach out to collaborate.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-white text-teal-600 hover:bg-gray-100">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-teal-700">
                  <Link href="/summit">Join Our Summit</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </>
  )
}
