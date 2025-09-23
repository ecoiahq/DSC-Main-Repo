import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: "AIzaSyAXbv8nYOwKPRlYEg-P1TbTwsWK5yPz_rc",
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

    return new Response(JSON.stringify({ content: result.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request. There was an issue connecting to the AI service.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
