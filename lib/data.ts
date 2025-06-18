import type { Sport } from "./types"

// Mock data for sports
const sportsData: Sport[] = [
  {
    id: "wheelchair-basketball",
    name: "Wheelchair Basketball",
    description: "Fast-paced team sport played by athletes with physical disabilities",
    category: "Team Sports",
    paralympicSport: true,
    equipment: ["Wheelchair", "Basketball"],
    rules: "Similar to basketball with adaptations for wheelchair use",
    history: "Developed in the 1940s for World War II veterans",
  },
  {
    id: "para-swimming",
    name: "Para Swimming",
    description: "Swimming competitions for athletes with physical, visual, or intellectual disabilities",
    category: "Individual Sports",
    paralympicSport: true,
    equipment: ["Swimming gear", "Prosthetics if needed"],
    rules: "Standard swimming rules with classification system",
    history: "One of the original Paralympic sports since 1960",
  },
  {
    id: "wheelchair-rugby",
    name: "Wheelchair Rugby",
    description: "Full-contact team sport for athletes with quadriplegia",
    category: "Team Sports",
    paralympicSport: true,
    equipment: ["Rugby wheelchair", "Ball"],
    rules: "Mixed-gender sport with unique classification system",
    history: "Invented in Canada in 1977",
  },
]

export async function fetchSport(sportId: string): Promise<Sport | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const sport = sportsData.find((s) => s.id === sportId)
  return sport || null
}

export async function fetchAllSports(): Promise<Sport[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return sportsData
}

export async function fetchSportsByCategory(category: string): Promise<Sport[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return sportsData.filter((sport) => sport.category === category)
}
