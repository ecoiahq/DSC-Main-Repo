"use client"

import { useState, useEffect, useRef } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { loadStripe, type Stripe } from "@stripe/stripe-js"
import { Loader2, AlertCircle } from "lucide-react"

import { startCheckoutSession } from "@/app/actions/stripe"

interface CheckoutProps {
  productId: string
  onComplete?: () => void
}

export default function Checkout({ productId, onComplete }: CheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)
  const isMounted = useRef(false)

  // Initialize Stripe after component mounts
  useEffect(() => {
    isMounted.current = true
    
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    if (!key) {
      setError("Stripe is not configured. Please add the Stripe integration from the Connect section in the sidebar.")
      return
    }
    
    setStripePromise(loadStripe(key))

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    // Check if Stripe is configured
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      return
    }

    const fetchClientSecret = async () => {
      try {
        const secret = await startCheckoutSession(productId)
        if (isMounted.current) {
          if (secret) {
            setClientSecret(secret)
          } else {
            setError("Failed to create checkout session")
          }
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err instanceof Error ? err.message : "Something went wrong")
        }
      }
    }
    fetchClientSecret()
  }, [productId])

  if (error) {
    return (
      <div className="text-center py-8 px-4">
        <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (!clientSecret || !stripePromise) {
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
