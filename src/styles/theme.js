/* ── Atelier Design Tokens ──────────────────────────────────────── */

export const theme = {
  /* Colors */
  bg:          "#F5F0EB",
  cream:       "#FDFAF6",
  sand:        "#E8E0D5",
  warm:        "#C9B99A",
  ink:         "#1C1814",
  muted:       "#7A6F64",
  accent:      "#C25B3A",
  accentLight: "#F0DDD7",
  green:       "#3A7A5B",
  greenLight:  "#D4EDE2",
  danger:      "#C03030",
  dangerLight: "#FDE8E8",

  /* Typography */
  fontDisplay: "'Playfair Display', Georgia, serif",
  fontBody:    "'Lora', Georgia, serif",

  /* Spacing */
  radiusSm: "6px",
  radiusMd: "8px",
  radiusLg: "12px",
  radiusXl: "16px",

  /* Shadows */
  shadowSm:  "0 2px 8px rgba(28,24,20,.06)",
  shadowMd:  "0 4px 16px rgba(28,24,20,.10)",
  shadowLg:  "0 8px 24px rgba(28,24,20,.13)",
};

/* Reusable style objects */
export const S = {
  card: {
    background:   theme.cream,
    borderRadius: theme.radiusLg,
    border:       `1px solid ${theme.sand}`,
    boxShadow:    theme.shadowSm,
  },

  input: {
    background:  "#fff",
    border:      `1px solid ${theme.sand}`,
    borderRadius: theme.radiusMd,
    padding:     "10px 14px",
    fontSize:    14,
    fontFamily:  theme.fontBody,
    color:       theme.ink,
    width:       "100%",
    boxSizing:   "border-box",
  },

  /** btn(bgColor, textColor) → style object */
  btn: (bg = "#C25B3A", color = "#fff") => ({
    background:   bg,
    color,
    border:       "none",
    borderRadius: theme.radiusMd,
    padding:      "10px 22px",
    fontFamily:   theme.fontDisplay,
    fontSize:     14,
    fontWeight:   600,
    cursor:       "pointer",
    letterSpacing: ".3px",
    transition:   "opacity .2s, transform .1s",
  }),
};
