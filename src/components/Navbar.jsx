// ── src/components/Navbar.jsx ────────────────────────────────────

import { theme, S } from "../styles/theme";

const NAV_LINKS = [
  { key: "home",     label: "Home"   },
  { key: "products", label: "Shop"   },
  { key: "orders",   label: "Orders" },
];

export default function Navbar({ page, setPage, cartCount, currentUser, logout }) {
  return (
    <nav
      style={{
        background:   theme.ink,
        color:        "#fff",
        padding:      "0 48px",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "space-between",
        height:       60,
        position:     "sticky",
        top:          0,
        zIndex:       100,
        boxShadow:    "0 2px 12px rgba(0,0,0,.28)",
      }}
    >
      {/* Logo */}
      <div
        onClick={() => setPage("home")}
        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
      >
        <span style={{ fontSize: 22 }}>🛍️</span>
        <span
          style={{
            fontFamily:    theme.fontDisplay,
            fontSize:      20,
            fontWeight:    700,
            letterSpacing: ".5px",
            color:         theme.warm,
          }}
        >
          Atelier
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 4 }}>
        {NAV_LINKS.map(({ key, label }) => {
          const active = page === key;
          return (
            <button
              key={key}
              onClick={() => setPage(key)}
              style={{
                ...S.btn(active ? theme.accent : "transparent", active ? "#fff" : theme.warm),
                padding:      "7px 18px",
                fontSize:     13,
                borderRadius: 6,
                border:       active ? "none" : "1px solid transparent",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Right: auth + cart */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {currentUser ? (
          <>
            <span style={{ fontSize: 13, color: theme.warm }}>
              Hi, {currentUser.name.split(" ")[0]} 👋
            </span>
            <button
              onClick={logout}
              style={{ ...S.btn("#3A3028", theme.warm), padding: "7px 14px", fontSize: 12 }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={() => setPage("auth")}
            style={{ ...S.btn("#3A3028", theme.warm), padding: "7px 16px", fontSize: 13 }}
          >
            Sign In
          </button>
        )}

        {/* Cart button */}
        <button
          onClick={() => setPage("cart")}
          style={{
            ...S.btn(theme.accent),
            padding:  "7px 18px",
            fontSize: 13,
            position: "relative",
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                position:       "absolute",
                top:            -8,
                right:          -8,
                background:     theme.green,
                color:          "#fff",
                borderRadius:   "50%",
                width:          18,
                height:         18,
                fontSize:       11,
                fontWeight:     700,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
