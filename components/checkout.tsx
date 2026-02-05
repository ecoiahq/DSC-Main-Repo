"use client"

import { useCallback, useState, useEffect } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Loader2 } from "lucide-react"

import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutProps {
  productId: string
  onComplete?: () => void
}

export default function Checkout({ productId, onComplete }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const secret = await startCheckoutSession(productId)
        if (secret) {
          setClientSecret(secret)
        } else {
          setError("Failed to create checkout session")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      }
    }
    fetchClientSecret()
  }, [productId])

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ 
          clientSecret,
          onComplete: onComplete
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
