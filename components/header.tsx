"use client"

import { useState } from "react"
import { ShieldCheck, Info, X, Check, AlertTriangle, Target, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Checkout from "./checkout"

export function Header() {
  const [showAbout, setShowAbout] = useState(false)
  const [showDonate, setShowDonate] = useState(false)

  return (
    <>
      <header className="w-full py-3 px-4 border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-muted-foreground/80">
            <div className="w-6 h-6 rounded-md bg-secondary/50 border border-border/50 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-foreground/70" />
            </div>
            <span className="text-xs font-mono hidden sm:inline">Your music never leaves your device</span>
            <span className="text-xs font-mono sm:hidden">Private analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAbout(true)}
              className="text-xs text-muted-foreground hover:text-foreground h-8 px-3 gap-1.5 hover:bg-secondary/50 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              About
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDonate(true)}
              className="text-xs text-muted-foreground hover:text-foreground h-8 px-3 gap-1.5 hover:bg-secondary/50 transition-colors"
            >
              <Heart className="w-3.5 h-3.5" />
              Donate
            </Button>
          </div>
        </div>
      </header>

      {/* Donate Modal */}
      {showDonate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
            onClick={() => setShowDonate(false)}
          />
          <div className="relative bg-card border border-border/60 rounded-xl w-full max-w-lg max-h-[90vh] overflow-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border/50 p-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-foreground" />
                <h3 className="font-semibold text-foreground">Support Auxx Intelligence</h3>
              </div>
              <button
                onClick={() => setShowDonate(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors group"
              >
                <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Help us keep building tools for independent artists. Your support keeps this project free and growing.
              </p>
              <Checkout productId="donation" onComplete={() => setShowDonate(false)} />
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowAbout(false)}
          />
          <div className="relative bg-background border border-border rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-lg">
            <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-sm font-mono text-muted-foreground tracking-widest uppercase">Auxx Intelligence</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAbout(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-6 space-y-8">
              {/* What It Is */}
              <section>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">What It Is</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Auxx Intelligence is a music career intelligence tool that analyzes your sound and generates a personalized roadmap for building a sustainable music career. Upload your track, discover your artist DNA, and receive actionable strategies tailored to your specific genre and niche.
                </p>
              </section>

              {/* How It Works */}
              <section>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">How It Works</h3>
                <div className="space-y-3">
                  {[
                    { step: "1", text: "Upload Your Track - Drop any MP3 file into the analyzer" },
                    { step: "2", text: "Audio Analysis - The system extracts real audio features: tempo, energy levels, spectral characteristics, and rhythmic patterns" },
                    { step: "3", text: "Genre Matching - Your sonic profile is matched against 50+ genre profiles, from UK Drill to Ambient, Afrobeats to Post-Punk" },
                    { step: "4", text: "Artist DNA Profile - Receive your MBTI-style artist personality type with strengths, challenges, and core values" },
                    { step: "5", text: "Personalized Roadmap - Get a comprehensive 4-phase growth strategy with specific actions and milestones" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
                        {item.step}
                      </span>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* What Makes It Different */}
              <section>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">What Makes It Different</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { icon: AlertTriangle, title: "Market Reality", desc: "Honest assessments of genre saturation and where money actually comes from" },
                    { icon: Target, title: "Differentiation Strategy", desc: "How to cut through market saturation with your unique positioning" },
                    { icon: Check, title: "Sustainable Revenue", desc: "Strategies built around live performance, sync licensing, and direct-to-fan relationships" },
                    { icon: Users, title: "Scaling Triggers", desc: "Clear milestones that indicate when you're ready to level up" },
                  ].map((item) => (
                    <div key={item.title} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="w-4 h-4 text-foreground" />
                        <span className="text-sm font-medium text-foreground">{item.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Privacy */}
              <section className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">Privacy</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your music never leaves your device. All analysis happens in your browser using the Web Audio API. No uploads, no storage, no data collection.
                </p>
              </section>

              {/* Built For */}
              <section>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Built For</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Independent artists who want to build sustainable music careers based on their actual sound, not generic advice. Whether you're making drill, lo-fi, house, or experimental music - your roadmap is tailored to your specific niche and its unique opportunities.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
