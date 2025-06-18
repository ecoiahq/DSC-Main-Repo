"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, Info, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export default function Checkout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [plan, setPlan] = useState<string | null>(null)
  const [billing, setBilling] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Get data from URL params or session storage
    const planParam = searchParams.get("plan")
    const billingParam = searchParams.get("billing")
    const storedEmail = typeof window !== "undefined" ? sessionStorage.getItem("dsc_user_email") : null
    const storedPlan = typeof window !== "undefined" ? sessionStorage.getItem("dsc_selected_plan") : null
    const storedBilling = typeof window !== "undefined" ? sessionStorage.getItem("dsc_billing_cycle") : null

    if (storedEmail) {
      setEmail(storedEmail)
    }

    if (planParam) {
      setPlan(planParam)
    } else if (storedPlan) {
      setPlan(storedPlan)
    } else {
      // If no plan is found, redirect back to plans page
      router.push("/membership-plans")
    }

    if (billingParam) {
      setBilling(billingParam)
    } else if (storedBilling) {
      setBilling(storedBilling)
    }
  }, [searchParams, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate Stripe payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Store subscription status in session storage
      sessionStorage.setItem("dsc_subscription_active", "true")
      sessionStorage.setItem("dsc_subscription_plan", plan || "")

      // Redirect to success page after a brief delay
      setTimeout(() => {
        router.push("/checkout/success")
      }, 1500)
    }, 2000)
  }

  // Get plan details based on selected plan
  const getPlanDetails = () => {
    const plans = {
      basic: { name: "Basic", price: "£4.99", period: "month" },
      standard: { name: "Standard", price: "£8.99", period: "month" },
      premium: { name: "Premium", price: "£12.99", period: "month" },
      "basic-annual": { name: "Basic Annual", price: "£49.99", period: "year" },
      "standard-annual": { name: "Standard Annual", price: "£89.99", period: "year" },
      "premium-annual": { name: "Premium Annual", price: "£129.99", period: "year" },
    }

    return plan && plan in plans
      ? plans[plan as keyof typeof plans]
      : { name: "Standard", price: "£8.99", period: "month" }
  }

  const planDetails = getPlanDetails()

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <SiteHeader />

        <main className="flex-1 flex items-center justify-center py-16">
          <Card className="max-w-md w-full bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-teal-900/30 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-teal-400" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription className="text-gray-400">
                Your payment has been processed successfully. Redirecting you to your account...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </CardContent>
          </Card>
        </main>

        <EnhancedFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
              <Link href="/membership-plans">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Plans
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
                  <CardDescription>Enter your payment details to start your DSC Premium membership</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Payment Information</h3>
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-teal-400" />
                          <span className="text-sm text-gray-400">Secure Payment</span>
                        </div>
                      </div>

                      <div className="bg-gray-900/70 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center">
                              <Image
                                src="/placeholder.svg?key=stripe-logo"
                                alt="Stripe"
                                width={24}
                                height={24}
                                className="object-contain"
                              />
                            </div>
                            <span className="text-sm font-medium">Stripe</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-8 h-5 bg-gray-800 rounded">
                              <Image
                                src="/placeholder.svg?key=visa-logo"
                                alt="Visa"
                                width={20}
                                height={12}
                                className="object-contain"
                              />
                            </div>
                            <div className="w-8 h-5 bg-gray-800 rounded">
                              <Image
                                src="/placeholder.svg?key=mastercard-logo"
                                alt="Mastercard"
                                width={20}
                                height={12}
                                className="object-contain"
                              />
                            </div>
                            <div className="w-8 h-5 bg-gray-800 rounded">
                              <Image
                                src="/placeholder.svg?key=amex-logo"
                                alt="American Express"
                                width={20}
                                height={12}
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              placeholder="John Smith"
                              className="bg-gray-900 border-gray-700 text-white mt-1"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <div className="relative mt-1">
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="bg-gray-900 border-gray-700 text-white pl-10"
                                required
                              />
                              <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                className="bg-gray-900 border-gray-700 text-white mt-1"
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input
                                id="cvc"
                                placeholder="123"
                                className="bg-gray-900 border-gray-700 text-white mt-1"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="saveCard"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-teal-600 focus:ring-teal-600"
                        />
                        <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-300">
                          Save my card for future payments
                        </label>
                      </div>
                    </div>

                    <Separator className="bg-gray-800" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Billing Address</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <select
                            id="country"
                            className="w-full mt-1 rounded-md border border-gray-700 bg-gray-900 text-white py-2 px-3"
                            defaultValue="GB"
                          >
                            <option value="GB">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            placeholder="SW1A 1AA"
                            className="bg-gray-900 border-gray-700 text-white mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-teal-600 hover:bg-teal-500 text-lg py-6"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        `Pay ${planDetails.price}`
                      )}
                    </Button>

                    <p className="text-xs text-gray-400 text-center">
                      By clicking "Pay", you agree to our{" "}
                      <Link href="#" className="text-teal-400 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-teal-400 hover:underline">
                        Privacy Policy
                      </Link>
                      . Your subscription will begin immediately after payment is processed.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="font-medium">{planDetails.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Billing</span>
                    <span className="font-medium">{planDetails.period === "month" ? "Monthly" : "Annual"}</span>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{planDetails.price}</span>
                  </div>

                  <div className="bg-gray-900/70 rounded-lg p-4 text-sm">
                    <div className="flex gap-2 items-start">
                      <Info className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-teal-400 mb-1">Subscription Details:</p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                            <span>Your subscription will begin immediately</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                            <span>
                              {planDetails.period === "month"
                                ? "You'll be billed monthly until you cancel"
                                : "You'll be billed annually until you cancel"}
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                            <span>Cancel anytime from your account settings</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <EnhancedFooter />
    </div>
  )
}
