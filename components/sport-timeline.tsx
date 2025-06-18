"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { SportTimeline } from "@/lib/sports-data"

interface SportTimelineProps {
  timeline: SportTimeline[]
}

export default function SportTimelineComponent({ timeline }: SportTimelineProps) {
  if (!timeline || timeline.length === 0) {
    return <div className="text-center text-gray-400 py-8">No timeline data available</div>
  }

  return (
    <div className="relative space-y-8 py-6 before:absolute before:inset-0 before:ml-5 before:h-full before:border-l-2 before:border-gray-700 before:content-[''] md:before:mx-auto md:before:right-0 md:before:border-l-0 md:before:border-r-0">
      {timeline.map((item, index) => (
        <TimelineItem key={`${item.year}-${index}`} item={item} index={index} />
      ))}
    </div>
  )
}

interface TimelineItemProps {
  item: SportTimeline
  index: number
}

function TimelineItem({ item, index }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const isMajorEvent =
    item.event.toLowerCase().includes("paralympic") ||
    item.event.toLowerCase().includes("world championship") ||
    item.event.toLowerCase().includes("origins")

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
      },
    },
  }

  const circleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: index * 0.2 + 0.2,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.3,
      },
    },
  }

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex flex-col items-start gap-3 md:flex-row md:gap-6 ${
        index % 2 === 0 ? "md:flex-row-reverse" : ""
      }`}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${
          isMajorEvent ? "bg-teal-600" : "bg-gray-700"
        } text-white shadow-md md:order-1 hover:scale-110 transition-transform cursor-pointer`}
        variants={circleVariants}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-bold text-xs">{item.year}</span>
      </motion.div>

      <motion.div
        className="flex-grow rounded-lg bg-gray-900 p-4 shadow-md hover:bg-gray-800 transition-colors cursor-pointer"
        variants={contentVariants}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className={`mb-1 text-lg font-bold ${isMajorEvent ? "text-teal-400" : "text-gray-300"}`}>{item.event}</h3>
          <button
            className="text-gray-400 hover:text-teal-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <p className="text-sm text-gray-300">{item.description}</p>
      </motion.div>
    </motion.div>
  )
}
