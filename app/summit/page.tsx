"use client"

import React, { useState, useEffect, useRef } from "react"

import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, ChevronDown, Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"

export default function SummitPage() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [activeDay, setActiveDay] = useState("day1")
  const [registrationTier, setRegistrationTier] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const [isIntersecting, setIsIntersecting] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Replace the complex hero animations with simpler ones
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  // Remove heroScale and heroY transforms to reduce animation complexity

  // Summit date: October 25-26, 2025
  const targetDate = new Date("October 25, 2025 09:00:00").getTime()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      // Calculate time units
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000))

      // Clear interval when date is reached
      if (distance < 0) {
        clearInterval(interval)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    }, 1000)

    // Clean up interval
    return () => clearInterval(interval)
  }, [targetDate]) // Only depend on targetDate

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      // Replace with your actual Formcarry endpoint
      const response = await fetch("https://formcarry.com/s/REPLACE_WITH_YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setFormSubmitted(true)
        setFormError("")
        window.scrollTo(0, 0)
      } else {
        setFormError("There was a problem submitting your registration. Please try again.")
      }
    } catch (error) {
      setFormError("There was a problem submitting your registration. Please try again.")
    }
  }

  const scrollToRegistration = () => {
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      {formSubmitted ? (
        <div className="container flex-1 flex items-center justify-center px-4 py-12 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-teal-600/20 mb-6">
              <Check className="h-10 w-10 text-teal-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for registering for the DSC Summit 2025. We look forward to seeing you in Birmingham!
            </p>
            <p className="text-gray-400 mb-8">
              A confirmation email has been sent to your inbox with all the details of your registration.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <motion.section
            ref={heroRef}
            className="relative min-h-screen w-full overflow-hidden border-b border-gray-800/50 flex items-center bg-black"
            style={{
              opacity: heroOpacity,
            }}
          >
            {/* Background image */}
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20 md:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="mb-6 inline-block"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-900/80 px-4 py-2 backdrop-blur-md border border-gray-700/50">
                    <Calendar className="h-4 w-4 text-teal-400" />
                    <p className="text-sm font-medium tracking-wider text-gray-300">
                      OCTOBER 25-26, 2025 • BIRMINGHAM, UK
                    </p>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="text-6xl font-bold tracking-tight md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400"
                >
                  <span className="block">DSC</span>
                  <span className="block">SUMMIT</span>
                  <span className="block">2025</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="mt-8 text-lg text-gray-300 max-w-2xl mx-auto"
                >
                  Be part of history at the inaugural Disability Sports Channel Summit — the UK's first national event
                  dedicated entirely to disability sport and inclusion. This groundbreaking gathering will unite
                  athletes, advocates, innovators, and organisations to explore bold ideas, celebrate achievements, and
                  shape the future of inclusive sport from the ground up.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    className="bg-teal-600 hover:bg-teal-500 text-lg px-8 py-6 rounded-full shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 hover:scale-[1.02] transition-all duration-300"
                    onClick={scrollToRegistration}
                  >
                    REGISTER NOW
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 hover:bg-gray-800 text-lg px-8 py-6 rounded-full"
                    onClick={() => document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    VIEW AGENDA
                  </Button>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="mt-16 grid grid-cols-4 gap-4 max-w-2xl mx-auto"
                >
                  <CountdownBox value={days} label="Days" />
                  <CountdownBox value={hours} label="Hours" />
                  <CountdownBox value={minutes} label="Minutes" />
                  <CountdownBox value={seconds} label="Seconds" />
                </motion.div>
              </div>
            </div>

            {/* Simplify scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
                <ChevronDown className="h-6 w-6 text-teal-400" />
              </div>
            </div>
          </motion.section>

          {/* Introduction Section */}
          <section className="py-24 border-b border-gray-800/50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-teal-900/20 to-transparent opacity-40"></div>
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-teal-900/20 to-transparent opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-4 py-2 mb-6">
                    <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                    <span className="text-sm font-medium text-teal-300">THE VISION</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    TOGETHER, LET'S SHAPE DISABILITY SPORTS
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="text-lg text-gray-300 mb-8"
                >
                  Join us at the National Exhibition Centre in Birmingham for an inspiring gathering of athletes,
                  innovators, and advocates championing the future of disability sports. From cutting-edge technology to
                  grassroots initiatives, the Summit is your platform to connect, learn, and lead change.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                >
                  <h3 className="text-2xl font-bold mb-6 text-teal-400">WHAT TO EXPECT:</h3>

                  <div className="grid gap-6 md:grid-cols-3 mb-12">
                    <div className="bg-gray-900/80 border border-gray-800/50 rounded-xl p-6 hover:border-teal-900/50 hover:bg-gray-900/80 transition-colors duration-300">
                      <div className="w-12 h-12 rounded-lg bg-teal-900/30 flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-teal-400" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">Engaging Talks</h4>
                      <p className="text-gray-400">
                        Hear from leading voices in disability sports sharing insights, experiences, and visions for the
                        future.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-800/50 rounded-xl p-6 hover:border-teal-900/50 hover:bg-gray-900/80 transition-colors duration-300">
                      <div className="w-12 h-12 rounded-lg bg-teal-900/30 flex items-center justify-center mb-4">
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
                          className="h-6 w-6 text-teal-400"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold mb-2">Live Showcases</h4>
                      <p className="text-gray-400">
                        Experience demonstrations, performances, and inclusive sports showcases that inspire and
                        educate.
                      </p>
                    </div>

                    <div className="bg-gray-900/80 border border-gray-800/50 rounded-xl p-6 hover:border-teal-900/50 hover:bg-gray-900/80 transition-colors duration-300">
                      <div className="w-12 h-12 rounded-lg bg-teal-900/30 flex items-center justify-center mb-4">
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
                          className="h-6 w-6 text-teal-400"
                        >
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                          <path d="M4 22h16" />
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold mb-2">Networking</h4>
                      <p className="text-gray-400">
                        Connect with peers, potential partners, and industry leaders to build relationships that drive
                        change.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="flex justify-center"
                >
                  <div className="inline-flex items-center gap-3 group cursor-pointer" onClick={scrollToRegistration}>
                    <span className="text-teal-400 font-medium">Secure your spot today</span>
                    <div className="w-8 h-8 rounded-full bg-teal-900/30 flex items-center justify-center group-hover:bg-teal-800/50 transition-colors">
                      <ArrowRight className="h-4 w-4 text-teal-400" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Information Section */}
          <section className="py-24 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
              <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] bg-repeat opacity-5"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="grid gap-8 md:grid-cols-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                    layout={false} // Add this to prevent layout calculations
                    className="bg-gray-900/80 border border-gray-800/50 rounded-xl p-8 hover:border-teal-900/50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-900/30 flex items-center justify-center mb-6">
                      <Calendar className="h-6 w-6 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">When</h3>
                    <p className="text-gray-300 mb-1">October 25-26, 2025</p>
                    <p className="text-gray-400">9:00 AM - 6:00 PM</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }} // Reduce duration from 0.6 to 0.4
                    layout={false} // Add this to prevent layout calculations
                    className="bg-gray-900/80 border border-gray-800/50 rounded-xl p-8 hover:border-teal-900/50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-900/30 flex items-center justify-center mb-6">
                      <MapPin className="h-6 w-6 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Where</h3>
                    <p className="text-gray-300 mb-1">National Exhibition Centre</p>
                    <p className="text-gray-400">Birmingham, United Kingdom</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }} // Reduce duration from 0.6 to 0.4
                    layout={false} // Add this to prevent layout calculations
                    className="bg-gray-900/80 border border-gray-800/50 rounded-xl p-8 hover:border-teal-900/50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-900/30 flex items-center justify-center mb-6">
                      <Users className="h-6 w-6 text-teal-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Who</h3>
                    <p className="text-gray-300 mb-1">Athletes, Coaches, Organizations</p>
                    <p className="text-gray-400">Media, Innovators, Advocates</p>
                  </motion.div>
                </div>

                <div className="mt-16 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }} // Reduce duration from 0.6 to 0.4
                    layout={false} // Add this to prevent layout calculations
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-4 py-2 mb-4">
                      <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                      <span className="text-sm font-medium text-teal-300">JOIN THE MOVEMENT</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Be part of the UK's premier disability sports event
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                      The DSC Summit 2025 is more than just an event—it's the beginning of a movement to transform the
                      landscape of disability sports in the UK and beyond.
                    </p>
                    <Button
                      className="bg-teal-600 hover:bg-teal-500 text-lg px-8 py-6 rounded-full shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 hover:scale-[1.02] transition-all duration-300"
                      onClick={scrollToRegistration}
                    >
                      REGISTER NOW
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Keynotes Section */}
          <section className="py-24 border-t border-gray-800/50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/summit-keynotes.png')] bg-cover bg-center opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                layout={false} // Add this to prevent layout calculations
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-4 py-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                  <span className="text-sm font-medium text-teal-300">THOUGHT LEADERSHIP</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  EDUCATIONAL KEYNOTES
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  From the court to the boardroom, our keynote series explores the transformative power of sport through
                  stories that challenge perspectives, celebrate resilience, and inspire change.
                </p>
              </motion.div>

              <div className="max-w-6xl mx-auto">
                <Tabs defaultValue="para-sport-talks" className="w-full">
                  <div className="flex flex-col md:flex-row gap-8">
                    <TabsList className="flex flex-col h-auto bg-transparent space-y-2 md:w-64 md:border-r border-gray-800/50 pr-4">
                      <TabsTrigger
                        value="para-sport-talks"
                        className="justify-start border-l-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-gray-900/50 rounded-lg px-4 py-4 text-left transition-all duration-200"
                      >
                        <div>
                          <div className="font-bold">Para Sport Talks</div>
                          <div className="text-xs text-gray-400 mt-1">Jordan Jarrett-Bryan</div>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="executive-huddle"
                        className="justify-start border-l-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-gray-900/50 rounded-lg px-4 py-4 text-left transition-all duration-200"
                      >
                        <div>
                          <div className="font-bold">The Executive Huddle</div>
                          <div className="text-xs text-gray-400 mt-1">James T. Kirk</div>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="distinctive-lens"
                        className="justify-start border-l-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-gray-900/50 rounded-lg px-4 py-4 text-left transition-all duration-200"
                      >
                        <div>
                          <div className="font-bold">A Distinctive Lens</div>
                          <div className="text-xs text-gray-400 mt-1">Simeon Wakely</div>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="innovation-lab"
                        className="justify-start border-l-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-gray-900/50 rounded-lg px-4 py-4 text-left transition-all duration-200"
                      >
                        <div>
                          <div className="font-bold">Innovation Lab</div>
                          <div className="text-xs text-gray-400 mt-1">Dr. Elena Rodriguez</div>
                        </div>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex-1">
                      <TabsContent value="para-sport-talks" className="mt-0">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                          layout={false} // Add this to prevent layout calculations
                          className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/50 rounded-xl p-8 hover:border-teal-900/50 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500/30">
                              <Image
                                src="/placeholder.svg?key=0d03f"
                                alt="Jordan Jarrett-Bryan"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-teal-400">Para Sport Talks</h3>
                              <p className="text-gray-400">Hosted by Jordan Jarrett-Bryan</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            ParaSport Talks is a groundbreaking podcast series hosted by the vibrant and insightful
                            Jordan Jarrett-Bryan, a celebrated sports broadcaster, former wheelchair basketball player,
                            and lifelong advocate for inclusivity and equity in sport.
                          </p>
                          <p className="text-gray-300 mb-4">
                            Designed to educate, inspire, and celebrate, this podcast brings the often-overlooked world
                            of parasport to the forefront, providing a platform for the voices driving the Paralympic
                            movement.
                          </p>
                          <p className="text-gray-300 mb-4">
                            In each episode, Jordan sits down with a diverse array of guests, including elite Paralympic
                            athletes, innovative coaches, and influential figures shaping the global landscape of
                            adaptive sports. With his characteristic warmth and curiosity, Jordan delves into the untold
                            stories of triumph over adversity, the dedication required to excel at the highest levels,
                            and the systemic challenges still faced by many in the world of parasport.
                          </p>
                          <div className="mt-6 flex items-center gap-4">
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <Clock className="h-4 w-4 text-teal-500" />
                              <span>45 minutes</span>
                            </div>
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-teal-500" />
                              <span>Main Stage</span>
                            </div>
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="executive-huddle" className="mt-0">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                          layout={false} // Add this to prevent layout calculations
                          className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/50 rounded-xl p-8 hover:border-teal-900/50 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500/30">
                              <Image
                                src="/business-executive-portrait.png"
                                alt="James T. Kirk"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-teal-400">The Executive Huddle</h3>
                              <p className="text-gray-400">Led by James T. Kirk</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            The Executive Huddle brings together leaders from sports organizations, businesses, and
                            advocacy groups to discuss the strategic development of disability sports at all levels.
                          </p>
                          <p className="text-gray-300 mb-4">
                            These sessions focus on governance, funding models, commercial opportunities, and policy
                            development that can drive sustainable growth in the sector.
                          </p>
                          <p className="text-gray-300 mb-4">
                            Participants will gain valuable insights into successful organizational structures,
                            partnership strategies, and innovative approaches to overcoming barriers in the disability
                            sports ecosystem.
                          </p>
                          <div className="mt-6 flex items-center gap-4">
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <Clock className="h-4 w-4 text-teal-500" />
                              <span>60 minutes</span>
                            </div>
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-teal-500" />
                              <span>Executive Suite</span>
                            </div>
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="distinctive-lens" className="mt-0">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                          layout={false} // Add this to prevent layout calculations
                          className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/50 rounded-xl p-8 hover:border-teal-900/50 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500/30">
                              <Image
                                src="/placeholder.svg?key=3uc60"
                                alt="Simeon Wakely"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-teal-400">A Distinctive Lens</h3>
                              <p className="text-gray-400">Presented by Simeon Wakely</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            A Distinctive Lens explores the representation of disability sports in media, challenging
                            conventional narratives and showcasing innovative approaches to storytelling.
                          </p>
                          <p className="text-gray-300 mb-4">
                            Led by award-winning filmmakers, journalists, and athletes-turned-commentators, these
                            sessions examine how media coverage shapes public perception and influences participation in
                            disability sports.
                          </p>
                          <p className="text-gray-300 mb-4">
                            Attendees will discover new frameworks for authentic representation and learn practical
                            techniques for creating compelling content that celebrates athletic achievement without
                            resorting to inspiration narratives.
                          </p>
                          <div className="mt-6 flex items-center gap-4">
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <Clock className="h-4 w-4 text-teal-500" />
                              <span>45 minutes</span>
                            </div>
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-teal-500" />
                              <span>Media Center</span>
                            </div>
                          </div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="innovation-lab" className="mt-0">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                          layout={false} // Add this to prevent layout calculations
                          className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/50 rounded-xl p-8 hover:border-teal-900/50 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500/30">
                              <Image
                                src="/placeholder.svg?key=u0q80"
                                alt="Dr. Elena Rodriguez"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-teal-400">Innovation Lab</h3>
                              <p className="text-gray-400">Facilitated by Dr. Elena Rodriguez</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-4">
                            The Innovation Lab showcases cutting-edge technologies and design solutions that are
                            transforming disability sports, from advanced prosthetics to accessible training equipment.
                          </p>
                          <p className="text-gray-300 mb-4">
                            These interactive sessions bring together engineers, designers, athletes, and coaches to
                            demonstrate and discuss the latest developments and future possibilities.
                          </p>
                          <p className="text-gray-300 mb-4">
                            Participants will have hands-on opportunities to experience these innovations and contribute
                            to discussions about how technology can continue to enhance performance, participation, and
                            enjoyment in disability sports.
                          </p>
                          <div className="mt-6 flex items-center gap-4">
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <Clock className="h-4 w-4 text-teal-500" />
                              <span>90 minutes</span>
                            </div>
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-teal-500" />
                              <span>Innovation Hub</span>
                            </div>
                          </div>
                        </motion.div>
                      </TabsContent>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Agenda Section */}
          <section id="agenda" className="py-24 border-t border-gray-800/50 relative overflow-hidden bg-gray-950">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/summit-agenda.png')] bg-cover bg-center opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                layout={false} // Add this to prevent layout calculations
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-4 py-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                  <span className="text-sm font-medium text-teal-300">SCHEDULE</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  THE AGENDA
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  From game-changing discussions to live sport showcases, our agenda is built to educate, and empower.
                  Whether you're an athlete, advocate, innovator or ally — there's something here for you.
                </p>
              </motion.div>

              <div className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-12">
                  <div className="inline-flex bg-gray-900/50 backdrop-blur-sm rounded-full p-1.5 border border-gray-800/50">
                    <button
                      className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeDay === "day1"
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                          : "text-gray-400 hover:text-white"
                      }`}
                      onClick={() => setActiveDay("day1")}
                    >
                      DAY 1
                    </button>
                    <button
                      className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeDay === "day2"
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                          : "text-gray-400 hover:text-white"
                      }`}
                      onClick={() => setActiveDay("day2")}
                    >
                      DAY 2
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {activeDay === "day1" && (
                    <motion.div
                      key="day1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/10 via-teal-500/30 to-teal-500/10"></div>

                      <div className="space-y-12">
                        <AgendaItem
                          time="9:30 - 10:00"
                          title="Shaping Disability Media"
                          speaker="Simeon Wakely"
                          role="CEO, Disability Sports Channel"
                          side="left"
                        />

                        <AgendaItem
                          time="10:15 - 10:45"
                          title="A Distinctive Lens"
                          speaker="Simeon Wakely"
                          role="CEO of Disability Sports Channel"
                          side="right"
                        />

                        <AgendaItem
                          time="11:00 - 11:45"
                          title="Para Sport Talks"
                          speaker="Jordan Jarrett-Bryan"
                          role="Host of Para Sport Talks Host, Sports Journalist"
                          side="left"
                        />

                        <AgendaItem
                          time="12:00 - 12:45"
                          title="The Executive Huddle"
                          speaker="James T. Kirk"
                          role="VP of Statistical Analysis + Data Reconfiguration"
                          side="right"
                        />

                        <AgendaItem
                          time="13:45 - 14:30"
                          title="A Distinctive Lens"
                          speaker="Simeon Wakely"
                          role="CEO of Disability Sports Channel"
                          side="left"
                        />

                        <AgendaItem
                          time="14:45 - 15:30"
                          title="Para Sport Talks"
                          speaker="Jordan Jarrett-Bryan"
                          role="Host of Para Sport Talks Host, Sports Journalist"
                          side="right"
                        />

                        <AgendaItem
                          time="15:45 - 16:00"
                          title="Shaping Disability Media"
                          speaker="Simeon Wakely"
                          role="CEO of Disability Sports Channel"
                          side="left"
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeDay === "day2" && (
                    <motion.div
                      key="day2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/10 via-teal-500/30 to-teal-500/10"></div>

                      <div className="space-y-12">
                        <AgendaItem
                          time="9:30 - 10:00"
                          title="Innovation in Adaptive Equipment"
                          speaker="Dr. Elena Rodriguez"
                          role="Head of R&D, Adaptive Sports Technologies"
                          side="left"
                        />

                        <AgendaItem
                          time="10:15 - 11:00"
                          title="Paralympic Pathways"
                          speaker="Marcus Chen"
                          role="Paralympic Gold Medalist, Para Swimming"
                          side="right"
                        />

                        <AgendaItem
                          time="11:15 - 12:00"
                          title="Inclusive Coaching Strategies"
                          speaker="Sophia Williams"
                          role="Head Coach, GB Wheelchair Basketball"
                          side="left"
                        />

                        <AgendaItem
                          time="12:15 - 13:00"
                          title="Media Representation Panel"
                          speaker="Multiple Speakers"
                          role="Industry Leaders in Sports Media"
                          side="right"
                        />

                        <AgendaItem
                          time="14:00 - 14:45"
                          title="Future of Paralympic Broadcasting"
                          speaker="Simeon Wakely"
                          role="CEO of Disability Sports Channel"
                          side="left"
                        />

                        <AgendaItem
                          time="15:00 - 16:30"
                          title="Closing Panel: Shaping the Future"
                          speaker="All Summit Speakers"
                          role="Collaborative Discussion"
                          side="right"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                  className="mt-16 text-center"
                >
                  <Button className="bg-gray-900/80 hover:bg-gray-800 border border-gray-800/50 text-white rounded-full px-8 py-3">
                    VIEW THE FULL AGENDA
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Registration Section */}
          <section id="registration" className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/summit-pricing.png')] bg-cover bg-center opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>
              <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-500/5 blur-[100px] animate-pulse-slower"></div>
              <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-[80px] animate-pulse-slow"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                layout={false} // Add this to prevent layout calculations
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-4 py-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-teal-400"></div>
                  <span className="text-sm font-medium text-teal-300">JOIN US</span>
                </div>
                <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  CHOOSE YOUR SUMMIT EXPERIENCE
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Select the registration package that best suits your needs. All packages include full access to the
                  summit program, networking opportunities, and refreshments.
                </p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                >
                  <PricingTier
                    tier="BRONZE"
                    price="£500"
                    features={[
                      "Full 2-day summit access",
                      "Access to all keynote sessions",
                      "Networking opportunities",
                      "Summit materials and resources",
                    ]}
                    onClick={() => setRegistrationTier("bronze")}
                    isSelected={registrationTier === "bronze"}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                >
                  <PricingTier
                    tier="SILVER"
                    price="£1000"
                    features={[
                      "Everything in Bronze",
                      "Priority seating at keynotes",
                      "Exclusive workshop access",
                      "Lunch and refreshments included",
                      "Digital content access post-event",
                    ]}
                    onClick={() => setRegistrationTier("silver")}
                    isSelected={registrationTier === "silver"}
                    isHighlighted={true}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }} // Reduce duration from 0.6 to 0.4
                  layout={false} // Add this to prevent layout calculations
                >
                  <PricingTier
                    tier="GOLD"
                    price="£1500"
                    features={[
                      "Everything in Silver",
                      "VIP networking reception",
                      "One-on-one sessions with speakers",
                      "Exclusive dinner with industry leaders",
                      "Annual DSC digital subscription",
                    ]}
                    onClick={() => setRegistrationTier("gold")}
                    isSelected={registrationTier === "gold"}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }} // Reduce duration from 0.6 to 0.4
                layout={false} // Add this to prevent layout calculations
                className="max-w-6xl mx-auto mb-20"
              >
                <PricingTier
                  tier="PLATINUM"
                  price="£2000"
                  features={[
                    "Everything in Gold",
                    "Sponsor recognition at the event",
                    "Exhibition space for your organization",
                    "Featured in summit materials",
                    "Speaking opportunity at a breakout session",
                    "Post-event data insights and connections",
                  ]}
                  onClick={() => setRegistrationTier("platinum")}
                  isSelected={registrationTier === "platinum"}
                  isWide={true}
                />
              </motion.div>

              {/* Registration Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }} // Reduce duration from 0.6 to 0.4
                layout={false} // Add this to prevent layout calculations
                className="max-w-3xl mx-auto mt-20"
              >
                <h3 className="text-2xl font-bold mb-8 text-center">REGISTER FOR DSC SUMMIT 2025</h3>

                {formError && (
                  <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6">
                    {formError}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className="mt-1 bg-gray-800/50 border-gray-700/50 focus-visible:ring-teal-500 focus-visible:border-teal-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className="mt-1 bg-gray-800/50 border-gray-700/50 focus-visible:ring-teal-500 focus-visible:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 bg-gray-800/50 border-gray-700/50 focus-visible:ring-teal-500 focus-visible:border-teal-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="organization" className="text-gray-300">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      name="organization"
                      className="mt-1 bg-gray-800/50 border-gray-700/50 focus-visible:ring-teal-500 focus-visible:border-teal-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role" className="text-gray-300">
                      Role/Position
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      className="mt-1 bg-gray-800/50 border-gray-700/50 focus-visible:ring-teal-500 focus-visible:border-teal-500"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Registration Package *</Label>
                    <RadioGroup
                      name="registrationPackage"
                      required
                      value={registrationTier}
                      onValueChange={setRegistrationTier}
                      className="mt-2 space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bronze" id="bronze" className="text-teal-500" />
                        <Label htmlFor="bronze" className="font-normal">
                          Bronze (£500)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="silver" id="silver" className="text-teal-500" />
                        <Label htmlFor="silver" className="font-normal">
                          Silver (£1000)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="gold" id="gold" className="text-teal-500" />
                        <Label htmlFor="gold" className="font-normal">
                          Gold (£1500)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="platinum" id="platinum" className="text-teal-500" />
                        <Label htmlFor="platinum" className="font-normal">
                          Platinum (£2000)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="dietaryRequirements" className="text-gray-300">
                      Dietary Requirements or Accessibility Needs
                    </Label>
                    <Textarea
                      id="dietaryRequirements"
                      name="dietaryRequirements"
                      className="mt-1 bg-gray-800/50 border-gray-700/50 focus-visible:ring-teal-500 focus-visible:border-teal-500"
                    />
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-teal-600 focus:ring-teal-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-300">
                        I agree to the{" "}
                        <Link href="/terms" className="text-teal-400 hover:underline">
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-teal-400 hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-teal-600 focus:ring-teal-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newsletter" className="text-gray-300">
                        I would like to receive updates about future DSC events and content
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-500 py-6 text-lg rounded-full shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 hover:scale-[1.02] transition-all duration-300"
                  >
                    COMPLETE REGISTRATION
                  </Button>
                </form>
              </motion.div>
            </div>
          </section>
        </main>
      )}

      <EnhancedFooter />
    </div>
  )
}

// Wrap CountdownBox with React.memo to prevent unnecessary re-renders
const CountdownBox = React.memo(({ value, label }: { value: number; label: string }) => {
  // Format the value to always have at least 2 digits
  const formattedValue = value < 10 ? `0${value}` : value.toString()

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-900/50 p-1 border border-gray-800/50">
      <div className="relative flex h-full flex-col items-center justify-center rounded-lg bg-gray-900/80 p-4 md:p-6">
        <span className="text-3xl font-bold md:text-4xl">{formattedValue}</span>
        <span className="mt-1 text-xs text-gray-400 md:text-sm">{label}</span>
      </div>
    </div>
  )
})
CountdownBox.displayName = "CountdownBox"

interface AgendaItemProps {
  time: string
  title: string
  speaker: string
  role: string
  side: "left" | "right"
}

// Wrap AgendaItem with React.memo
const AgendaItem = React.memo(({ time, title, speaker, role, side }: AgendaItemProps) => {
  return (
    <div className={`relative flex items-center ${side === "right" ? "md:justify-start" : "md:justify-end"}`}>
      <div
        className={`absolute left-0 md:left-1/2 w-4 h-4 bg-teal-500 rounded-full transform ${
          side === "right" ? "md:translate-x-0 md:-translate-x-2" : "md:-translate-x-2"
        } z-10`}
      ></div>

      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/50 p-6 rounded-xl w-full md:max-w-[45%] ${
          side === "right" ? "md:ml-8" : "md:mr-8"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-3 py-1 mb-3">
          <Clock className="h-3 w-3 text-teal-400" />
          <p className="text-xs text-teal-400 font-medium">{time}</p>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="font-medium mt-2 text-teal-300">{speaker}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  )
})
AgendaItem.displayName = "AgendaItem"

interface PricingTierProps {
  tier: string
  price: string
  features: string[]
  onClick: () => void
  isSelected: boolean
  isHighlighted?: boolean
  isWide?: boolean
}

// Wrap PricingTier with React.memo
const PricingTier = React.memo(
  ({ tier, price, features, onClick, isSelected, isHighlighted = false, isWide = false }: PricingTierProps) => {
    return (
      <div
        className={`${isWide ? "col-span-full md:col-span-2 lg:col-span-3" : ""} ${
          isHighlighted ? "border-2 border-teal-500/70" : "border border-gray-800/50"
        } ${
          isSelected ? "ring-2 ring-teal-500 bg-gray-900/80" : "bg-gradient-to-br from-gray-900 to-gray-900/50"
        } rounded-xl p-8 transition-all duration-300 hover:border-teal-500/50 cursor-pointer backdrop-blur-sm h-full hover:transform hover:scale-[1.02]`}
        onClick={onClick}
      >
        {isHighlighted && (
          <div className="bg-teal-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4 shadow-lg shadow-teal-900/20">
            Most Popular
          </div>
        )}

        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          {price}
        </div>
        <div className="text-lg font-bold text-teal-400 mt-1 mb-6">{tier}</div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-teal-900/30 flex items-center justify-center">
                <Check className="h-3 w-3 text-teal-400" />
              </div>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={`w-full ${
            isSelected
              ? "bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-900/20"
              : "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50"
          } rounded-full py-3 transition-all duration-300`}
        >
          {isSelected ? "SELECTED" : "REGISTER NOW"}
        </Button>
      </div>
    )
  },
)
PricingTier.displayName = "PricingTier"
