"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  src?: string
  poster?: string
  autoPlay?: boolean
  isLive?: boolean
  viewerCount?: string
  className?: string
}

export default function VideoPlayer({
  src = "/placeholder-video.mp4",
  poster,
  autoPlay = false,
  isLive = false,
  viewerCount,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [])

  // Auto-hide controls
  useEffect(() => {
    if (!showControls) return

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [showControls, isPlaying])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
    setShowControls(true)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
    setShowControls(true)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const seekTime = (Number.parseInt(e.target.value) / 100) * video.duration
    video.currentTime = seekTime
    setCurrentTime(seekTime)
    setShowControls(true)
  }

  const handleFullscreen = () => {
    const videoContainer = document.querySelector(".video-container")
    if (!videoContainer) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      videoContainer.requestFullscreen()
    }
    setShowControls(true)
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const skipBackward = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.max(0, video.currentTime - 10)
    setShowControls(true)
  }

  const skipForward = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.min(video.duration, video.currentTime + 10)
    setShowControls(true)
  }

  return (
    <div
      className={cn("video-container relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900", className)}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full object-cover"
        onClick={togglePlay}
        autoPlay={autoPlay}
        playsInline
      />

      {/* Live indicator */}
      {isLive && (
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </span>
          LIVE
        </div>
      )}

      {/* Viewer count */}
      {viewerCount && (
        <div className="absolute top-4 right-4 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
          {viewerCount} watching
        </div>
      )}

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          onClick={togglePlay}
          aria-hidden="true"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/90 text-black">
            <Play className="h-8 w-8" />
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-6 transition-opacity",
          showControls ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Progress bar (hidden for live content) */}
        {!isLive && (
          <div className="mb-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-600 accent-teal-500"
              aria-label="Seek"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause button */}
            <button
              onClick={togglePlay}
              className="rounded-full p-1 text-white hover:bg-white/20"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            {/* Skip buttons (hidden for live content) */}
            {!isLive && (
              <>
                <button
                  onClick={skipBackward}
                  className="rounded-full p-1 text-white hover:bg-white/20"
                  aria-label="Skip backward 10 seconds"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  onClick={skipForward}
                  className="rounded-full p-1 text-white hover:bg-white/20"
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Volume button */}
            <button
              onClick={toggleMute}
              className="rounded-full p-1 text-white hover:bg-white/20"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>

            {/* Time display (hidden for live content) */}
            {!isLive && (
              <div className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            )}
          </div>

          <div>
            {/* Fullscreen button */}
            <button
              onClick={handleFullscreen}
              className="rounded-full p-1 text-white hover:bg-white/20"
              aria-label="Toggle fullscreen"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
