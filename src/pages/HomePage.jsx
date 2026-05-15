// ── src/pages/HomePage.jsx ───────────────────────────────────────

import ProductCard from "../components/ProductCard";
import { Button } from "../components/UI";
import { theme, S } from "../styles/theme";

const VALUE_PROPS = [
  {
    icon: "🚚",
    title: "Free Shipping",
    body: "On all orders over $75. Fast, tracked delivery to your door.",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    body: "30-day returns, no questions asked. Your satisfaction guaranteed.",
  },
  {
    icon: "🌿",
    title: "Sustainably Made",
    body: "We partner only with makers who respect people and planet.",
  },
];

export default function HomePage({ setPage, products, addToCart, setSelectedProduct }) {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* ── Hero ── */}
      <section
        style={{
          background:      theme.ink,
          backgroundImage: "radial-gradient(ellipse at 70% 50%, #3A3028 0%, #1C1814 100%)",
          color:           "#fff",
          padding:         "80px 48px",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          gap:             32,
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div
            style={{
              color:         theme.warm,
              fontFamily:    theme.fontDisplay,
              fontSize:      13,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom:  16,
            }}
          >
            Curated Living Essentials
          </div>

          <h1
            style={{
              fontFamily: theme.fontDisplay,
              fontSize:   52,
              fontWeight: 700,
              lineHeight: 1.15,
              margin:     "0 0 20px",
              color:      theme.cream,
            }}
          >
            Objects that earn
            <br />
            their place at home.
          </h1>

          <p
            style={{
              color:        theme.warm,
              fontSize:     17,
              lineHeight:   1.7,
              marginBottom: 32,
              maxWidth:     400,
            }}
          >
            Thoughtfully sourced, beautifully made. Each piece chosen for
            longevity, not trend.
          </p>

          <Button
            onClick={() => setPage("products")}
            style={{ padding: "14px 32px", fontSize: 15 }}
          >
            Explore the Collection →
          </Button>
        </div>

        <div style={{ fontSize: 140, opacity: 0.12, userSelect: "none" }}>🏺</div>
      </section>

      {/* ── Featured ── */}
      <section style={{ padding: "60px 48px", background: theme.bg }}>
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            marginBottom:   32,
          }}
        >
          <h2
            style={{
              fontFamily: theme.fontDisplay,
              fontSize:   28,
              color:      theme.ink,
              margin:     0,
            }}
          >
            Staff Picks
          </h2>
          <Button
            onClick={() => setPage("products")}
            bg={theme.sand}
            color={theme.ink}
            style={{ padding: "8px 18px", fontSize: 13 }}
          >
            View All →
          </Button>
        </div>

        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 20,
          }}
        >
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              onDetail={() => {
                setSelectedProduct(p);
                setPage("detail");
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Value props ── */}
      <section
        style={{
          background:          theme.ink,
          padding:             "48px",
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 32,
        }}
      >
        {VALUE_PROPS.map(({ icon, title, body }) => (
          <div key={title} style={{ textAlign: "center", color: theme.warm }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
            <div
              style={{
                fontFamily:   theme.fontDisplay,
                fontSize:     17,
                color:        theme.cream,
                marginBottom: 8,
              }}
            >
              {title}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>{body}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
