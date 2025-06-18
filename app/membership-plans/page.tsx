"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronLeft, Info, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export default function MembershipPlans() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [showComparison, setShowComparison] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Get email from URL params or session storage
    const emailParam = searchParams.get("email")
    const storedEmail = typeof window !== "undefined" ? sessionStorage.getItem("dsc_user_email") : null

    if (emailParam) {
      setEmail(emailParam)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("dsc_user_email", emailParam)
      }
    } else if (storedEmail) {
      setEmail(storedEmail)
    } else {
      // If no email is found, redirect back to home
      router.push("/")
    }

    // Set loaded state after a small delay for animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [searchParams, router])

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan)

    // Store selected plan in session storage
    sessionStorage.setItem("dsc_selected_plan", plan)
    sessionStorage.setItem("dsc_billing_cycle", billingCycle)

    // Redirect to checkout
    router.push(`/checkout?plan=${plan}&billing=${billingCycle}`)
  }

  const plans = {
    monthly: [
      {
        id: "basic",
        name: "Basic",
        price: "£4.99",
        description: "Perfect for casual viewers",
        features: [
          { name: "HD streaming on 1 device", tooltip: null },
          { name: "Access to Para Sport Talks", tooltip: "Selected talks from our library" },
          { name: "Limited documentaries", tooltip: "Access to our featured documentaries" },
          { name: "No ads during content", tooltip: null },
          { name: "Cancel anytime", tooltip: null },
        ],
        popular: false,
      },
      {
        id: "standard",
        name: "Standard",
        price: "£8.99",
        description: "Our most popular plan",
        features: [
          { name: "Full HD streaming on 2 devices", tooltip: "Watch on two devices simultaneously" },
          { name: "Full access to Para Sport Talks", tooltip: "Complete library of talks and interviews" },
          { name: "All documentaries and athlete profiles", tooltip: "Our complete documentary collection" },
          { name: "No ads during content", tooltip: null },
          { name: "Download for offline viewing", tooltip: "Save content to watch offline" },
          { name: "Cancel anytime", tooltip: null },
        ],
        popular: true,
      },
      {
        id: "premium",
        name: "Premium",
        price: "£12.99",
        description: "Ultimate para sports experience",
        features: [
          { name: "4K Ultra HD streaming on 4 devices", tooltip: "Highest quality on up to 4 devices" },
          { name: "Full access to all content", tooltip: "Everything in our library" },
          { name: "Early access to new releases", tooltip: "Watch new content before anyone else" },
          { name: "Exclusive behind-the-scenes content", tooltip: "Special features and extras" },
          { name: "Download for offline viewing", tooltip: "Save content to watch offline" },
          { name: "Priority customer support", tooltip: "Get help faster when you need it" },
          { name: "Cancel anytime", tooltip: null },
        ],
        popular: false,
      },
    ],
    annual: [
      {
        id: "basic-annual",
        name: "Basic",
        price: "£49.99",
        description: "Perfect for casual viewers",
        features: [
          { name: "HD streaming on 1 device", tooltip: null },
          { name: "Access to Para Sport Talks", tooltip: "Selected talks from our library" },
          { name: "Limited documentaries", tooltip: "Access to our featured documentaries" },
          { name: "No ads during content", tooltip: null },
          { name: "Save 16% compared to monthly", tooltip: "£9.89 savings per year" },
        ],
        popular: false,
      },
      {
        id: "standard-annual",
        name: "Standard",
        price: "£89.99",
        description: "Our most popular plan",
        features: [
          { name: "Full HD streaming on 2 devices", tooltip: "Watch on two devices simultaneously" },
          { name: "Full access to Para Sport Talks", tooltip: "Complete library of talks and interviews" },
          { name: "All documentaries and athlete profiles", tooltip: "Our complete documentary collection" },
          { name: "No ads during content", tooltip: null },
          { name: "Download for offline viewing", tooltip: "Save content to watch offline" },
          { name: "Save 16% compared to monthly", tooltip: "£17.89 savings per year" },
        ],
        popular: true,
      },
      {
        id: "premium-annual",
        name: "Premium",
        price: "£129.99",
        description: "Ultimate para sports experience",
        features: [
          { name: "4K Ultra HD streaming on 4 devices", tooltip: "Highest quality on up to 4 devices" },
          { name: "Full access to all content", tooltip: "Everything in our library" },
          { name: "Early access to new releases", tooltip: "Watch new content before anyone else" },
          { name: "Exclusive behind-the-scenes content", tooltip: "Special features and extras" },
          { name: "Download for offline viewing", tooltip: "Save content to watch offline" },
          { name: "Priority customer support", tooltip: "Get help faster when you need it" },
          { name: "Save 16% compared to monthly", tooltip: "£25.89 savings per year" },
        ],
        popular: false,
      },
    ],
  }

  const currentPlans = billingCycle === "monthly" ? plans.monthly : plans.annual

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" as const },
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-16 md:py-24 overflow-hidden border-b border-gray-800/50"
        >
          {/* Background image and overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
            <Image
              src="/paralympic-collage.png"
              alt="Premium content collage"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          {/* Content */}
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Choose Your Membership Plan</h1>
              <p className="text-xl text-gray-300 mb-4">Select the plan that's right for you</p>
              {email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-400"
                >
                  Signing up with: <span className="text-teal-400">{email}</span>
                  <Button variant="link" className="text-teal-400 p-0 h-auto ml-2" onClick={() => router.push("/")}>
                    Change
                  </Button>
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Plan Selection */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-black relative">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] bg-repeat opacity-5"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              {/* Billing Cycle Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex justify-center mb-12"
              >
                <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-sm rounded-full p-1.5 border border-gray-800/50">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      billingCycle === "monthly"
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                        : "text-gray-300 hover:text-white"
                    }`}
                    onClick={() => setBillingCycle("monthly")}
                  >
                    Monthly
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      billingCycle === "annual"
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                        : "text-gray-300 hover:text-white"
                    }`}
                    onClick={() => setBillingCycle("annual")}
                  >
                    Annual <span className="text-xs opacity-80">(Save 16%)</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Plan Cards */}
              <div className="grid gap-8 md:grid-cols-3">
                <AnimatePresence mode="wait">
                  {currentPlans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      custom={index}
                      initial="hidden"
                      animate={isLoaded ? "visible" : "hidden"}
                      variants={fadeIn}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      className={`${
                        plan.popular ? "border-2 border-teal-500/70 -mt-4 mb-4" : "border border-gray-800/50"
                      } bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm rounded-xl p-8 transition-all duration-300 hover:border-teal-500/50 flex flex-col h-full relative`}
                    >
                      <div className="flex-1">
                        {plan.popular && (
                          <motion.div
                            animate={pulseAnimation}
                            className="bg-teal-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block mb-4 shadow-lg shadow-teal-900/20"
                          >
                            Most Popular
                          </motion.div>
                        )}

                        <h3 className="text-xl font-bold text-teal-400 mb-2">{plan.name}</h3>
                        <div className="flex items-baseline mb-2">
                          <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {plan.price}
                          </span>
                          <span className="text-gray-400 ml-2">{billingCycle === "monthly" ? "/month" : "/year"}</span>
                        </div>

                        <p className="text-gray-400 mb-6">{plan.description}</p>

                        <ul className="space-y-4 mb-8">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-teal-900/30 flex items-center justify-center">
                                <Check className="h-3 w-3 text-teal-400" />
                              </div>
                              <span className="text-gray-300">
                                {feature.name}
                                {feature.tooltip && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Info className="h-3.5 w-3.5 inline-block ml-1.5 text-gray-500 cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-gray-900 border border-gray-700 text-white text-xs p-2">
                                        {feature.tooltip}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            className={`w-full ${
                              plan.popular
                                ? "bg-teal-600 hover:bg-teal-500 shadow-lg shadow-teal-900/20"
                                : "bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50"
                            } rounded-full py-3 transition-all duration-300`}
                            onClick={() => handlePlanSelection(plan.id)}
                          >
                            Select Plan
                          </Button>
                        </motion.div>
                      </div>

                      {selectedPlan === plan.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute -top-2 -right-2 bg-teal-500 rounded-full p-1"
                        >
                          <Check className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Compare Plans Toggle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-12 text-center"
              >
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white hover:border-teal-500/50"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  {showComparison ? "Hide Comparison" : "Compare All Plans"}
                </Button>
              </motion.div>

              {/* Features Comparison */}
              <AnimatePresence>
                {showComparison && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 md:p-10">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Compare Plan Features</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => setShowComparison(false)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-4 pr-4 font-medium text-gray-400">Feature</th>
                              <th className="text-center py-4 px-4 font-medium text-gray-400">Basic</th>
                              <th className="text-center py-4 px-4 font-medium text-teal-400">Standard</th>
                              <th className="text-center py-4 px-4 font-medium text-gray-400">Premium</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-800/50">
                              <td className="py-4 pr-4 text-gray-300">Monthly Price</td>
                              <td className="text-center py-4 px-4">£4.99</td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">£8.99</td>
                              <td className="text-center py-4 px-4">£12.99</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                              <td className="py-4 pr-4 text-gray-300">Annual Price</td>
                              <td className="text-center py-4 px-4">£49.99</td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">£89.99</td>
                              <td className="text-center py-4 px-4">£129.99</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                              <td className="py-4 pr-4 text-gray-300">Video Quality</td>
                              <td className="text-center py-4 px-4">HD</td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">Full HD</td>
                              <td className="text-center py-4 px-4">4K Ultra HD</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                              <td className="py-4 pr-4 text-gray-300">Simultaneous Streams</td>
                              <td className="text-center py-4 px-4">1</td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">2</td>
                              <td className="text-center py-4 px-4">4</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                              <td className="py-4 pr-4 text-gray-300">Para Sport Talks</td>
                              <td className="text-center py-4 px-4">Limited</td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">Full Access</td>
                              <td className="text-center py-4 px-4">Full Access</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                              <td className="py-4 pr-4 text-gray-300">Documentaries</td>
                              <td className="text-center py-4 px-4">Limited</td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">Full Access</td>
                              <td className="text-center py-4 px-4">Full Access</td>
                            </tr>
                            <tr className="border-b border-gray-800/50">
                              <td className="py-4 pr-4 text-gray-300">Offline Downloads</td>
                              <td className="text-center py-4 px-4">
                                <svg
                                  className="h-5 w-5 text-gray-600 mx-auto"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">
                                <Check className="h-5 w-5 text-teal-400 mx-auto" />
                              </td>
                              <td className="text-center py-4 px-4">
                                <Check className="h-5 w-5 text-teal-400 mx-auto" />
                              </td>
                            </tr>
                            <tr>
                              <td className="py-4 pr-4 text-gray-300">Early Access</td>
                              <td className="text-center py-4 px-4">
                                <svg
                                  className="h-5 w-5 text-gray-600 mx-auto"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </td>
                              <td className="text-center py-4 px-4 bg-teal-900/10">
                                <svg
                                  className="h-5 w-5 text-gray-600 mx-auto"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </td>
                              <td className="text-center py-4 px-4">
                                <Check className="h-5 w-5 text-teal-400 mx-auto" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-16"
              >
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-1" className="bg-gray-900/50 border border-gray-800/50 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:text-teal-400">
                      When will I be charged?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-300">
                      Your membership will begin immediately after payment is processed. You'll be charged the full
                      amount upfront for your selected billing cycle.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="bg-gray-900/50 border border-gray-800/50 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:text-teal-400">
                      Can I cancel anytime?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-300">
                      Yes, you can cancel your membership at any time. For monthly plans, you'll continue to have access
                      until the end of your billing period. For annual plans, you'll have access for the remainder of
                      your paid year.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="bg-gray-900/50 border border-gray-800/50 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:text-teal-400">
                      What devices can I watch on?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-300">
                      You can watch on your TV, computer, tablet, or mobile phone. The number of simultaneous devices
                      depends on your plan. Basic allows 1 device, Standard allows 2 devices, and Premium allows 4
                      devices to stream at the same time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="bg-gray-900/50 border border-gray-800/50 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:text-teal-400">
                      How do I access my membership content?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-300">
                      After completing your purchase, you'll receive an email with login details. You can access all
                      your membership content by signing in to your account on our website or mobile app.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="bg-gray-900/50 border border-gray-800/50 rounded-lg">
                    <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:text-teal-400">
                      Can I upgrade or downgrade my plan?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-300">
                      Yes, you can change your plan at any time. If you upgrade, the new price will be charged
                      immediately and your benefits will be upgraded instantly. If you downgrade, the new price will
                      take effect at the start of your next billing cycle.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-12 text-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
                    <Link href="/">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <EnhancedFooter />
    </div>
  )
}
