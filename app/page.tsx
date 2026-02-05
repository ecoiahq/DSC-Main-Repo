"use client"

import React from "react"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { UploadZone } from "@/components/upload-zone"
import { AnalysisResults } from "@/components/analysis-results"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, Brain, Rocket } from "lucide-react"
import { analyzeAudio, matchGenreFromFeatures, type GenreProfile } from "@/lib/audio-analyzer"

type AnalysisData = Partial<{
  genre: GenreProfile["genre"]
  sonicCharacteristics: GenreProfile["sonic"]
  mbtiProfile: GenreProfile["mbti"]
  transferableSkills: GenreProfile["transferableSkills"]
  roadmap: GenreProfile["roadmap"]
}>

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file)
    setAnalysisData(null)
    setError(null)
  }, [])

  const handleClear = useCallback(() => {
    setSelectedFile(null)
    setAnalysisData(null)
    setError(null)
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setError(null)
    setAnalysisData({})

    try {
      // Analyze audio using Web Audio API (client-side, no server upload)
      const features = await analyzeAudio(selectedFile)
      
      // Match genre based on extracted audio features
      const profile = matchGenreFromFeatures(features, selectedFile.name)
      
      // Simulate streaming effect for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      setAnalysisData({
        genre: profile.genre,
      })
      
      await new Promise(resolve => setTimeout(resolve, 400))
      setAnalysisData(prev => ({
        ...prev,
        sonicCharacteristics: profile.sonic,
      }))
      
      await new Promise(resolve => setTimeout(resolve, 400))
      setAnalysisData(prev => ({
        ...prev,
        mbtiProfile: profile.mbti,
      }))
      
      await new Promise(resolve => setTimeout(resolve, 400))
      setAnalysisData(prev => ({
        ...prev,
        transferableSkills: profile.transferableSkills,
      }))
      
      await new Promise(resolve => setTimeout(resolve, 400))
      setAnalysisData(prev => ({
        ...prev,
        roadmap: profile.roadmap,
      }))
      
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze audio. Please try a different file.")
    } finally {
      setIsAnalyzing(false)
    }
  }, [selectedFile])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8 border border-border/60 rounded-full px-4 py-2 bg-card/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/40 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/60"></span>
            </span>
            Auxx Intelligence
          </div>

          {/* Main heading - bold and sleek */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6 tracking-tight uppercase">
            DECODE YOUR SOUND.
          </h1>

          <p className="text-sm md:text-base font-mono text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Identify sustainable pathways for your music career, informed by your sound.
          </p>
        </div>

        {/* Upload Section */}
        <div id="upload" className="w-full max-w-xl mx-auto space-y-6">
          <UploadZone
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onClear={handleClear}
            isAnalyzing={isAnalyzing}
          />

          {selectedFile && !analysisData?.mbtiProfile && (
            <div className="flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Button
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="gap-3 px-8 h-12 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 group"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze My Sound
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </div>
          )}

          {error && (
            <div className="text-center text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 animate-in fade-in duration-200">
              {error}
            </div>
          )}
        </div>

        {/* How It Works */}
        {!analysisData?.genre && !isAnalyzing && (
          <div className="w-full max-w-4xl mx-auto mt-20 md:mt-28">
            <p className="text-center text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-6">How it works</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StepCard
                step={1}
                icon={Upload}
                title="Upload"
                description="Drop your MP3 and let our AI decode your sonic signature."
              />
              <StepCard
                step={2}
                icon={Brain}
                title="Analyze"
                description="Get your Music Technical Personality Index."
              />
              <StepCard
                step={3}
                icon={Rocket}
                title="Scale"
                description="Receive your personalized industry roadmap."
              />
            </div>
          </div>
        )}
      </section>

      {/* Results Section */}
      {(analysisData?.genre || isAnalyzing) && (
        <section className="px-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AnalysisResults data={analysisData || {}} isStreaming={isAnalyzing} />
        </section>
      )}

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border/50 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-muted-foreground/60">&copy; Auxx Intelligence 2026</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-wider px-2 py-1 border border-border/40 rounded">Beta V1.0</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

function StepCard({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: number
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="group relative bg-card/30 border border-border/50 rounded-xl p-6 transition-all duration-300 hover:bg-card/60 hover:border-border">
      {/* Step number */}
      <div className="absolute -top-3 left-6">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-background border border-border text-xs font-mono text-muted-foreground">
          {step}
        </span>
      </div>
      
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center mb-4 transition-colors group-hover:bg-secondary group-hover:border-border">
        <Icon className="w-5 h-5 text-foreground/70 transition-colors group-hover:text-foreground" />
      </div>
      
      <h3 className="font-semibold text-foreground text-base mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
