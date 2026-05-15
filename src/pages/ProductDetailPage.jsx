// ── src/pages/ProductDetailPage.jsx ─────────────────────────────

import { useState } from "react";
import { Stars, Badge, Button, Section } from "../components/UI";
import { geminiChat, buildProductPrompt } from "../utils/gemini";
import { theme, S } from "../styles/theme";

export default function ProductDetailPage({ product, addToCart, setPage }) {
  const [qty,       setQty]       = useState(1);
  const [added,     setAdded]     = useState(false);
  const [question,  setQuestion]  = useState("");
  const [aiAnswer,  setAiAnswer]  = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  if (!product) return null;

  /* ── Add to cart ── */
  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  /* ── Ask Gemini ── */
  const handleAsk = async () => {
    const q = question.trim();
    if (!q) return;
    setAiLoading(true);
    setAiAnswer("");
    const prompt = buildProductPrompt(product, q);
    const answer = await geminiChat(prompt);
    setAiAnswer(answer);
    setAiLoading(false);
    setQuestion("");
  };

  return (
    <Section>
      {/* Back */}
      <Button
        onClick={() => setPage("products")}
        bg={theme.cream}
        color={theme.ink}
        style={{
          padding:      "8px 16px",
          fontSize:     13,
          border:       `1px solid ${theme.sand}`,
          marginBottom: 36,
        }}
      >
        ← Back to Shop
      </Button>

      {/* Product layout */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 52,
          maxWidth:            900,
        }}
      >
        {/* Image */}
        <div
          style={{
            background:     theme.sand,
            borderRadius:   theme.radiusXl,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       120,
            minHeight:      340,
            userSelect:     "none",
          }}
        >
          {product.image}
        </div>

        {/* Details */}
        <div>
          <Badge>{product.category}</Badge>

          <h1
            style={{
              fontFamily: theme.fontDisplay,
              fontSize:   32,
              color:      theme.ink,
              margin:     "12px 0 8px",
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h1>

          <Stars rating={product.rating} />
          <div style={{ fontSize: 13, color: theme.muted, margin: "4px 0 16px" }}>
            {product.reviews.toLocaleString()} verified reviews
          </div>

          <p style={{ color: theme.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
            {product.desc}
          </p>

          <div
            style={{
              fontFamily:   theme.fontDisplay,
              fontSize:     34,
              fontWeight:   700,
              color:        theme.accent,
              marginBottom: 24,
            }}
          >
            ${product.price}
          </div>

          {/* Qty + Add to cart */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                border:       `1px solid ${theme.sand}`,
                borderRadius: theme.radiusMd,
                overflow:     "hidden",
              }}
            >
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ ...S.btn(theme.cream, theme.ink), padding: "8px 14px", borderRadius: 0, fontSize: 16 }}
              >
                −
              </button>
              <span style={{ padding: "0 20px", fontSize: 16, fontWeight: 600 }}>{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                style={{ ...S.btn(theme.cream, theme.ink), padding: "8px 14px", borderRadius: 0, fontSize: 16 }}
              >
                +
              </button>
            </div>

            <Button
              onClick={handleAdd}
              bg={added ? theme.green : theme.accent}
              style={{ padding: "10px 28px", fontSize: 15, flex: 1 }}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </Button>
          </div>

          {product.stock < 10 && (
            <div style={{ fontSize: 13, color: "#9A5A2A", marginBottom: 16 }}>
              ⚠ Only {product.stock} in stock — order soon
            </div>
          )}

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
            {product.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background:    theme.sand,
                  color:         theme.muted,
                  borderRadius:  20,
                  padding:       "3px 12px",
                  fontSize:      11,
                  letterSpacing: ".5px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gemini AI Assistant ── */}
      <div
        style={{
          ...S.card,
          maxWidth: 680,
          padding:  28,
          marginTop: 52,
        }}
      >
        <h3
          style={{
            fontFamily:   theme.fontDisplay,
            fontSize:     20,
            color:        theme.ink,
            margin:       "0 0 6px",
            display:      "flex",
            alignItems:   "center",
            gap:          8,
          }}
        >
          ✨ Ask about this product
          <span
            style={{
              fontSize:   13,
              fontWeight: 400,
              color:      theme.muted,
              fontFamily: theme.fontBody,
            }}
          >
            (Gemini AI)
          </span>
        </h3>
        <p style={{ color: theme.muted, fontSize: 13, marginBottom: 16 }}>
          Questions about materials, care instructions, sizing, or compatibility? Ask away.
        </p>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="e.g. Is this dishwasher safe?"
            style={{ ...S.input, flex: 1 }}
          />
          <Button
            onClick={handleAsk}
            style={{ padding: "10px 20px", fontSize: 14, whiteSpace: "nowrap" }}
          >
            {aiLoading ? "Thinking…" : "Ask →"}
          </Button>
        </div>

        {aiLoading && (
          <div style={{ marginTop: 14, fontSize: 13, color: theme.muted, fontStyle: "italic" }}>
            Gemini is thinking…
          </div>
        )}

        {aiAnswer && !aiLoading && (
          <div
            style={{
              marginTop:   16,
              background:  theme.accentLight,
              borderRadius: theme.radiusMd,
              padding:     16,
              fontSize:    14,
              color:       theme.ink,
              lineHeight:  1.7,
              borderLeft:  `3px solid ${theme.accent}`,
            }}
          >
            <strong>Atelier AI:</strong> {aiAnswer}
          </div>
        )}
      </div>
    </Section>
  );
}
