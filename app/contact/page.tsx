import Image from "next/image"
import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Disability Sports Channel",
  description: "Get in touch with the Disability Sports Channel team for inquiries, partnerships, or support.",
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1" id="top">
        {/* Hero Section */}
        <section className="relative bg-gray-900 py-16 md:py-24">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/paralympic-collage.png"
              alt="Paralympic athletes in action across various sports"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Contact <span className="text-teal-400">Us</span>
              </h1>
              <p className="mb-8 text-xl text-gray-300">
                We'd love to hear from you. Reach out with questions, feedback, or partnership opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="bg-white py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">Get in Touch</h2>
                <p className="mb-8 text-lg text-gray-600">
                  Whether you have a question about our content, want to partner with us, or just want to say hello,
                  we're here to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-teal-100 p-3 text-teal-600">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Our Address</h3>
                      <p className="text-gray-600">40, Leopold House, Bath BA2 3GE</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-teal-100 p-3 text-teal-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Email Us</h3>
                      <a href="mailto:contact@disabilitysportschannel.co.uk" className="text-teal-600 hover:underline">
                        contact@disabilitysportschannel.co.uk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-teal-100 p-3 text-teal-600">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Call Us</h3>
                      <a href="tel:+447396852756" className="text-teal-600 hover:underline">
                        +44 7396 852756
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="mb-4 text-xl font-semibold">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/disabilitysportschannel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-teal-100 hover:text-teal-600"
                    >
                      <Facebook className="h-6 w-6" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://x.com/dschanneluk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-teal-100 hover:text-teal-600"
                    >
                      <Twitter className="h-6 w-6" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@disabilitysportschannel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-teal-100 hover:text-teal-600"
                    >
                      <Youtube className="h-6 w-6" />
                      <span className="sr-only">YouTube</span>
                    </a>
                    <a
                      href="https://www.instagram.com/disability_sports_channel/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gray-100 p-3 text-gray-600 transition-colors hover:bg-teal-100 hover:text-teal-600"
                    >
                      <Instagram className="h-6 w-6" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-lg bg-gray-50 p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-gray-900">
                        First Name
                      </label>
                      <Input
                        id="first-name"
                        placeholder="Your first name"
                        className="border-gray-300 focus-visible:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-gray-900">
                        Last Name
                      </label>
                      <Input
                        id="last-name"
                        placeholder="Your last name"
                        className="border-gray-300 focus-visible:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="border-gray-300 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-900">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="border-gray-300 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      className="min-h-[150px] border-gray-300 focus-visible:ring-teal-500"
                    />
                  </div>

                  <Button className="w-full bg-teal-600 hover:bg-teal-700">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-12 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="mx-auto max-w-4xl divide-y divide-gray-200">
              <div className="py-6">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-900">
                    <span>How can I watch your content?</span>
                    <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white group-open:rotate-180">
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
                        className="h-4 w-4"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Our content is available on our website and through our mobile apps. Some content is freely
                    available, while premium content requires a subscription. We also broadcast select events on our
                    YouTube channel.
                  </p>
                </details>
              </div>
              <div className="py-6">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-900">
                    <span>How can I submit my para sport event for coverage?</span>
                    <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white group-open:rotate-180">
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
                        className="h-4 w-4"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    We're always looking for new events to cover. Please email us at
                    events@disabilitysportschannel.co.uk with details about your event, including dates, location,
                    participating athletes, and any other relevant information.
                  </p>
                </details>
              </div>
              <div className="py-6">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-900">
                    <span>Do you offer advertising opportunities?</span>
                    <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white group-open:rotate-180">
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
                        className="h-4 w-4"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    Yes, we offer various advertising packages across our platform. Please visit our{" "}
                    <a href="/advertise" className="text-teal-600 hover:underline">
                      Advertise
                    </a>{" "}
                    page for more information or contact our advertising team at ads@disabilitysportschannel.co.uk.
                  </p>
                </details>
              </div>
              <div className="py-6">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-900">
                    <span>How can I become a contributor or journalist for DSC?</span>
                    <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white group-open:rotate-180">
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
                        className="h-4 w-4"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    We're always looking for passionate writers, journalists, and content creators who understand para
                    sports. Please send your resume, portfolio, and a cover letter to
                    careers@disabilitysportschannel.co.uk.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </>
  )
}
