"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OBSProps {
  streamId?: string
  fallbackImage?: string
  height?: string
  showChat?: boolean
}

export default function OBSIntegration({
  streamId = "abcd1234", // Replace with your actual OBS stream ID
  fallbackImage = "/placeholder.svg?key=fyb5t",
  height = "600px",
  showChat = true,
}: OBSProps) {
  const [isLive, setIsLive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Simulate checking if stream is live
  useEffect(() => {
    const checkStreamStatus = () => {
      // In a real implementation, you would call an API to check if the stream is live
      // For demo purposes, we're just setting it to true after a delay
      setTimeout(() => {
        setIsLive(true)
        setIsLoading(false)
      }, 2000)
    }

    checkStreamStatus()
    const interval = setInterval(checkStreamStatus, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [streamId])

  return (
    <div className="w-full">
      <Tabs defaultValue="stream" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="stream">Live Stream</TabsTrigger>
        </TabsList>

        <TabsContent value="stream" className="border border-gray-200 dark:border-gray-800 rounded-md">
          {isLoading ? (
            <div className="flex items-center justify-center bg-gray-900 w-full" style={{ height }}>
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-white">Checking stream status...</p>
              </div>
            </div>
          ) : isLive ? (
            <div className="aspect-video w-full">
              {/* This is where the actual OBS embed would go */}
              <div className="relative w-full h-full">
                <iframe
                  src={`http://your-obs-streaming-endpoint/${streamId}`}
                  allow="camera; microphone; fullscreen; display-capture; picture-in-picture"
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center bg-gray-900 w-full"
              style={{
                height,
                backgroundImage: `url(${fallbackImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center bg-black/70 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Stream Not Live</h3>
                <p className="mb-4">The broadcast hasn't started yet. Please check back later.</p>
                <Button>Get Notified When Live</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
