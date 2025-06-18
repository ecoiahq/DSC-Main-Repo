"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function CountdownTimer() {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // Milano Cortina 2026 Paralympic Games start date: March 6, 2026
  const targetDate = new Date("March 6, 2026 00:00:00").getTime()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      // Calculate time units
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Update state
      setDays(days)
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)

      // Clear interval when date is reached
      if (distance < 0) {
        clearInterval(interval)
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
      }
    }, 1000)

    // Clean up interval
    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="relative w-full bg-black py-12">
      <div className="absolute left-0 right-0 top-0 mx-auto flex w-full max-w-[200px] justify-center pt-6">
        <Image
          src="/milano-cortina-2026.png"
          alt="Milano Cortina 2026 Paralympic Games"
          width={200}
          height={100}
          className="h-auto w-full"
        />
      </div>
      <div className="container px-4 pt-16 md:px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          <CountdownBox value={days} label="Days" />
          <CountdownBox value={hours} label="Hours" />
          <CountdownBox value={minutes} label="Minutes" />
          <CountdownBox value={seconds} label="Seconds" />
        </div>
      </div>
    </div>
  )
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  // Format the value to always have at least 2 digits
  const formattedValue = value < 10 ? `0${value}` : value.toString()

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black p-1">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/30 to-teal-400/30 blur-sm"></div>
      <div className="relative flex h-full flex-col items-center justify-center rounded-xl bg-black p-6">
        <span className="text-4xl font-bold md:text-6xl">{formattedValue}</span>
        <span className="mt-1 text-xs text-gray-400 md:text-sm">{label}</span>
      </div>
    </div>
  )
}
