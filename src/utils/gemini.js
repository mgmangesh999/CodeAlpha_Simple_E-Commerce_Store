// ── src/utils/gemini.js ──────────────────────────────────────────
// Gemini AI helper. API key is loaded from .env via
// REACT_APP_GEMINI_API_KEY (Create React App convention).

const API_KEY  = process.env.REACT_APP_GEMINI_API_KEY || "";
const ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Send a prompt to Gemini 2.0 Flash and return the text response.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function geminiChat(prompt) {
  if (!API_KEY || API_KEY === "your_gemini_api_key_here") {
    return (
      "⚠ Gemini API key not configured. " +
      "Add your key to the .env file as REACT_APP_GEMINI_API_KEY."
    );
  }

  try {
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature:     0.7,
          maxOutputTokens: 256,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Gemini API error:", err);
      return `Error ${res.status}: ${err?.error?.message || "Unknown error"}`;
    }

    const data = await res.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No response from AI."
    );
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    return "AI assistant is unavailable right now. Please try again later.";
  }
}

/**
 * Build a product-expert prompt for the AI assistant.
 * @param {Object} product
 * @param {string} question
 * @returns {string}
 */
export function buildProductPrompt(product, question) {
  return `You are a friendly, knowledgeable product expert for "Atelier", a premium curated home-goods store.
Product details:
  Name:     ${product.name}
  Category: ${product.category}
  Price:    $${product.price}
  Description: ${product.desc}
  Tags: ${product.tags.join(", ")}

A customer asks: "${question}"

Respond helpfully and concisely in 2-3 sentences. Be warm and conversational.`;
}
