"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function GeminiChatSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-900 py-16 border-b border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Ask Anything About Paralympic Sports</h2>
            </div>
            <p className="text-gray-300 text-lg">
              Get instant answers about Paralympic sports, athletes, events, and more with AI-powered assistance
            </p>
          </div>

          {/* Chat Container */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-0">
              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Bot className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                      Welcome to Paralympic Sports AI Assistant
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Ask me anything about Paralympic sports, athletes, classifications, or upcoming events!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
                        onClick={() => setInput("What are the different Paralympic sport classifications?")}
                      >
                        What are Paralympic classifications?
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
                        onClick={() => setInput("Tell me about wheelchair basketball rules")}
                      >
                        Wheelchair basketball rules
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
                        onClick={() => setInput("Who are the top Paralympic swimmers?")}
                      >
                        Top Paralympic swimmers
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
                        onClick={() => setInput("When is the next Paralympic Games?")}
                      >
                        Next Paralympic Games
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user" ? "bg-teal-600 text-white" : "bg-gray-800 text-gray-100"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        {message.role === "user" && (
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="bg-gray-800 text-gray-100 rounded-lg px-4 py-2">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-700 p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Paralympic sports, athletes, events..."
                    className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus-visible:ring-teal-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-teal-600 hover:bg-teal-500 text-white px-4"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                  {messages.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearChat}
                      className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Clear
                    </Button>
                  )}
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by Google Gemini AI • Information may not always be accurate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
