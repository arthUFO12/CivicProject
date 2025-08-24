// src/lib/ai.ts
// This module provides a helper to rewrite text using the OpenAI API.
// It is used by the editor's slash commands to change tone (happy/sad).
// Also used to generate happy/sad quotes.


import OpenAI from "openai";


// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});


/**
 * Sends a prompt to OpenAI's Chat Completions API and returns the rewritten text.
 *
 * @param prompt - The input text along with instructions on how to rewrite it
 * @returns The rewritten text from the model
 */
export async function rewriteText(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo", // cheap model
  messages: [{ role: "user", content: prompt }],
  temperature: 0.7,
  });


  // Get the rewritten text from the response
  const rewritten = response.choices[0]?.message?.content?.trim();
  if (!rewritten) throw new Error("No response");


  return rewritten;
}