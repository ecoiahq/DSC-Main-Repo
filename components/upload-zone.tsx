"use client"

import React from "react"

import { useCallback, useState } from "react"
import { Upload, Music, X, FileAudio, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadZoneProps {
  onFileSelect: (file: File) => void
  selectedFile: File | null
  onClear: () => void
  isAnalyzing: boolean
}

export function UploadZone({
  onFileSelect,
  selectedFile,
  onClear,
  isAnalyzing,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0]
        if (file.type === "audio/mpeg" || file.name.endsWith(".mp3")) {
          onFileSelect(file)
        }
      }
    },
    [onFileSelect]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFileSelect(e.target.files[0])
      }
    },
    [onFileSelect]
  )

  if (selectedFile) {
    return (
      <div className="relative w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className={cn(
          "border rounded-xl p-5 flex items-center gap-4 transition-all duration-300",
          isAnalyzing 
            ? "border-foreground/30 bg-card/50" 
            : "border-border bg-card/30 hover:bg-card/50"
        )}>
          {/* File icon with pulse effect when analyzing */}
          <div className={cn(
            "relative w-14 h-14 rounded-lg flex items-center justify-center transition-colors",
            isAnalyzing ? "bg-foreground/10" : "bg-secondary/70"
          )}>
            <FileAudio className={cn(
              "w-6 h-6 transition-colors",
              isAnalyzing ? "text-foreground animate-pulse" : "text-foreground/80"
            )} />
            {!isAnalyzing && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground flex items-center justify-center">
                <Check className="w-3 h-3 text-background" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate mb-1">
              {selectedFile.name}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-mono">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </span>
              {isAnalyzing && (
                <span className="text-xs text-foreground/70 font-mono animate-pulse">
                  Processing...
                </span>
              )}
            </div>
          </div>
          
          {!isAnalyzing && (
            <button
              onClick={onClear}
              className="p-2.5 hover:bg-secondary rounded-lg transition-colors group"
              aria-label="Remove file"
            >
              <X className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          )}
        </div>
        
        {/* Progress bar */}
        {isAnalyzing && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/50 overflow-hidden rounded-b-xl">
            <div className="h-full bg-foreground/80 animate-progress-indeterminate" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "relative w-full cursor-pointer group",
        "border-2 border-dashed rounded-xl p-10 md:p-14 transition-all duration-300",
        isDragging
          ? "border-foreground bg-foreground/5 scale-[1.02]"
          : "border-border/60 hover:border-muted-foreground hover:bg-card/30"
      )}
    >
      <input
        type="file"
        accept=".mp3,audio/mpeg"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload MP3 file"
      />

      <div className="flex flex-col items-center gap-5 pointer-events-none">
        {/* Icon container with animation */}
        <div
          className={cn(
            "w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300",
            isDragging
              ? "border-foreground bg-foreground text-background scale-110"
              : "border-border/60 bg-card/50 group-hover:border-muted-foreground group-hover:bg-card"
          )}
        >
          {isDragging ? (
            <Music className="w-7 h-7 animate-bounce" />
          ) : (
            <Upload className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </div>

        <div className="text-center space-y-2">
          <p className={cn(
            "font-medium text-base transition-colors",
            isDragging ? "text-foreground" : "text-foreground/90"
          )}>
            {isDragging ? "Drop your track" : "Upload your track"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag and drop or{" "}
            <span className="text-foreground/80 underline underline-offset-2">browse</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground/60 font-mono px-2 py-1 rounded-md bg-secondary/30 border border-border/30">
            .mp3
          </span>
        </div>
      </div>
    </div>
  )
}
