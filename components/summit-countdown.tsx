"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface SummitCountdownProps {
  endDate?: string // Make optional with default
}

const SummitCountdown: React.FC<SummitCountdownProps> = ({
  endDate = "2024-06-15T09:00:00.000Z", // Default summit date
}) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  function calculateTimeRemaining() {
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()

    // Check for invalid date
    if (isNaN(end)) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const difference = end - now

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      days: isNaN(days) ? 0 : days,
      hours: isNaN(hours) ? 0 : hours,
      minutes: isNaN(minutes) ? 0 : minutes,
      seconds: isNaN(seconds) ? 0 : seconds,
    }
  }

  return (
    <div className="summit-countdown">
      <div className="countdown-timer">
        <div className="time-segment">
          <span className="time">{timeRemaining.days || 0}</span>
          <span className="label">Days</span>
        </div>
        <div className="time-segment">
          <span className="time">{timeRemaining.hours || 0}</span>
          <span className="label">Hours</span>
        </div>
        <div className="time-segment">
          <span className="time">{timeRemaining.minutes || 0}</span>
          <span className="label">Minutes</span>
        </div>
        <div className="time-segment">
          <span className="time">{timeRemaining.seconds || 0}</span>
          <span className="label">Seconds</span>
        </div>
      </div>
      <Link href="/summit">
        <button className="register-button">Register Now</button>
      </Link>
    </div>
  )
}

export default SummitCountdown
