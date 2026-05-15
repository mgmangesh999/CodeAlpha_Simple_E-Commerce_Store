// ── src/components/UI.jsx ────────────────────────────────────────
// Reusable primitive UI components.

import { theme, S } from "../styles/theme";

/* ── Star Rating ──────────────────────────────────────────────── */
export function Stars({ rating }) {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span style={{ color: theme.accent, fontSize: 13 }}>
      {"★".repeat(full)}
      {"☆".repeat(empty)}
      <span style={{ color: theme.muted, marginLeft: 5 }}>{rating}</span>
    </span>
  );
}

/* ── Badge ────────────────────────────────────────────────────── */
export function Badge({
  children,
  bg   = theme.accentLight,
  color = theme.accent,
}) {
  return (
    <span
      style={{
        background:    bg,
        color,
        borderRadius:  20,
        padding:       "2px 10px",
        fontSize:      11,
        fontWeight:    700,
        letterSpacing: ".5px",
        textTransform: "uppercase",
        display:       "inline-block",
      }}
    >
      {children}
    </span>
  );
}

/* ── Button ───────────────────────────────────────────────────── */
export function Button({
  children,
  onClick,
  bg     = theme.accent,
  color  = "#fff",
  style  = {},
  disabled = false,
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...S.btn(bg, color),
        opacity:  disabled ? 0.5 : 1,
        cursor:   disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── Input ────────────────────────────────────────────────────── */
export function Input({ error, style = {}, ...rest }) {
  return (
    <input
      style={{
        ...S.input,
        borderColor: error ? theme.danger : theme.sand,
        ...style,
      }}
      {...rest}
    />
  );
}

/* ── FormField ────────────────────────────────────────────────── */
export function FormField({ label, error, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label
          style={{
            fontSize:     13,
            color:        theme.muted,
            display:      "block",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span style={{ fontSize: 12, color: theme.danger, marginTop: 4, display: "block" }}>
          {error}
        </span>
      )}
    </div>
  );
}

/* ── Empty State ──────────────────────────────────────────────── */
export function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div
      style={{
        padding:   "80px 24px",
        textAlign: "center",
        background: theme.bg,
        minHeight: "60vh",
        display:   "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 64 }}>{icon}</div>
      <h2
        style={{
          fontFamily: theme.fontDisplay,
          fontSize:   28,
          color:      theme.ink,
          margin:     0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: theme.muted, fontSize: 15, margin: 0 }}>{subtitle}</p>
      )}
      {action}
    </div>
  );
}

/* ── Section wrapper ──────────────────────────────────────────── */
export function Section({ children, style = {} }) {
  return (
    <div
      style={{
        padding:    "48px",
        background: theme.bg,
        minHeight:  "80vh",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Card ─────────────────────────────────────────────────────── */
export function Card({ children, style = {}, hover = false, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        ...S.card,
        boxShadow: hovered ? "0 8px 24px rgba(28,24,20,.13)" : S.card.boxShadow,
        transform: hovered ? "translateY(-2px)" : "none",
        transition: "box-shadow .2s, transform .2s",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Need React for Card hover state
import React from "react";
