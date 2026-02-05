"use client"

import React from "react"

import { useState } from "react"
import {
  Music2,
  Brain,
  Rocket,
  Target,
  TrendingUp,
  Check,
  DollarSign,
  Globe,
  Loader2,
  Zap,
  Users,
  Briefcase,
  Lightbulb,
  ArrowRight,
  Clock,
  Star,
  ChevronDown,
  AlertTriangle,
  Compass,
  XCircle,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RevenueStream {
  stream: string
  description: string
  potentialMonthly: string
}

interface Phase {
  title: string
  duration: string
  focus?: string
  actions: string[]
  milestones?: string[]
}

interface PlatformStrategy {
  platform: string
  purpose: string
  priority: string
}

interface MarketReality {
  saturationLevel: string
  industryTruth: string
  whyMostFail: string
  yourEdge: string
}

interface DifferentiationStrategy {
  positioning: string
  uniqueAngle: string
  targetAudience: string
  competitiveAdvantage: string
}

interface TransferableSkill {
  skill: string
  description: string
  careerPaths: string[]
}

interface IndustryApplication {
  industry: string
  roles: string[]
  whyYouFit: string
}

interface TransferableSkillsData {
  coreCompetencies: TransferableSkill[]
  industryApplications: IndustryApplication[]
  portfolioCareer: string
}

interface AnalysisData {
  genre?: {
    primary: string
    secondary?: string | null
    niche?: string
    confidence: number
  }
  sonicCharacteristics?: {
    tempo: string
    energy: string
    mood: string
    complexity?: string
    production?: string
    keyElements?: string[]
    emotionalCharacter?: string
  }
  mbtiProfile?: {
    type: string
    name: string
    description: string
    strengths: string[]
    challenges: string[]
    coreValues?: string[]
  }
  transferableSkills?: TransferableSkillsData
  roadmap?: {
    marketReality?: MarketReality
    differentiationStrategy?: DifferentiationStrategy
    phase1?: Phase
    phase2?: Phase
    phase3?: Phase
    phase4?: Phase
    revenueStreams?: {
      immediate?: RevenueStream[]
      shortTerm?: RevenueStream[]
      longTerm?: RevenueStream[]
    }
    businessModels?: string[]
    keyPartnerships?: string[]
    platformStrategy?: PlatformStrategy[]
    investmentAreas?: string[]
    criticalMistakes?: string[]
    scalingTriggers?: string[]
    monetizationStrategies?: string[]
    platformFocus?: string[]
  }
}

interface AnalysisResultsProps {
  data: Partial<AnalysisData>
  isStreaming: boolean
}

function CollapsibleSection({
  id,
  icon: Icon,
  title,
  expanded,
  onToggle,
  children,
  delay = 0,
}: {
  id: string
  icon: React.ElementType
  title: string
  expanded: boolean
  onToggle: (id: string) => void
  children: React.ReactNode
  delay?: number
}) {
  return (
    <section
      className={cn(
        "border border-border/60 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 bg-card/20 transition-colors",
        delay > 0 && `delay-${delay}`,
        expanded && "border-border/80 bg-card/30"
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-secondary/20 transition-all duration-200 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-200",
            expanded 
              ? "bg-foreground/10 border-foreground/20" 
              : "bg-secondary/50 border-border/50 group-hover:border-border group-hover:bg-secondary"
          )}>
            <Icon className={cn(
              "w-4 h-4 transition-colors",
              expanded ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
            )} />
          </div>
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
          expanded ? "bg-secondary/50" : "group-hover:bg-secondary/30"
        )}>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-200",
              expanded && "rotate-180 text-foreground"
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-6 pb-6 md:pb-8 pt-1">{children}</div>
        </div>
      </div>
    </section>
  )
}

function SonicBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-mono">{label}</p>
      <p className="text-sm font-medium text-foreground capitalize">{value}</p>
    </div>
  )
}

function PhaseCard({
  phase,
  data,
  totalPhases,
}: {
  phase: number
  data: Phase
  totalPhases: number
}) {
  return (
    <div className={cn("relative pl-8 pb-6", phase < totalPhases && "border-l border-border")}>
      <div className="absolute left-0 top-0 -translate-x-1/2 w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
        <span className="text-[10px] font-bold text-background">{phase}</span>
      </div>

      <div className="ml-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <h4 className="font-medium text-foreground">{data.title}</h4>
          <span className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground rounded font-mono w-fit">
            {data.duration}
          </span>
        </div>

        {data.focus && <p className="text-sm text-muted-foreground mb-3 italic">{data.focus}</p>}

        {data.actions && data.actions.length > 0 && (
          <ul className="space-y-2 mb-4">
            {data.actions.map((action, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <Check className="w-3 h-3 text-foreground flex-shrink-0 mt-1" />
                {action}
              </li>
            ))}
          </ul>
        )}

        {data.milestones && data.milestones.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              Milestones
            </p>
            <div className="flex flex-wrap gap-2">
              {data.milestones.map((milestone, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-1 bg-secondary/50 text-muted-foreground rounded"
                >
                  {milestone}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function RevenueCard({ stream }: { stream: RevenueStream }) {
  return (
    <div className="pb-3 border-b border-border/50 last:border-0 last:pb-0">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h4 className="text-sm font-medium text-foreground">{stream.stream}</h4>
        <span className="text-xs font-mono text-foreground whitespace-nowrap">
          {stream.potentialMonthly}
        </span>
      </div>
      <p className="text-xs text-muted-foreground">{stream.description}</p>
    </div>
  )
}

export function AnalysisResults({ data, isStreaming }: AnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sound: false,
    dna: false,
    transferableSkills: false,
    strategy: false,
    roadmap: false,
    revenue: false,
    business: false,
  })
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Genre Analysis */}
      {data.genre && (
        <CollapsibleSection
          id="sound"
          icon={Music2}
          title="Sound Analysis"
          expanded={expandedSections.sound}
          onToggle={toggleSection}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Primary Genre
              </p>
              <p className="text-3xl font-bold text-foreground">{data.genre.primary}</p>
              {data.genre.secondary && (
                <p className="text-sm text-muted-foreground mt-2">
                  with <span className="text-foreground">{data.genre.secondary}</span> influences
                </p>
              )}
              {data.genre.niche && (
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  Niche: {data.genre.niche}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Confidence
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full transition-all duration-1000"
                    style={{ width: `${data.genre.confidence}%` }}
                  />
                </div>
                <span className="text-lg font-mono font-semibold text-foreground">
                  {data.genre.confidence}%
                </span>
              </div>
            </div>
          </div>

          {data.sonicCharacteristics && (
            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
<SonicBadge label="Tempo" value={data.sonicCharacteristics.tempo} />
                      <SonicBadge label="Energy" value={data.sonicCharacteristics.energy} />
                      <SonicBadge label="Mood" value={data.sonicCharacteristics.mood} />
                      {data.sonicCharacteristics.emotionalCharacter && (
                        <SonicBadge label="Emotional Character" value={data.sonicCharacteristics.emotionalCharacter} />
                      )}
                      {data.sonicCharacteristics.complexity && (
                        <SonicBadge label="Complexity" value={data.sonicCharacteristics.complexity} />
                      )}
              </div>

              {data.sonicCharacteristics.production && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Production Style
                  </p>
                  <p className="text-sm text-foreground">{data.sonicCharacteristics.production}</p>
                </div>
              )}

              {data.sonicCharacteristics.keyElements &&
                data.sonicCharacteristics.keyElements.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      Key Elements
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {data.sonicCharacteristics.keyElements.map((element, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-secondary text-foreground text-xs rounded"
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* MBTI Profile */}
      {data.mbtiProfile && (
        <CollapsibleSection
          id="dna"
          icon={Brain}
          title="Your Artist DNA"
          expanded={expandedSections.dna}
          onToggle={toggleSection}
          delay={100}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-background font-mono">
                  {data.mbtiProfile.type}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {data.mbtiProfile.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {data.mbtiProfile.description}
              </p>

              {data.mbtiProfile.coreValues && data.mbtiProfile.coreValues.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {data.mbtiProfile.coreValues.map((value, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 border border-border text-foreground text-xs rounded font-medium"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-border">
            {data.mbtiProfile.strengths && data.mbtiProfile.strengths.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Strengths
                </p>
                <ul className="space-y-3">
                  {data.mbtiProfile.strengths.map((strength, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-3">
                      <Check className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.mbtiProfile.challenges && data.mbtiProfile.challenges.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  Challenges
                </p>
                <ul className="space-y-3">
                  {data.mbtiProfile.challenges.map((challenge, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* Transferable Skills */}
        {data.transferableSkills && (
          <CollapsibleSection
            id="transferableSkills"
            icon={Briefcase}
            title="Transferable Skills & Career Paths"
            expanded={expandedSections.transferableSkills}
            onToggle={toggleSection}
            delay={125}
          >
            <div className="space-y-8">
              {/* Core Competencies */}
              {data.transferableSkills.coreCompetencies && data.transferableSkills.coreCompetencies.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Lightbulb className="w-3 h-3" />
                    Core Competencies You're Developing
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.transferableSkills.coreCompetencies.map((comp, i) => (
                      <div key={i} className="border border-border rounded-lg p-4">
                        <h4 className="font-semibold text-foreground text-sm mb-2">{comp.skill}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-3">{comp.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {comp.careerPaths.map((path, j) => (
                            <span key={j} className="px-2 py-0.5 bg-secondary text-foreground text-xs rounded">
                              {path}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Industry Applications */}
              {data.transferableSkills.industryApplications && data.transferableSkills.industryApplications.length > 0 && (
                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    Industries Where Your Skills Apply
                  </p>
                  <div className="space-y-4">
                    {data.transferableSkills.industryApplications.map((app, i) => (
                      <div key={i} className="bg-secondary/30 rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-shrink-0">
                            <span className="inline-block px-3 py-1 bg-foreground text-background text-xs font-semibold rounded">
                              {app.industry}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {app.roles.map((role, j) => (
                                <span key={j} className="text-foreground text-xs font-medium">
                                  {role}{j < app.roles.length - 1 ? " •" : ""}
                                </span>
                              ))}
                            </div>
                            <p className="text-muted-foreground text-xs leading-relaxed">{app.whyYouFit}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Career */}
              {data.transferableSkills.portfolioCareer && (
                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    Your Portfolio Career Path
                  </p>
                  <div className="border-l-2 border-foreground pl-4">
                    <p className="text-foreground text-sm leading-relaxed">{data.transferableSkills.portfolioCareer}</p>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Strategy & Positioning - PREMIUM */}
        {(data.roadmap?.marketReality || data.roadmap?.differentiationStrategy) && (
          <CollapsibleSection
            id="strategy"
            icon={Compass}
            title="Strategy & Positioning"
            expanded={expandedSections.strategy}
            onToggle={toggleSection}
            delay={150}
          >
            <div className="space-y-8">
              {/* Market Reality - Condensed */}
              {data.roadmap?.marketReality && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Market Saturation</p>
                    <p className="text-foreground text-sm font-medium">{data.roadmap.marketReality.saturationLevel}</p>
                  </div>
                  <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-4">
                    <p className="text-xs text-green-600 uppercase tracking-wider mb-2">Your Edge</p>
                    <p className="text-foreground text-sm">{data.roadmap.marketReality.yourEdge}</p>
                  </div>
                </div>
              )}

              {/* Industry Truth */}
              {data.roadmap?.marketReality?.industryTruth && (
                <div className="border-l-2 border-foreground pl-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">The Industry Truth</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{data.roadmap.marketReality.industryTruth}</p>
                </div>
              )}

              {/* Differentiation - Condensed to key points */}
              {data.roadmap?.differentiationStrategy && (
                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Your Differentiation</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-foreground text-sm font-medium mb-1">Positioning</p>
                      <p className="text-muted-foreground text-sm">{data.roadmap.differentiationStrategy.positioning}</p>
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-medium mb-1">Target Audience</p>
                      <p className="text-muted-foreground text-sm">{data.roadmap.differentiationStrategy.targetAudience}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Critical Mistakes & Scaling - Condensed */}
              {(data.roadmap?.criticalMistakes || data.roadmap?.scalingTriggers) && (
                <div className="pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.roadmap?.criticalMistakes && data.roadmap.criticalMistakes.length > 0 && (
                    <div>
                      <p className="text-xs text-destructive uppercase tracking-wider mb-3 flex items-center gap-2">
                        <XCircle className="w-3 h-3" />
                        Avoid These Mistakes
                      </p>
                      <ul className="space-y-2">
                        {data.roadmap.criticalMistakes.slice(0, 4).map((mistake, i) => (
                          <li key={i} className="text-muted-foreground text-xs flex items-start gap-2">
                            <span className="text-destructive">-</span>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.roadmap?.scalingTriggers && data.roadmap.scalingTriggers.length > 0 && (
                    <div>
                      <p className="text-xs text-green-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" />
                        Scale When You See
                      </p>
                      <ul className="space-y-2">
                        {data.roadmap.scalingTriggers.slice(0, 4).map((trigger, i) => (
                          <li key={i} className="text-muted-foreground text-xs flex items-start gap-2">
                            <span className="text-green-600">+</span>
                            {trigger}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Growth Roadmap */}
        {data.roadmap && (
          <CollapsibleSection
            id="roadmap"
            icon={Rocket}
            title="Your Growth Roadmap"
            expanded={expandedSections.roadmap}
            onToggle={toggleSection}
            delay={200}
          >
            <div className="space-y-6">
              {data.roadmap.phase1 && (
                <PhaseCard
                  phase={1}
                  data={data.roadmap.phase1}
                  totalPhases={data.roadmap.phase4 ? 4 : 3}
                />
              )}
              {data.roadmap.phase2 && (
                <PhaseCard
                  phase={2}
                  data={data.roadmap.phase2}
                  totalPhases={data.roadmap.phase4 ? 4 : 3}
                />
              )}
              {data.roadmap.phase3 && (
                <PhaseCard
                  phase={3}
                  data={data.roadmap.phase3}
                  totalPhases={data.roadmap.phase4 ? 4 : 3}
                />
              )}
              {data.roadmap.phase4 && (
                <PhaseCard phase={4} data={data.roadmap.phase4} totalPhases={4} />
              )}
            </div>
          </CollapsibleSection>
        )}

        {/* Revenue & Business - Consolidated */}
        {(data.roadmap?.revenueStreams || data.roadmap?.businessModels || data.roadmap?.keyPartnerships) && (
          <CollapsibleSection
            id="revenue"
            icon={DollarSign}
            title="Revenue & Business"
            expanded={expandedSections.revenue}
            onToggle={toggleSection}
            delay={300}
          >
            <div className="space-y-8">
              {/* Revenue Streams - Condensed */}
              {data.roadmap?.revenueStreams && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.roadmap.revenueStreams.immediate && data.roadmap.revenueStreams.immediate.length > 0 && (
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Now</p>
                      {data.roadmap.revenueStreams.immediate.slice(0, 3).map((stream, i) => (
                        <RevenueCard key={i} stream={stream} />
                      ))}
                    </div>
                  )}
                  {data.roadmap.revenueStreams.shortTerm && data.roadmap.revenueStreams.shortTerm.length > 0 && (
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">6-12 Months</p>
                      {data.roadmap.revenueStreams.shortTerm.slice(0, 3).map((stream, i) => (
                        <RevenueCard key={i} stream={stream} />
                      ))}
                    </div>
                  )}
                  {data.roadmap.revenueStreams.longTerm && data.roadmap.revenueStreams.longTerm.length > 0 && (
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">1-3 Years</p>
                      {data.roadmap.revenueStreams.longTerm.slice(0, 3).map((stream, i) => (
                        <RevenueCard key={i} stream={stream} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Business Models & Partnerships - Condensed */}
              {(data.roadmap?.businessModels || data.roadmap?.keyPartnerships) && (
                <div className="pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.roadmap?.businessModels && data.roadmap.businessModels.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Business Models</p>
                      <div className="flex flex-wrap gap-2">
                        {data.roadmap.businessModels.slice(0, 5).map((model, i) => (
                          <span key={i} className="px-2 py-1 bg-secondary text-foreground text-xs rounded">{model}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.roadmap?.keyPartnerships && data.roadmap.keyPartnerships.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Key Partnerships</p>
                      <div className="flex flex-wrap gap-2">
                        {data.roadmap.keyPartnerships.slice(0, 5).map((partner, i) => (
                          <span key={i} className="px-2 py-1 bg-secondary text-foreground text-xs rounded">{partner}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CollapsibleSection>
        )}

      {isStreaming && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground py-6">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-mono">Generating your personalized roadmap...</span>
        </div>
      )}
    </div>
  )
}
