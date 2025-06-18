import type { Article, VideoContent } from "@/lib/types"

export interface SportTimeline {
  year: string
  event: string
  description: string
}

// Add this interface for timeline events
export interface TimelineEvent {
  year: string
  title: string
  description: string
}

// Add timeline data to each sport object
export interface Sport {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  historyTimeline?: TimelineEvent[]
}

export interface SportInfo {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  timeline: SportTimeline[]
  rules: {
    title: string
    content: string
  }[]
  pointSystem: string
  classification: string
}

// Get sport information by slug
export const getSportBySlug = (slug: string): SportInfo | undefined => {
  return sportsData.find((sport) => sport.slug === slug)
}

// Get all sports
export const getAllSports = (): SportInfo[] => {
  return sportsData
}

// Get sport-specific news
export const getSportNews = (sportSlug: string): Article[] => {
  return newsData.filter((article) => article.sportTags?.includes(sportSlug))
}

// Get sport-specific videos
export const getSportVideos = (sportSlug: string): VideoContent[] => {
  return videosData.filter((video) => video.sportTags?.includes(sportSlug))
}

// Mock data for sports
const sportsData: SportInfo[] = [
  {
    id: "wheelchair-basketball",
    name: "Wheelchair Basketball",
    slug: "wheelchair-basketball",
    description:
      "Wheelchair basketball is one of the most popular and widely played Paralympic sports. It follows many of the rules of standard basketball, with modifications to accommodate athletes using wheelchairs.",
    coverImage: "/wheelchair-basketball-action.png",
    timeline: [
      {
        year: "1945",
        event: "Origins",
        description:
          "Wheelchair basketball was developed by World War II veterans in the United States as part of their rehabilitation process.",
      },
      {
        year: "1948",
        event: "First Competition",
        description: "The first wheelchair basketball tournament was held at the Stoke Mandeville Games in England.",
      },
      {
        year: "1960",
        event: "Paralympic Debut",
        description: "Wheelchair basketball made its Paralympic debut at the Rome 1960 Paralympic Games.",
      },
      {
        year: "1968",
        event: "Women's Competition",
        description: "Women's wheelchair basketball was introduced at international level competitions.",
      },
      {
        year: "1973",
        event: "IWBF Formation",
        description:
          "The International Wheelchair Basketball Federation (IWBF) was formed to govern the sport globally.",
      },
      {
        year: "1996",
        event: "Women's Paralympic Debut",
        description:
          "Women's wheelchair basketball was included in the Paralympic Games for the first time in Atlanta.",
      },
      {
        year: "2018",
        event: "3x3 Format",
        description: "The IWBF introduced the 3x3 format of wheelchair basketball.",
      },
    ],
    rules: [
      {
        title: "Court and Equipment",
        content:
          "Wheelchair basketball is played on a standard basketball court with the same hoop height (10 feet). Players use specially designed sports wheelchairs that are more maneuverable and stable than everyday chairs.",
      },
      {
        title: "Teams and Players",
        content:
          "Each team consists of 5 players on the court at a time, with up to 7 substitutes. Players are classified based on their functional ability on a point scale from 1.0 (most impaired) to 4.5 (least impaired).",
      },
      {
        title: "Game Duration",
        content:
          "A game consists of four quarters of 10 minutes each, with a 15-minute halftime break and 2-minute breaks between other quarters.",
      },
      {
        title: "Dribbling",
        content:
          "Players must dribble the ball while moving their wheelchair, taking no more than two pushes before dribbling again. Carrying the ball on the lap while pushing the wheelchair more than twice is a traveling violation.",
      },
      {
        title: "Physical Contact",
        content:
          "Physical contact between wheelchairs is permitted, but ramming or colliding deliberately is considered a foul. Players cannot lift out of their seat (rising) to gain an advantage.",
      },
    ],
    pointSystem:
      "Teams in wheelchair basketball must field five players whose total classification points do not exceed 14 points. This ensures competitive balance while allowing teams flexibility in their lineup composition. For example, a team might field players with classifications of 4.5, 4.0, 2.5, 2.0, and 1.0, totaling 14 points.",
    classification:
      "Players are classified on a scale from 1.0 to 4.5 based on their functional ability, with 1.0 representing the most limited mobility and 4.5 representing the least impairment. Classification is determined by medical assessment and observation during gameplay.",
  },
  {
    id: "para-athletics",
    name: "Para Athletics",
    slug: "para-athletics",
    description:
      "Para athletics encompasses a wide range of track and field events adapted for athletes with various physical, visual, and intellectual impairments. It is one of the largest sports in the Paralympic Games.",
    coverImage: "/para-athletics-track.png",
    timeline: [
      {
        year: "1952",
        event: "First International Competition",
        description:
          "Para athletics events were included in the Stoke Mandeville Games, the precursor to the Paralympic Games.",
      },
      {
        year: "1960",
        event: "Paralympic Debut",
        description: "Para athletics was included in the first Paralympic Games in Rome.",
      },
      {
        year: "1976",
        event: "Classification System",
        description: "A formal classification system was introduced for para athletics.",
      },
      {
        year: "1989",
        event: "ISOD World Championships",
        description: "The first official World Championships for para athletics were held.",
      },
      {
        year: "2011",
        event: "IPC Athletics",
        description:
          "The International Paralympic Committee (IPC) took direct governance of para athletics as IPC Athletics.",
      },
      {
        year: "2016",
        event: "World Para Athletics",
        description: "IPC Athletics was rebranded as World Para Athletics.",
      },
    ],
    rules: [
      {
        title: "Event Categories",
        content:
          "Para athletics includes track events (sprints, middle and long distance, relays), field events (jumps, throws), and road events (marathons). Events are categorized by impairment type and severity.",
      },
      {
        title: "Equipment",
        content:
          "Athletes may use specialized equipment such as racing wheelchairs, throwing frames, prosthetics, or guide runners depending on their classification and event.",
      },
      {
        title: "Track Events",
        content:
          "Track events follow similar rules to Olympic athletics, with modifications based on classification. Wheelchair racers must stay in their lanes and cannot obstruct other competitors.",
      },
      {
        title: "Field Events",
        content:
          "In throwing events, athletes may compete from a seated position using a throwing frame. In jumping events, rules are adapted based on the athlete's impairment (e.g., allowing a running, hopping, or standing approach).",
      },
    ],
    pointSystem:
      "Para athletics does not use a point system like team sports. Instead, athletes compete within their classification category against others with similar functional abilities.",
    classification:
      "Para athletics uses a complex classification system with categories designated by letters and numbers. For example, T designates track events, F designates field events, followed by numbers indicating impairment type (11-13 for visual impairment, 20 for intellectual impairment, 31-38 for coordination impairments, 40-47 for limb deficiencies, 51-57 for wheelchair athletes, etc.).",
  },
  {
    id: "para-swimming",
    name: "Para Swimming",
    slug: "para-swimming",
    description:
      "Para swimming is one of the core sports in the Paralympic Games, featuring athletes with physical, visual, and intellectual impairments competing in various swimming disciplines.",
    coverImage: "/para-swimming-competition.png",
    timeline: [
      {
        year: "1960",
        event: "Paralympic Debut",
        description: "Swimming was included in the first Paralympic Games in Rome.",
      },
      {
        year: "1984",
        event: "Classification Evolution",
        description: "The classification system for para swimming began to evolve toward a functional system.",
      },
      {
        year: "1992",
        event: "Functional Classification",
        description: "A functional classification system was fully implemented for para swimming.",
      },
      {
        year: "2009",
        event: "IPC Swimming",
        description: "The International Paralympic Committee took direct governance of para swimming.",
      },
      {
        year: "2016",
        event: "World Para Swimming",
        description: "IPC Swimming was rebranded as World Para Swimming.",
      },
    ],
    rules: [
      {
        title: "Strokes and Events",
        content:
          "Para swimming includes the same four strokes as Olympic swimming: freestyle, backstroke, breaststroke, and butterfly. Events range from 50m to 400m, plus relays and medleys.",
      },
      {
        title: "Starting Positions",
        content:
          "Depending on their impairment, swimmers may start in the water, from a sitting position on the starting platform, or from the standard standing position.",
      },
      {
        title: "Modifications",
        content:
          "Some classifications have rule modifications. For example, visually impaired swimmers may use tappers who use a pole with a soft tip to tap the swimmer when approaching the wall.",
      },
      {
        title: "Equipment",
        content: "No prostheses or assistive devices are permitted except for tappers for visually impaired swimmers.",
      },
    ],
    pointSystem:
      "Para swimming does not use a point system. Athletes compete within their classification against others with similar functional abilities.",
    classification:
      "Para swimming uses an 'S' prefix for freestyle, backstroke, and butterfly events, 'SB' for breaststroke, and 'SM' for individual medley, followed by a number from 1-14. Lower numbers (S1-S10) indicate physical impairments with severity decreasing as numbers increase, S11-S13 indicate visual impairments, and S14 indicates intellectual impairment.",
  },
  {
    id: "para-archery",
    name: "Para Archery",
    slug: "para-archery",
    description:
      "Para archery is a precision sport that tests accuracy, focus, and mental strength. Athletes with physical impairments compete using recurve and compound bows.",
    coverImage: "/para-archery-competition.png",
    timeline: [
      {
        year: "1948",
        event: "Therapeutic Origins",
        description: "Archery was first used as a form of rehabilitation therapy at Stoke Mandeville Hospital.",
      },
    ],
    rules: [
      {
        title: "Equipment",
        content:
          "Athletes use recurve or compound bows with various assistive devices allowed based on classification.",
      },
    ],
    pointSystem: "Individual competition with elimination rounds leading to medal matches.",
    classification: "Athletes compete in Open, W1 (wheelchair), and VI (visually impaired) categories.",
  },
  {
    id: "para-badminton",
    name: "Para Badminton",
    slug: "para-badminton",
    description:
      "Para badminton made its Paralympic debut at Tokyo 2020. The sport features fast-paced action with athletes competing in wheelchair and standing classifications.",
    coverImage: "/para-badminton-action.png",
    timeline: [
      {
        year: "2020",
        event: "Paralympic Debut",
        description: "Para badminton made its Paralympic debut at the Tokyo 2020 Games.",
      },
    ],
    rules: [
      {
        title: "Court Modifications",
        content: "Wheelchair players compete on a shorter court with modified service rules.",
      },
    ],
    pointSystem: "Standard badminton scoring system with matches played to best of three games.",
    classification:
      "Six sport classes: WH1, WH2 (wheelchair), SL3, SL4 (standing lower limb), SU5 (standing upper limb), SS6 (short stature).",
  },
  {
    id: "boccia",
    name: "Boccia",
    slug: "boccia",
    description:
      "Boccia is a precision ball sport designed specifically for athletes with severe physical disabilities. It requires strategy, accuracy, and concentration.",
    coverImage: "/boccia-competition.png",
    timeline: [
      {
        year: "1984",
        event: "Paralympic Debut",
        description: "Boccia was included in the Paralympic Games for the first time in New York/Stoke Mandeville.",
      },
    ],
    rules: [
      {
        title: "Objective",
        content: "Players aim to throw leather balls as close as possible to a white target ball called the jack.",
      },
    ],
    pointSystem: "Points awarded based on proximity to the jack, with closest balls scoring.",
    classification: "Four sport classes: BC1, BC2, BC3, and BC4, based on functional ability.",
  },
  {
    id: "para-canoe",
    name: "Para Canoe",
    slug: "para-canoe",
    description:
      "Para canoe sprint made its Paralympic debut at Rio 2016. Athletes compete in kayaks over 200m distances with classifications based on functional ability.",
    coverImage: "/para-canoe-sprint.png",
    timeline: [
      {
        year: "2016",
        event: "Paralympic Debut",
        description: "Para canoe sprint was included in the Paralympic Games for the first time in Rio.",
      },
    ],
    rules: [
      {
        title: "Distance",
        content: "All Paralympic events are contested over 200 meters in kayaks.",
      },
    ],
    pointSystem: "Time-based competition with fastest times advancing through heats to finals.",
    classification: "Three sport classes: KL1, KL2, and KL3, based on trunk function and leg function.",
  },
  {
    id: "para-cycling",
    name: "Para Cycling",
    slug: "para-cycling",
    description:
      "Para cycling includes road and track events for athletes with physical impairments using bicycles, tricycles, handcycles, and tandems for visually impaired athletes.",
    coverImage: "/para-cycling-race.png",
    timeline: [
      {
        year: "1984",
        event: "Paralympic Debut",
        description: "Cycling for athletes with disabilities made its first appearance at the Paralympic Games.",
      },
    ],
    rules: [
      {
        title: "Equipment Categories",
        content:
          "Athletes compete using bicycles, tricycles, handcycles, or tandems depending on their classification.",
      },
    ],
    pointSystem: "Time-based competition for road events, with various formats for track events.",
    classification: "Multiple classes including C1-C5 (bicycle), T1-T2 (tricycle), H1-H5 (handcycle), and B (tandem).",
  },
  {
    id: "para-equestrian",
    name: "Para Equestrian",
    slug: "para-equestrian",
    description:
      "Para equestrian dressage showcases the harmony between horse and rider. Athletes with physical impairments compete in dressage tests of varying complexity.",
    coverImage: "/para-equestrian-dressage.png",
    timeline: [
      {
        year: "1996",
        event: "Paralympic Debut",
        description: "Para equestrian dressage was included in the Paralympic Games for the first time in Atlanta.",
      },
    ],
    rules: [
      {
        title: "Dressage Tests",
        content:
          "Athletes perform predetermined sequences of movements that demonstrate horse training and rider skill.",
      },
    ],
    pointSystem: "Percentage scoring system based on execution of movements and overall harmony.",
    classification: "Five grades: Grade I (most severe impairment) to Grade V (least severe impairment).",
  },
  {
    id: "football-5-a-side",
    name: "Football 5-a-side",
    slug: "football-5-a-side",
    description:
      "Football 5-a-side is played by athletes with visual impairments. The ball contains ball bearings to make noise, and matches are played in complete silence from spectators.",
    coverImage: "/football-5-a-side-match.png",
    timeline: [
      {
        year: "2004",
        event: "Paralympic Debut",
        description: "Football 5-a-side was included in the Paralympic Games for the first time in Athens.",
      },
    ],
    rules: [
      {
        title: "Sound Ball",
        content: "The ball contains ball bearings that make noise to help players locate it during play.",
      },
    ],
    pointSystem: "Standard football scoring with matches played over two 25-minute halves.",
    classification: "All outfield players must be classified as B1 (totally or almost totally blind).",
  },
  {
    id: "goalball",
    name: "Goalball",
    slug: "goalball",
    description:
      "Goalball was created specifically for athletes with visual impairments. Teams try to score by rolling a ball with bells into the opponent's goal.",
    coverImage: "/goalball-competition.png",
    timeline: [
      {
        year: "1976",
        event: "Paralympic Debut",
        description: "Goalball was included in the Paralympic Games for the first time in Toronto.",
      },
    ],
    rules: [
      {
        title: "Silent Game",
        content: "Spectators must remain completely silent during play so athletes can hear the ball.",
      },
    ],
    pointSystem:
      "Goals scored by rolling the ball into the opponent's goal, with matches played over two 12-minute halves.",
    classification: "All players compete in the B1-B3 classifications and wear eyeshades for fairness.",
  },
  {
    id: "para-judo",
    name: "Para Judo",
    slug: "para-judo",
    description:
      "Para judo is practiced by athletes with visual impairments. The sport follows the same rules as Olympic judo with minor modifications for safety and fairness.",
    coverImage: "/para-judo-match.png",
    timeline: [
      {
        year: "1988",
        event: "Paralympic Debut",
        description: "Para judo was included in the Paralympic Games for the first time in Seoul.",
      },
    ],
    rules: [
      {
        title: "Starting Position",
        content: "Athletes start each contest in contact with each other to compensate for visual impairment.",
      },
    ],
    pointSystem: "Standard judo scoring system with ippon, waza-ari, and penalties.",
    classification: "Three classes: J1 (no light perception), J2 (light perception), and J3 (visual field restricted).",
  },
  {
    id: "para-powerlifting",
    name: "Para Powerlifting",
    slug: "para-powerlifting",
    description:
      "Para powerlifting is the ultimate test of upper body strength. Athletes compete in the bench press, with the winner determined by the highest weight lifted.",
    coverImage: "/para-powerlifting-bench.png",
    timeline: [
      {
        year: "1964",
        event: "Paralympic Debut",
        description: "Powerlifting was included in the Paralympic Games for the first time in Tokyo.",
      },
    ],
    rules: [
      {
        title: "Bench Press Only",
        content: "Athletes compete only in the bench press, lying on a bench and pressing the barbell.",
      },
    ],
    pointSystem: "Highest successful lift wins, with bodyweight categories for fair competition.",
    classification: "Single sport class with athletes competing in bodyweight categories.",
  },
  {
    id: "para-rowing",
    name: "Para Rowing",
    slug: "para-rowing",
    description:
      "Para rowing tests endurance, technique, and teamwork. Athletes with physical impairments compete in single sculls, double sculls, and mixed coxed four events.",
    coverImage: "/para-rowing-race.png",
    timeline: [
      {
        year: "2008",
        event: "Paralympic Debut",
        description: "Para rowing was included in the Paralympic Games for the first time in Beijing.",
      },
    ],
    rules: [
      {
        title: "Race Distance",
        content: "All Paralympic rowing events are contested over 1000 meters.",
      },
    ],
    pointSystem: "Time-based competition with fastest crews advancing through heats to finals.",
    classification:
      "Three sport classes: PR1 (arms and shoulders only), PR2 (trunk and arms), PR3 (legs, trunk and arms with remaining function).",
  },
  {
    id: "para-shooting",
    name: "Para Shooting",
    slug: "para-shooting",
    description:
      "Para shooting is a precision sport requiring exceptional concentration and control. Athletes compete in rifle and pistol events from standing, prone, or seated positions.",
    coverImage: "/para-shooting-competition.png",
    timeline: [
      {
        year: "1976",
        event: "Paralympic Debut",
        description: "Shooting was included in the Paralympic Games for the first time in Toronto.",
      },
    ],
    rules: [
      {
        title: "Precision Scoring",
        content:
          "Athletes aim for the highest score possible with shots scored from 1-10 points based on proximity to center.",
      },
    ],
    pointSystem: "Cumulative scoring system with qualification rounds leading to elimination finals.",
    classification: "Two main classes: SH1 (pistol and rifle) and SH2 (rifle only with shooting stand support).",
  },
  {
    id: "sitting-volleyball",
    name: "Sitting Volleyball",
    slug: "sitting-volleyball",
    description:
      "Sitting volleyball is a fast-paced Paralympic sport adapted for athletes with physical impairments, played on a smaller court with a lower net.",
    coverImage: "/sitting-volleyball-match.png",
    timeline: [
      {
        year: "1980",
        event: "Paralympic Debut",
        description: "Sitting volleyball was included in the Paralympic Games for the first time in Arnhem.",
      },
    ],
    rules: [
      {
        title: "Court Contact",
        content: "Players must maintain contact between their pelvis and the court when playing the ball.",
      },
    ],
    pointSystem: "Standard volleyball scoring with matches played to best of five sets.",
    classification: "Two classes: VS1 (more severe impairment) and VS2 (less severe impairment).",
  },
  {
    id: "para-table-tennis",
    name: "Para Table Tennis",
    slug: "para-table-tennis",
    description:
      "Para table tennis is one of the most popular Paralympic sports, featuring fast-paced action for athletes with physical and intellectual impairments.",
    coverImage: "/para-table-tennis-action.png",
    timeline: [
      {
        year: "1960",
        event: "Paralympic Debut",
        description: "Table tennis was included in the Paralympic Games for the first time in Rome.",
      },
    ],
    rules: [
      {
        title: "Serving Rules",
        content: "Modified serving rules apply for wheelchair players, including service from behind the end line.",
      },
    ],
    pointSystem: "Standard table tennis scoring with matches played to best of five or seven games.",
    classification: "Eleven classes: 1-5 (wheelchair), 6-10 (standing), and 11 (intellectual impairment).",
  },
  {
    id: "para-taekwondo",
    name: "Para Taekwondo",
    slug: "para-taekwondo",
    description:
      "Para taekwondo made its Paralympic debut at Rio 2016. Athletes with arm impairments compete in this dynamic combat sport focusing on kicks and footwork.",
    coverImage: "/para-taekwondo-match.png",
    timeline: [
      {
        year: "2016",
        event: "Paralympic Debut",
        description: "Para taekwondo was included in the Paralympic Games for the first time in Rio.",
      },
    ],
    rules: [
      {
        title: "Kyorugi Competition",
        content: "Athletes compete in full-contact sparring matches with electronic scoring systems.",
      },
    ],
    pointSystem: "Point-based system with kicks to the body and head scoring different values.",
    classification: "Two sport classes: K44 (one arm impairment) and K43 (both arms affected).",
  },
  {
    id: "wheelchair-rugby",
    name: "Wheelchair Rugby",
    slug: "wheelchair-rugby",
    description:
      "Originally called 'murderball', wheelchair rugby is a high-impact sport for athletes with impairments affecting both arms and legs.",
    coverImage: "/wheelchair-rugby-action.png",
    timeline: [
      {
        year: "2000",
        event: "Paralympic Debut",
        description: "Wheelchair rugby became a full medal event at the Sydney Paralympic Games.",
      },
    ],
    rules: [
      {
        title: "Mixed Gender",
        content: "Teams can include both male and female players, with specific rules for gender inclusion.",
      },
    ],
    pointSystem: "Teams must field players whose total classification points do not exceed 8.0 points.",
    classification: "Players classified from 0.5 to 3.5 points based on functional ability in trunk and upper limbs.",
  },
  {
    id: "wheelchair-tennis",
    name: "Wheelchair Tennis",
    slug: "wheelchair-tennis",
    description:
      "Wheelchair tennis follows the same rules as able-bodied tennis, except the ball is allowed to bounce twice before being returned.",
    coverImage: "/wheelchair-tennis-match.png",
    timeline: [
      {
        year: "1992",
        event: "Paralympic Debut",
        description: "Wheelchair tennis was included in the Paralympic Games for the first time in Barcelona.",
      },
    ],
    rules: [
      {
        title: "Two-Bounce Rule",
        content: "The ball is allowed to bounce twice, with the second bounce allowed to be outside the court.",
      },
    ],
    pointSystem: "Standard tennis scoring system with matches played to best of three sets.",
    classification:
      "Two divisions: Open (for athletes with permanent mobility-related physical disabilities) and Quad (for athletes with additional arm/hand function limitations).",
  },
]

// Add timeline data to the sports array
const sports: Sport[] = [
  {
    id: "1",
    name: "Wheelchair Basketball",
    slug: "wheelchair-basketball",
    description:
      "Wheelchair basketball is one of the most popular Paralympic sports, played by athletes with physical disabilities that prevent running, jumping, and pivoting.",
    coverImage: "/wheelchair-basketball-action.png",
    historyTimeline: [
      {
        year: "1945",
        title: "Origins in Rehabilitation",
        description:
          "Wheelchair basketball was developed as a rehabilitation activity for injured World War II veterans in the United States.",
      },
      {
        year: "1948",
        title: "First Organized Games",
        description:
          "The first organized wheelchair basketball games were played at VA hospitals in the United States.",
      },
      {
        year: "1960",
        title: "Paralympic Debut",
        description: "Wheelchair basketball made its Paralympic debut at the first Paralympic Games in Rome, Italy.",
      },
      {
        year: "1968",
        title: "Women's Competition",
        description:
          "Women's wheelchair basketball began to develop, though it wouldn't become a Paralympic event until much later.",
      },
      {
        year: "1973",
        title: "IWBF Formation",
        description:
          "The International Wheelchair Basketball Federation (IWBF) was formed to govern the sport globally.",
      },
      {
        year: "1984",
        title: "Women's Paralympic Debut",
        description:
          "Women's wheelchair basketball was included in the Paralympic Games for the first time in Stoke Mandeville/New York.",
      },
      {
        year: "1992",
        title: "Classification System",
        description: "A more refined player classification system was introduced to ensure fair competition.",
      },
      {
        year: "2018",
        title: "Global Growth",
        description: "The sport reached over 100 countries worldwide with organized wheelchair basketball programs.",
      },
    ],
  },
  {
    id: "2",
    name: "Para Athletics",
    slug: "para-athletics",
    description:
      "Para athletics includes a wide range of track and field events adapted for athletes with various physical disabilities.",
    coverImage: "/para-athletics-track.png",
    historyTimeline: [
      {
        year: "1948",
        title: "Stoke Mandeville Games",
        description:
          "Dr. Ludwig Guttmann organized the first competition for wheelchair athletes at Stoke Mandeville Hospital in England.",
      },
      {
        year: "1952",
        title: "International Competition",
        description: "The Stoke Mandeville Games became international when Dutch veterans joined the competition.",
      },
      {
        year: "1960",
        title: "Paralympic Debut",
        description:
          "Athletics was included in the first Paralympic Games in Rome with events for wheelchair athletes.",
      },
      {
        year: "1976",
        title: "Expansion of Classifications",
        description:
          "The Toronto Paralympics expanded to include athletes with different disabilities beyond spinal cord injuries.",
      },
      {
        year: "1984",
        title: "Increased Participation",
        description:
          "The number of athletics events and participating countries significantly increased at the New York/Stoke Mandeville Games.",
      },
      {
        year: "1989",
        title: "IPC Formation",
        description:
          "The International Paralympic Committee (IPC) was formed, becoming the governing body for Para athletics.",
      },
      {
        year: "2001",
        title: "First IPC World Championships",
        description: "The first IPC Athletics World Championships were held in Berlin, Germany.",
      },
      {
        year: "2017",
        title: "London World Championships",
        description:
          "The London World Para Athletics Championships became the most watched in history with over 300,000 tickets sold.",
      },
    ],
  },
  {
    id: "3",
    name: "Para Swimming",
    slug: "para-swimming",
    description:
      "Para swimming is one of the largest sports on the Paralympic program, with events for athletes with physical, visual, and intellectual impairments.",
    coverImage: "/para-swimming-competition.png",
    historyTimeline: [
      {
        year: "1948",
        title: "Early Beginnings",
        description: "Swimming was included in the first Stoke Mandeville Games organized by Dr. Ludwig Guttmann.",
      },
      {
        year: "1960",
        title: "Paralympic Debut",
        description: "Swimming was one of the eight sports included in the first Paralympic Games in Rome.",
      },
      {
        year: "1968",
        title: "Classification Development",
        description:
          "The Tel Aviv Paralympics saw the development of more sophisticated classification systems for swimmers.",
      },
      {
        year: "1976",
        title: "Expanded Participation",
        description:
          "The Toronto Games included swimmers with amputations, visual impairments, and cerebral palsy for the first time.",
      },
      {
        year: "1984",
        title: "Growth in Events",
        description: "The number of swimming events nearly doubled at the New York/Stoke Mandeville Paralympics.",
      },
      {
        year: "1996",
        title: "Atlanta Breakthrough",
        description:
          "The Atlanta Paralympics featured swimming in front of sold-out crowds, raising the profile of the sport.",
      },
      {
        year: "2008",
        title: "Beijing Records",
        description: "The Beijing Paralympics saw numerous world records broken in the Water Cube venue.",
      },
      {
        year: "2019",
        title: "World Championships",
        description: "The World Para Swimming Championships in London featured over 650 athletes from 80 countries.",
      },
    ],
  },
  {
    id: "4",
    name: "Sitting Volleyball",
    slug: "sitting-volleyball",
    description:
      "Sitting volleyball is a fast-paced Paralympic sport adapted for athletes with physical impairments, played on a smaller court with a lower net.",
    coverImage: "/sitting-volleyball-match.png",
    historyTimeline: [
      {
        year: "1956",
        title: "Sport Development",
        description:
          "Sitting volleyball was developed in the Netherlands as a rehabilitation activity for injured soldiers.",
      },
      {
        year: "1976",
        title: "Paralympic Debut",
        description: "Men's sitting volleyball made its Paralympic debut at the Toronto Games.",
      },
      {
        year: "1979",
        title: "First World Championships",
        description: "The first World Championships for sitting volleyball were held in Haarlem, Netherlands.",
      },
      {
        year: "1980",
        title: "Rules Standardization",
        description:
          "International rules for sitting volleyball were standardized by the World Organization Volleyball for Disabled.",
      },
      {
        year: "1993",
        title: "World ParaVolley",
        description:
          "World ParaVolley (initially called World Organization Volleyball for Disabled) became the official governing body.",
      },
      {
        year: "2004",
        title: "Women's Paralympic Debut",
        description: "Women's sitting volleyball was included in the Paralympic program for the first time in Athens.",
      },
      {
        year: "2016",
        title: "USA Women's Gold",
        description: "The USA women's team won their first gold medal at the Rio Paralympics, defeating China.",
      },
      {
        year: "2020",
        title: "Tokyo Paralympics",
        description:
          "Despite the pandemic delay, sitting volleyball remained one of the most popular Paralympic sports in Tokyo.",
      },
    ],
  },
  {
    id: "5",
    name: "Wheelchair Rugby",
    slug: "wheelchair-rugby",
    description:
      "Originally called 'murderball', wheelchair rugby is a high-impact sport for athletes with impairments affecting both arms and legs.",
    coverImage: "/wheelchair-rugby-action.png",
    historyTimeline: [
      {
        year: "1977",
        title: "Sport Invention",
        description:
          "Wheelchair rugby was invented in Winnipeg, Canada, by a group of quadriplegic athletes seeking an alternative to wheelchair basketball.",
      },
      {
        year: "1981",
        title: "International Spread",
        description: "The sport began to spread internationally, with the United States establishing teams.",
      },
      {
        year: "1989",
        title: "First International Tournament",
        description:
          "The first international tournament was held in Toronto, Canada, with teams from Canada and the USA.",
      },
      {
        year: "1993",
        title: "World Championships",
        description: "The first Wheelchair Rugby World Championships were held in Nottwil, Switzerland.",
      },
      {
        year: "1996",
        title: "Paralympic Demonstration",
        description: "Wheelchair rugby was a demonstration sport at the Atlanta Paralympic Games.",
      },
      {
        year: "2000",
        title: "Paralympic Medal Sport",
        description:
          "The sport became a full medal event at the Sydney Paralympic Games, with the USA winning the first gold medal.",
      },
      {
        year: "2005",
        title: "Murderball Documentary",
        description: "The award-winning documentary 'Murderball' brought international attention to the sport.",
      },
      {
        year: "2018",
        title: "Global Expansion",
        description:
          "The sport expanded to over 40 countries across all continents, with increasing participation in developing nations.",
      },
    ],
  },
  {
    id: "6",
    name: "Para Cycling",
    slug: "para-cycling",
    description:
      "Para cycling includes road and track events for athletes with physical impairments using bicycles, tricycles, handcycles, and tandems.",
    coverImage: "/para-cycling-race.png",
    historyTimeline: [
      {
        year: "1984",
        title: "Paralympic Debut",
        description:
          "Cycling for athletes with disabilities made its first appearance at the New York/Stoke Mandeville Paralympic Games.",
      },
      {
        year: "1988",
        title: "Seoul Expansion",
        description:
          "The Seoul Paralympics featured expanded cycling events for athletes with visual impairments and cerebral palsy.",
      },
      {
        year: "1992",
        title: "Track Cycling Introduction",
        description: "Track cycling was introduced to the Paralympic program at the Barcelona Games.",
      },
      {
        year: "1996",
        title: "Handcycling Demonstration",
        description: "Handcycling was featured as a demonstration event at the Atlanta Paralympics.",
      },
      {
        year: "2002",
        title: "UCI Integration",
        description:
          "Para cycling governance was transferred to the Union Cycliste Internationale (UCI), integrating with mainstream cycling.",
      },
      {
        year: "2004",
        title: "Handcycling Medal Sport",
        description: "Handcycling became a full medal sport at the Athens Paralympic Games.",
      },
      {
        year: "2007",
        title: "First UCI World Championships",
        description: "The first UCI Para Cycling World Championships were held in Bordeaux, France.",
      },
      {
        year: "2016",
        title: "Rio Innovation",
        description:
          "The Rio Paralympics featured technological innovations in adaptive bikes and increased media coverage of para cycling events.",
      },
    ],
  },
]

// Mock data for sport-specific news
const newsData: (Article & { sportTags?: string[] })[] = [
  {
    id: 1,
    title: "USA Dominates Wheelchair Basketball World Championships",
    excerpt:
      "Team USA secured their fourth consecutive world title with a decisive victory over Great Britain in the final.",
    image: "/wheelchair-basketball-action.png",
    date: "May 1, 2025",
    author: "James Wilson",
    category: "Wheelchair Basketball",
    url: "/news/usa-dominates-wheelchair-basketball-world-championships",
    sportTags: ["wheelchair-basketball"],
  },
  {
    id: 2,
    title: "New Classification Rules for Wheelchair Basketball Announced",
    excerpt:
      "The International Wheelchair Basketball Federation has announced updated classification guidelines for the 2026 season.",
    image: "/placeholder.svg?key=wllkn",
    date: "April 28, 2025",
    author: "Sarah Johnson",
    category: "Wheelchair Basketball",
    url: "/news/new-classification-rules-wheelchair-basketball",
    sportTags: ["wheelchair-basketball"],
  },
  {
    id: 3,
    title: "Rising Star: Meet 19-Year-Old Wheelchair Basketball Phenom",
    excerpt:
      "Jack Thompson is taking the wheelchair basketball world by storm with his incredible shooting ability and court vision.",
    image: "/placeholder.svg?key=xu089",
    date: "April 25, 2025",
    author: "Michael Chen",
    category: "Wheelchair Basketball",
    url: "/news/rising-star-wheelchair-basketball-phenom",
    sportTags: ["wheelchair-basketball"],
  },
  {
    id: 4,
    title: "Dunn breaks world record in 100m freestyle S14",
    excerpt:
      "British swimmer Reece Dunn has broken his own world record in the men's 100m freestyle S14 at the World Para Swimming Championships in Manchester.",
    image: "/para-swimming-competition.png",
    date: "May 2, 2025",
    author: "James Wilson",
    category: "Para Swimming",
    url: "/news/dunn-breaks-world-record-100m-freestyle",
    sportTags: ["para-swimming"],
  },
  {
    id: 5,
    title: "Stubbs secures gold in dramatic para archery final",
    excerpt:
      "Great Britain's John Stubbs claimed gold in the para archery final with a perfect 10 on his final arrow to edge out China's Zhao Lixue by a single point.",
    image: "/para-archery-competition.png",
    date: "May 2, 2025",
    author: "Michael Chen",
    category: "Para Archery",
    url: "/news/stubbs-gold-para-archery-final",
    sportTags: ["para-archery"],
  },
]

// Mock data for sport-specific videos
const videosData: (VideoContent & { sportTags?: string[] })[] = [
  {
    id: 1,
    title: "Wheelchair Basketball Techniques: Advanced Chair Skills",
    description: "Learn advanced wheelchair maneuvering techniques from Paralympic gold medalists.",
    image: "/wheelchair-basketball-action.png",
    category: "Wheelchair Basketball",
    duration: "24:15",
    url: "/watch/wheelchair-basketball-techniques",
    views: "45.2K",
    date: "April 15, 2025",
    sportTags: ["wheelchair-basketball"],
  },
  {
    id: 2,
    title: "USA vs Canada: Wheelchair Basketball Semi-Final Highlights",
    description: "Full highlights from the thrilling Paralympic Qualifier semi-final between USA and Canada.",
    image: "/placeholder.svg?key=y5kkd",
    category: "Wheelchair Basketball",
    duration: "18:30",
    url: "/watch/usa-canada-wheelchair-basketball-highlights",
    views: "32.7K",
    date: "May 1, 2025",
    sportTags: ["wheelchair-basketball"],
  },
  {
    id: 3,
    title: "Wheelchair Basketball Shooting Drills for Beginners",
    description: "Essential shooting drills for new wheelchair basketball players to improve accuracy and consistency.",
    image: "/placeholder.svg?key=l5rz9",
    category: "Wheelchair Basketball",
    duration: "15:45",
    url: "/watch/wheelchair-basketball-shooting-drills",
    views: "28.3K",
    date: "April 10, 2025",
    sportTags: ["wheelchair-basketball"],
  },
  {
    id: 4,
    title: "Para Athletics World Championships Highlights",
    description: "The best moments from the World Para Athletics Championships.",
    image: "/para-athletics-track.png",
    category: "Athletics",
    duration: "26:30",
    url: "/watch/para-athletics-highlights",
    views: "38.9K",
    date: "April 20, 2025",
    sportTags: ["para-athletics"],
  },
  {
    id: 5,
    title: "Swimming Stars: Path to Paris 2024",
    description: "Following the journey of top para swimmers as they prepare for the Paris Paralympics.",
    image: "/para-swimming-competition.png",
    category: "Swimming",
    duration: "32:15",
    url: "/watch/swimming-paris-2024",
    views: "41.5K",
    date: "April 5, 2025",
    sportTags: ["para-swimming"],
  },
]
