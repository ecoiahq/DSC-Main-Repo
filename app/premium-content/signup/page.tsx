"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowLeft, Check, CreditCard, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  plan: z.enum(["monthly", "annual", "premium"]),
  paymentMethod: z.enum(["credit", "paypal"]),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

export default function MembershipSignup() {
  const searchParams = useSearchParams()
  const initialPlan = searchParams.get("plan")?.toLowerCase() || "monthly"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      plan: initialPlan as "monthly" | "annual" | "premium",
      paymentMethod: "credit",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      agreeTerms: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values)
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }

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
              <CardTitle className="text-2xl">Membership Activated!</CardTitle>
              <CardDescription className="text-gray-400">
                Your DSC Premium membership has been successfully activated. You now have access to all our exclusive
                content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-gray-300">
                We've sent a confirmation email to your inbox with all the details of your membership.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-teal-600 hover:bg-teal-500" asChild>
                <Link href="/premium-content">Start Watching Now</Link>
              </Button>
              <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800" asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
            </CardFooter>
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
              <Link href="/premium-content">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Plans
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl">Create Your DSC Membership</CardTitle>
                  <CardDescription>
                    Complete your details below to start your membership and get instant access to all premium content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Account Information</h3>

                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  {...field}
                                  className="bg-gray-900 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter your email"
                                  {...field}
                                  className="bg-gray-900 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Create a password"
                                  {...field}
                                  className="bg-gray-900 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400 text-xs">
                                Must be at least 8 characters and include a number
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator className="bg-gray-800" />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Membership Plan</h3>

                        <FormField
                          control={form.control}
                          name="plan"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="space-y-3"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="monthly" className="border-teal-600 text-teal-400" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer flex-1">
                                      <div className="flex justify-between">
                                        <span>Monthly Plan</span>
                                        <span className="font-medium">£9.99/month</span>
                                      </div>
                                    </FormLabel>
                                  </FormItem>

                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="annual" className="border-teal-600 text-teal-400" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer flex-1">
                                      <div className="flex justify-between">
                                        <div>
                                          <span>Annual Plan</span>
                                          <span className="ml-2 text-xs bg-teal-900/50 text-teal-400 px-2 py-0.5 rounded-full">
                                            Save 25%
                                          </span>
                                        </div>
                                        <span className="font-medium">£89.99/year</span>
                                      </div>
                                    </FormLabel>
                                  </FormItem>

                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="premium" className="border-teal-600 text-teal-400" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer flex-1">
                                      <div className="flex justify-between">
                                        <div>
                                          <span>Premium Plan</span>
                                          <span className="ml-2 text-xs bg-teal-900/50 text-teal-400 px-2 py-0.5 rounded-full">
                                            Best Value
                                          </span>
                                        </div>
                                        <span className="font-medium">£129.99/year</span>
                                      </div>
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator className="bg-gray-800" />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Method</h3>

                        <Tabs
                          defaultValue="credit"
                          onValueChange={(value) => form.setValue("paymentMethod", value as "credit" | "paypal")}
                        >
                          <TabsList className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-1 border border-gray-800/50 w-full grid grid-cols-2">
                            <TabsTrigger value="credit" className="rounded-md data-[state=active]:bg-teal-600">
                              Credit Card
                            </TabsTrigger>
                            <TabsTrigger value="paypal" className="rounded-md data-[state=active]:bg-teal-600">
                              PayPal
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="credit" className="mt-4 space-y-4">
                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="1234 5678 9012 3456"
                                        {...field}
                                        className="bg-gray-900 border-gray-700 text-white pl-10"
                                      />
                                      <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="MM/YY"
                                        {...field}
                                        className="bg-gray-900 border-gray-700 text-white"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="cvc"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="123"
                                        {...field}
                                        className="bg-gray-900 border-gray-700 text-white"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="paypal" className="mt-4">
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
                              <div className="w-16 h-16 mx-auto mb-4 relative">
                                <Image
                                  src="/paypal-logo.png"
                                  alt="PayPal"
                                  width={64}
                                  height={64}
                                  className="object-contain"
                                />
                              </div>
                              <p className="text-gray-300 mb-4">
                                You will be redirected to PayPal to complete your payment securely.
                              </p>
                              <p className="text-xs text-gray-400">
                                Note: You will need to return to this site after completing payment to activate your
                                account.
                              </p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <Separator className="bg-gray-800" />

                      <FormField
                        control={form.control}
                        name="agreeTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <div className="mt-1">
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={(e) => field.onChange(e.target.checked)}
                                  className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-teal-600 focus:ring-teal-600"
                                />
                              </div>
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal text-sm">
                                I agree to the{" "}
                                <Link href="#" className="text-teal-400 hover:underline">
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-teal-400 hover:underline">
                                  Privacy Policy
                                </Link>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className="text-sm text-gray-400">
                        {Object.keys(form.formState.errors).length > 0 && (
                          <p className="text-red-400 mb-2">Please fix the errors above to continue.</p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-500 text-lg py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Start Membership"}
                      </Button>

                      <p className="text-xs text-gray-400 text-center">
                        Your membership will begin immediately after payment is processed. You can cancel anytime from
                        your account settings.
                      </p>
                    </form>
                  </Form>
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
                    <span className="font-medium">
                      {form.watch("plan") === "monthly"
                        ? "Monthly"
                        : form.watch("plan") === "annual"
                          ? "Annual"
                          : "Premium"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-medium">
                      {form.watch("plan") === "monthly"
                        ? "£9.99/month"
                        : form.watch("plan") === "annual"
                          ? "£89.99/year"
                          : "£129.99/year"}
                    </span>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      {form.watch("plan") === "monthly"
                        ? "£9.99"
                        : form.watch("plan") === "annual"
                          ? "£89.99"
                          : "£129.99"}
                    </span>
                  </div>

                  <div className="bg-gray-900/70 rounded-lg p-4 text-sm">
                    <div className="flex gap-2 items-start">
                      <Info className="h-5 w-5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-teal-400 mb-1">What's included:</p>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                            <span>Full access to all premium content</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                            <span>Para Sport Talks podcast series</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                            <span>Exclusive documentaries</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                            <span>Athlete profiles and interviews</span>
                          </li>
                          {(form.watch("plan") === "annual" || form.watch("plan") === "premium") && (
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                              <span>Early access to new releases</span>
                            </li>
                          )}
                          {form.watch("plan") === "premium" && (
                            <>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                                <span>4K Ultra HD streaming</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-teal-400 mt-0.5" />
                                <span>Virtual meet & greets with athletes</span>
                              </li>
                            </>
                          )}
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
