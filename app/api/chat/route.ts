import { google } from "@ai-sdk/google"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    console.log("🤖 Chat API called")

    const { message } = await req.json()
    console.log("📩 Received message:", message)

    if (!message) {
      console.log("❌ No message provided")
      return Response.json({ error: "Message is required" }, { status: 400 })
    }

    // Check for API key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "AIzaSyAXbv8nYOwKPRlYEg-P1TbTwsWK5yPz_rc"

    if (!apiKey) {
      console.log("❌ No API key found")
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("✅ API key found, length:", apiKey.length)

    // Initialize Google AI
    const model = google("gemini-pro", {
      apiKey: apiKey,
    })

    console.log("🔄 Calling generateText...")

    // Generate response
    const result = await generateText({
      model,
      prompt: `You are a helpful assistant for the Disability Sports Channel website. 
      Answer questions about disability sports, Paralympic events, adaptive sports, and related topics.
      Be informative, respectful, and encouraging.
      
      User question: ${message}`,
    })

    console.log("✅ Response generated:", result.text.substring(0, 100) + "...")

    return Response.json({
      response: result.text,
      usage: result.usage,
    })
  } catch (error: any) {
    console.error("💥 Chat API Error:", error)
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    })

    return Response.json(
      {
        error: "Failed to process chat request",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
