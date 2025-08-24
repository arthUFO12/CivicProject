"use client";

// Provides hooks to interact with an AI backend for rewriting text or generating quotes
// in a specified sentiment ("happy" or "sad").

export function useAIRewrite(mode: "happy" | "sad") {
  async function rewrite(text: string): Promise<string> {
    // Build a prompt depending on sentiment mode
    const prompt =
      mode === "happy"
        ? `Rewrite the following text in a happy and positive tone. Do not include quotation marks.:\n"${text}"`
        : `Rewrite the following text in a sad and negative tone. Do not include quotation marks.:\n"${text}"`;

    try {
      // Send prompt to backend AI endpoint
      const res = await fetch("/AI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      // Ensure backend responded with rewritten text
      if (!res.ok || !data.rewritten) {
        throw new Error(data.error || "Rewrite failed");
      }

      return data.rewritten;
    } catch (err) {
      console.error("Rewrite error:", err);
      return "Error rewriting text.";
    }
  }

  return { rewrite };
}

export function useAIQuote(mode: "happy" | "sad") {
  async function quote(): Promise<string> {
    // Build a prompt depending on sentiment mode
    const prompt =
      mode === "happy"
        ? "Respond with a random quote that has a happy and upbeat sentiment inside of quotation marks. If you didn't make the quote yourself and know the speaker or author, please leave a dash followed by their name at the end of the quote."
        : "Respond with a random quote that has a sad and melancholy sentiment inside of quotation marks. If you didn't make the quote yourself and know the speaker or author, please leave a dash followed by their name at the end of the quote.";

    try {
      // Send prompt to backend AI endpoint
      const res = await fetch("/AI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok || !data.rewritten) {
        throw new Error(data.error || "Quote generation failed");
      }

      return data.rewritten;
    } catch (err) {
      console.error("Generation error:", err);
      return "Error generating quote.";
    }
  }

  return { quote };
}
