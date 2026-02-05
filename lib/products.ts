export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

export const PRODUCTS: Product[] = [
  {
    id: "premium-roadmap",
    name: "Premium Artist Roadmap",
    description: "Unlock your full personalized career roadmap including Transferable Skills, Strategy & Positioning, Growth Phases, and Revenue Streams",
    priceInCents: 499, // $4.99
  },
  {
    id: "donation",
    name: "Support Auxx Intelligence",
    description: "Help us keep building tools for independent artists. Your support keeps this project free and growing.",
    priceInCents: 500, // $5.00
  },
]
