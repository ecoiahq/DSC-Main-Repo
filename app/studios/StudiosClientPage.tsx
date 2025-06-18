"use client"

import Image from "next/image"
import { Play, Camera, Film, Edit, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"

export default function StudiosClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
            <Image
              src="/placeholder.svg?key=lh57w"
              alt="DSC Studios Production Set"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container px-4 md:px-6">
                <div className="max-w-3xl">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                    <Camera className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-white">PRODUCTION SERVICES</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">DSC Studios</h1>
                  <p className="mt-4 max-w-2xl text-xl text-gray-300">
                    Our in-house production team creating compelling content for broadcasters and organizations with a
                    shared commitment to diversity, equity, and inclusion.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button
                      className="bg-white text-black hover:bg-gray-200"
                      onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Our Services
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/60 text-white hover:bg-white/10"
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Work With Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                DSC Studios offers a comprehensive range of production services tailored to meet the needs of
                broadcasters and organizations committed to inclusive storytelling.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-gray-900 p-6 transition-transform hover:scale-[1.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <Film className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Documentary Production</h3>
                <p className="text-gray-400">
                  From concept to delivery, we create compelling documentaries that tell powerful stories of athletes,
                  events, and the broader impact of para sports.
                </p>
              </div>

              <div className="rounded-lg bg-gray-900 p-6 transition-transform hover:scale-[1.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Live Event Coverage</h3>
                <p className="text-gray-400">
                  Expert multi-camera coverage of sporting events, conferences, and ceremonies with professional
                  commentary, graphics, and streaming capabilities.
                </p>
              </div>

              <div className="rounded-lg bg-gray-900 p-6 transition-transform hover:scale-[1.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="M12 13V7" />
                    <path d="M15 10h-6" />
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Corporate Content</h3>
                <p className="text-gray-400">
                  High-quality branded content, promotional videos, and CSR campaigns that showcase your organization's
                  commitment to diversity and inclusion.
                </p>
              </div>

              <div className="rounded-lg bg-gray-900 p-6 transition-transform hover:scale-[1.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
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
                    className="h-6 w-6 text-white"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold">Athlete Profiles</h3>
                <p className="text-gray-400">
                  Intimate and inspiring profiles of para athletes, highlighting their journeys, challenges, and
                  achievements both in and out of competition.
                </p>
              </div>

              <div className="rounded-lg bg-gray-900 p-6 transition-transform hover:scale-[1.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <Edit className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Post-Production</h3>
                <p className="text-gray-400">
                  Comprehensive editing, color grading, sound design, and motion graphics services to elevate your
                  content to broadcast-quality standards.
                </p>
              </div>

              <div className="rounded-lg bg-gray-900 p-6 transition-transform hover:scale-[1.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Consultation</h3>
                <p className="text-gray-400">
                  Expert advice on inclusive storytelling, accessible production practices, and authentic representation
                  of disability in media.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="bg-gray-950 py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Work</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Explore our portfolio of award-winning productions that have been broadcast internationally and helped
                organizations tell powerful stories.
              </p>
            </div>

            <Tabs defaultValue="documentaries" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-3 bg-gray-900">
                <TabsTrigger value="documentaries">Documentaries</TabsTrigger>
                <TabsTrigger value="events">Event Coverage</TabsTrigger>
                <TabsTrigger value="corporate">Corporate</TabsTrigger>
              </TabsList>

              <TabsContent value="documentaries">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <PortfolioItem
                    title="Rising Phoenix"
                    description="The story of the Paralympic Games and how they impact global understanding of disability and sport."
                    image="/placeholder.svg?key=ertim"
                    client="Netflix"
                  />
                  <PortfolioItem
                    title="Beyond Limits"
                    description="Following three athletes as they prepare for the World Para Athletics Championships."
                    image="/placeholder.svg?key=kh7wg"
                    client="BBC"
                  />
                  <PortfolioItem
                    title="The Chair Coach"
                    description="An intimate portrait of wheelchair basketball coach James Peterson and his journey to the Paralympics."
                    image="/placeholder.svg?key=hrgqv"
                    client="Channel 4"
                  />
                </div>
              </TabsContent>

              <TabsContent value="events">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <PortfolioItem
                    title="World Para Swimming Championships"
                    description="Complete live coverage of the 2024 World Para Swimming Championships in Manchester."
                    image="/para-swimming-competition.png"
                    client="World Para Swimming"
                  />
                  <PortfolioItem
                    title="Wheelchair Rugby World Cup"
                    description="Multi-camera coverage of the 2023 Wheelchair Rugby World Cup including highlights packages."
                    image="/placeholder.svg?key=qzx0g"
                    client="International Wheelchair Rugby Federation"
                  />
                  <PortfolioItem
                    title="Para Athletics Grand Prix"
                    description="Live broadcast of the Para Athletics Grand Prix series across Europe."
                    image="/para-athletics-track.png"
                    client="European Paralympic Committee"
                  />
                </div>
              </TabsContent>

              <TabsContent value="corporate">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <PortfolioItem
                    title="Inclusive Design"
                    description="A series highlighting Toyota's commitment to mobility solutions for all abilities."
                    image="/placeholder.svg?height=600&width=800"
                    client="Toyota"
                  />
                  <PortfolioItem
                    title="Beyond Barriers"
                    description="CSR campaign showcasing how Allianz supports para athletes and promotes inclusion."
                    image="/placeholder.svg?height=600&width=800"
                    client="Allianz"
                  />
                  <PortfolioItem
                    title="Workplace Inclusion"
                    description="Training videos on creating accessible and inclusive work environments."
                    image="/placeholder.svg?height=600&width=800"
                    client="Microsoft"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12 text-center">
              <Button className="bg-white text-black hover:bg-gray-200">
                View More Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-950 py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                At DSC Studios, our work is guided by a deep commitment to diversity, equity, inclusion, and corporate
                social responsibility.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-gray-900 p-8">
                <h3 className="mb-4 text-2xl font-bold text-white">Diversity, Equity & Inclusion</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Authentic Representation:</span> We ensure authentic representation
                      both in front of and behind the camera.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Inclusive Production:</span> Our sets and production processes are
                      designed to be accessible for all team members.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Diverse Perspectives:</span> We actively seek out and amplify diverse
                      voices and perspectives in our storytelling.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Talent Development:</span> We invest in training and mentorship for
                      underrepresented groups in the film and television industry.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-gray-900 p-8">
                <h3 className="mb-4 text-2xl font-bold text-white">Corporate Social Responsibility</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Environmental Sustainability:</span> We implement sustainable
                      production practices to minimize our environmental impact.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Community Engagement:</span> We actively engage with and give back to
                      the communities whose stories we tell.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Ethical Partnerships:</span> We collaborate only with organizations
                      that share our commitment to inclusion and social responsibility.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                      ✓
                    </div>
                    <p className="text-gray-300">
                      <span className="font-bold">Knowledge Sharing:</span> We openly share our learnings and best
                      practices for inclusive production with the wider industry.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Client Testimonials</h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                Hear what our clients have to say about working with DSC Studios.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Testimonial
                quote="DSC Studios brought a level of authenticity and expertise to our Paralympic coverage that truly elevated the storytelling. Their understanding of para sports is unmatched."
                author="Emma Richards"
                role="Head of Sports Programming, BBC"
              />
              <Testimonial
                quote="Working with DSC Studios on our corporate inclusion campaign was transformative. They helped us tell our story in a way that was both authentic and impactful."
                author="David Chen"
                role="Chief Diversity Officer, Allianz"
              />
              <Testimonial
                quote="The team at DSC Studios has a unique ability to capture the essence of para sport. Their technical expertise combined with their commitment to authentic representation made them the perfect partner."
                author="Sophie Martinez"
                role="Communications Director, International Paralympic Committee"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gray-950 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Work With Us</h2>
              <p className="mt-4 text-gray-400">
                Interested in collaborating with DSC Studios? Get in touch to discuss your project and how we can help
                bring your vision to life.
              </p>

              <div className="mt-8 rounded-lg bg-gray-900 p-8">
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="organization" className="mb-2 block text-sm font-medium text-gray-300">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="project" className="mb-2 block text-sm font-medium text-gray-300">
                      Project Description
                    </label>
                    <textarea
                      id="project"
                      rows={4}
                      className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                      required
                    ></textarea>
                  </div>
                  <Button className="w-full bg-white py-6 text-lg font-medium text-black hover:bg-gray-200 md:w-auto md:px-8">
                    Submit Inquiry
                  </Button>
                </form>
              </div>

              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+44 7396852756</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>contact@disabilitysportschannel.co.uk</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}

function PortfolioItem({
  title,
  description,
  image,
  client,
}: {
  title: string
  description: string
  image: string
  client: string
}) {
  return (
    <div className="group overflow-hidden rounded-lg bg-gray-900">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={800}
          height={600}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black">
              <Play className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 text-xs font-medium text-gray-400">Client: {client}</div>
        <h3 className="font-bold group-hover:text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-300">{description}</p>
      </div>
    </div>
  )
}

function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="rounded-lg bg-gray-900 p-6">
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
        className="mb-4 h-8 w-8 text-white opacity-50"
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
      <p className="mb-4 text-gray-300">{quote}</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  )
}
