import { NextRequest, NextResponse } from "next/server";
import { rewriteText } from "@/lib/ai";

// API route handler for POST requests to /AI
// - Expects a JSON body with { prompt }
// - Calls rewriteText() and responds with rewritten text
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    // Validate request body
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    // Call AI text rewriting function
    const rewritten = await rewriteText(prompt);

    // Return rewritten text in JSON response
    return NextResponse.json({ rewritten });
  } catch (error) {
    console.error("Rewrite API error:", error);
    return NextResponse.json({ error: "Failed to rewrite text" }, { status: 500 });
  }
}
