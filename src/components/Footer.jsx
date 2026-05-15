// ── src/components/Footer.jsx ────────────────────────────────────

import { theme } from "../styles/theme";

const LINKS = ["home", "products", "orders"];

export default function Footer({ setPage }) {
  return (
    <footer
      style={{
        background:     theme.ink,
        color:          theme.warm,
        padding:        "32px 48px",
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        flexWrap:       "wrap",
        gap:            16,
      }}
    >
      {/* Brand */}
      <div
        style={{
          fontFamily: theme.fontDisplay,
          fontSize:   18,
          color:      theme.warm,
        }}
      >
        🛍️ Atelier
      </div>

      {/* Copyright */}
      <div style={{ fontSize: 12, color: "#6B6058", textAlign: "center" }}>
        © {new Date().getFullYear()} Atelier Store · Built with React &amp; Gemini AI
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 20 }}>
        {LINKS.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              background: "none",
              border:     "none",
              color:      theme.warm,
              cursor:     "pointer",
              fontSize:   13,
              fontFamily: theme.fontBody,
            }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </footer>
  );
}
