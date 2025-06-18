"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface SportHistoryTimelineProps {
  events: TimelineEvent[]
  subtitle?: string
}

export default function SportHistoryTimeline({ events, subtitle }: SportHistoryTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <section className="bg-gray-950 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Sport History</h2>
          {subtitle && <p className="mb-12 text-lg text-gray-300">{subtitle}</p>}
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-teal-500 to-teal-700 md:left-1/2 md:-translate-x-px"></div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="absolute left-8 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                  <div className="h-4 w-4 rounded-full bg-teal-500 ring-4 ring-gray-950"></div>
                </div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="ml-16 md:ml-0">
                    <div className="rounded-lg bg-gray-900 p-6 shadow-lg transition-all duration-300 hover:bg-gray-800">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-teal-600 px-3 py-1 text-sm font-bold text-white">
                          {event.year}
                        </span>
                        <button
                          onClick={() => toggleExpanded(index)}
                          className="text-gray-400 hover:text-teal-400 transition-colors"
                        >
                          {expandedItems.has(index) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <h3 className="mb-3 text-xl font-bold text-white">{event.title}</h3>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
