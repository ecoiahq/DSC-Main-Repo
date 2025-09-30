import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("📨 Request body:", body)

    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      console.error("❌ Invalid messages format:", messages)
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyAXbv8nYOwKPRlYEg-P1TbTwsWK5yPz_rc"
    console.log("🔑 API Key check:", apiKey ? "Present" : "Missing")
    console.log("📝 Messages count:", messages.length)

    console.log("🚀 Attempting to call Gemini API with gemini-pro model...")

    const result = await generateText({
      model: google("gemini-pro", {
        apiKey: apiKey,
      }),
      messages,
      system: `You are a knowledgeable assistant specializing in Paralympic sports and disability athletics. You have extensive knowledge about:

- Paralympic sports classifications and categories
- Paralympic history and events
- Adaptive sports equipment and techniques  
- Paralympic athletes and their achievements
- Upcoming Paralympic events and competitions
- Rules and regulations for Paralympic sports
- Training methods for Paralympic athletes
- Accessibility in sports
- Disability sport organizations and governance

Provide accurate, helpful, and encouraging responses about Paralympic sports. Keep responses concise but informative. If you're unsure about specific current information like recent results or upcoming event dates, acknowledge this and suggest checking official Paralympic sources.

Always maintain a positive and inclusive tone when discussing disability sports and athletes.`,
    })

    console.log("✅ Gemini API response received successfully")

    return new Response(JSON.stringify({ content: result.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error: any) {
    console.error("💥 Detailed Chat API Error:", error)
    console.error("Error name:", error?.name)
    console.error("Error message:", error?.message)
    console.error("Error stack:", error?.stack)

    return new Response(
      JSON.stringify({
        error: "Failed to process chat request. There was an issue connecting to the AI service.",
        details: error?.message || "Unknown error",
        errorType: error?.name || "Unknown",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
