// ── src/components/ProductCard.jsx ──────────────────────────────

import { useState } from "react";
import { Stars, Badge, Button } from "./UI";
import { theme, S } from "../styles/theme";

export default function ProductCard({ product, addToCart, onDetail }) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      onClick={onDetail}
      style={{
        ...S.card,
        overflow:   "hidden",
        cursor:     "pointer",
        transition: "box-shadow .2s, transform .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(28,24,20,.13)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = S.card.boxShadow;
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          background:     theme.sand,
          height:         160,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       64,
          userSelect:     "none",
        }}
      >
        {product.image}
      </div>

      {/* Body */}
      <div style={{ padding: 16 }}>
        <Badge>{product.category}</Badge>

        <div
          style={{
            fontFamily: theme.fontDisplay,
            fontSize:   16,
            fontWeight: 700,
            color:      theme.ink,
            margin:     "8px 0 4px",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </div>

        <Stars rating={product.rating} />
        <div style={{ fontSize: 12, color: theme.muted, marginBottom: 12 }}>
          ({product.reviews.toLocaleString()} reviews)
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: theme.fontDisplay,
              fontSize:   18,
              fontWeight: 700,
              color:      theme.accent,
            }}
          >
            ${product.price}
          </span>

          <Button
            onClick={handleAdd}
            bg={added ? theme.green : theme.accent}
            style={{ padding: "7px 14px", fontSize: 12 }}
          >
            {added ? "✓ Added" : "+ Cart"}
          </Button>
        </div>

        {product.stock < 10 && (
          <div style={{ fontSize: 11, color: "#9A5A2A", marginTop: 6 }}>
            ⚠ Only {product.stock} left in stock
          </div>
        )}
      </div>
    </div>
  );
}
