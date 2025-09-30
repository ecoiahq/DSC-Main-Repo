"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function GeminiChatSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const suggestedQuestions = [
    "What are the different Paralympic sports?",
    "Tell me about wheelchair basketball rules",
    "When are the next Paralympic Games?",
    "What is adaptive sports equipment?",
  ]

  const handleSubmit = async (question?: string) => {
    const messageToSend = question || input
    if (!messageToSend.trim()) return

    const userMessage: Message = { role: "user", content: messageToSend }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      })

      const data = await response.json()

      if (response.ok) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.response,
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        const errorMessage: Message = {
          role: "assistant",
          content: `Error: ${data.error || "Failed to get response"}. ${data.details || ""}`,
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error: any) {
      const errorMessage: Message = {
        role: "assistant",
        content: `Failed to process chat request. There was an issue connecting to the AI service. Details: ${error.message}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Bot className="h-6 w-6 text-teal-500" />
                Ask Gemini Pro About Disability Sports
              </CardTitle>
              <CardDescription className="text-gray-400">
                Get instant answers about Paralympic sports, adaptive equipment, and more
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Suggested Questions */}
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Try asking:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start text-left h-auto py-2 px-3 text-sm border-gray-600 hover:bg-gray-700 text-gray-300 bg-transparent"
                        onClick={() => handleSubmit(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="space-y-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && <Bot className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />}
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.role === "user" ? "bg-teal-600 text-white" : "bg-gray-700 text-gray-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.role === "user" && <User className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <Bot className="h-6 w-6 text-teal-500 flex-shrink-0 mt-1" />
                    <div className="bg-gray-700 rounded-lg p-3">
                      <p className="text-sm text-gray-100">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit()
                    }
                  }}
                  placeholder="Ask a question about disability sports..."
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                  rows={2}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSubmit()}
                  disabled={!input.trim() || isLoading}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
