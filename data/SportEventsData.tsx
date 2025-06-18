export interface SportEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  category: string
  isLive?: boolean
  streamUrl?: string
}

export const WheelchairRugbyEvents: SportEvent[] = [
  {
    id: "wr-001",
    title: "World Championship Final",
    date: "2024-07-15",
    time: "14:00",
    location: "Paris, France",
    description:
      "The ultimate showdown in wheelchair rugby featuring the world's best teams competing for the championship title.",
    category: "Championship",
    isLive: false,
    streamUrl: "/live/wheelchair-rugby-world-final",
  },
  {
    id: "wr-002",
    title: "Paralympic Qualifier",
    date: "2024-06-20",
    time: "16:30",
    location: "Tokyo, Japan",
    description: "Critical qualifying match determining Paralympic participation for the upcoming games.",
    category: "Qualifier",
    isLive: false,
  },
  {
    id: "wr-003",
    title: "International Friendly",
    date: "2024-05-10",
    time: "19:00",
    location: "London, UK",
    description:
      "Friendly match between top international wheelchair rugby teams as preparation for major tournaments.",
    category: "Friendly",
    isLive: false,
  },
  {
    id: "wr-004",
    title: "Regional Championship",
    date: "2024-08-05",
    time: "13:00",
    location: "Sydney, Australia",
    description: "Regional championship featuring teams from across the Asia-Pacific region.",
    category: "Regional",
    isLive: false,
  },
  {
    id: "wr-005",
    title: "Youth Development Match",
    date: "2024-04-22",
    time: "15:00",
    location: "Toronto, Canada",
    description: "Showcase match featuring up-and-coming young wheelchair rugby talent.",
    category: "Youth",
    isLive: false,
  },
]

export const ParaSwimmingEvents: SportEvent[] = [
  {
    id: "ps-001",
    title: "World Para Swimming Championships",
    date: "2024-07-20",
    time: "18:00",
    location: "Manchester, UK",
    description: "The premier global competition for Paralympic swimmers.",
    category: "World Championship",
    isLive: true,
    streamUrl: "/live/para-swimming-worlds",
  },
  {
    id: "ps-002",
    title: "Paralympic Trials",
    date: "2024-06-15",
    time: "10:00",
    location: "Brisbane, Australia",
    description: "National trials to select Paralympic team members.",
    category: "Trials",
    isLive: false,
  },
]

export const WheelchairBasketballEvents: SportEvent[] = [
  {
    id: "wb-001",
    title: "Paralympic Gold Medal Game",
    date: "2024-09-08",
    time: "20:00",
    location: "Paris, France",
    description: "The ultimate wheelchair basketball showdown for Paralympic gold.",
    category: "Paralympic",
    isLive: true,
    streamUrl: "/live/wheelchair-basketball-gold-medal",
  },
  {
    id: "wb-002",
    title: "World Championship Semi-Final",
    date: "2024-08-25",
    time: "16:00",
    location: "Dubai, UAE",
    description: "High-stakes semi-final match in the world championship tournament.",
    category: "World Championship",
    isLive: false,
  },
]

export const ParaAthleticsEvents: SportEvent[] = [
  {
    id: "pa-001",
    title: "World Para Athletics Championships",
    date: "2024-07-12",
    time: "14:30",
    location: "Kobe, Japan",
    description: "The world's premier para athletics competition featuring track and field events.",
    category: "World Championship",
    isLive: false,
  },
  {
    id: "pa-002",
    title: "Diamond League Para Event",
    date: "2024-06-30",
    time: "17:00",
    location: "Eugene, USA",
    description: "Elite para athletics competition as part of the Diamond League series.",
    category: "Diamond League",
    isLive: false,
  },
]

// Export all events combined
export const AllSportEvents: SportEvent[] = [
  ...WheelchairRugbyEvents,
  ...ParaSwimmingEvents,
  ...WheelchairBasketballEvents,
  ...ParaAthleticsEvents,
]
