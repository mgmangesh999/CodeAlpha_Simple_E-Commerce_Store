// ── src/pages/ProductsPage.jsx ───────────────────────────────────

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Button, EmptyState, Section } from "../components/UI";
import { CATEGORIES } from "../data/products";
import { theme, S } from "../styles/theme";

const SORT_OPTIONS = [
  { value: "default",   label: "Sort: Featured"        },
  { value: "priceLow",  label: "Price: Low → High"     },
  { value: "priceHigh", label: "Price: High → Low"     },
  { value: "rating",    label: "Top Rated"              },
  { value: "stock",     label: "Availability"           },
];

export default function ProductsPage({ products, addToCart, setSelectedProduct, setPage }) {
  const [category, setCategory] = useState("All");
  const [search,   setSearch]   = useState("");
  const [sort,     setSort]     = useState("default");

  /* Filter */
  let list = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())))
  );

  /* Sort */
  const sorted = [...list].sort((a, b) => {
    if (sort === "priceLow")  return a.price  - b.price;
    if (sort === "priceHigh") return b.price  - a.price;
    if (sort === "rating")    return b.rating - a.rating;
    if (sort === "stock")     return b.stock  - a.stock;
    return 0;
  });

  return (
    <Section>
      <h2
        style={{
          fontFamily:   theme.fontDisplay,
          fontSize:     30,
          color:        theme.ink,
          marginBottom: 24,
        }}
      >
        The Collection
      </h2>

      {/* Filters toolbar */}
      <div
        style={{
          display:     "flex",
          gap:         10,
          marginBottom: 24,
          flexWrap:    "wrap",
          alignItems:  "center",
        }}
      >
        {/* Search */}
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...S.input, maxWidth: 240 }}
        />

        {/* Category pills */}
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <Button
              key={cat}
              onClick={() => setCategory(cat)}
              bg={active ? theme.accent : theme.cream}
              color={active ? "#fff" : theme.ink}
              style={{
                padding:    "7px 16px",
                fontSize:   13,
                border:     active ? "none" : `1px solid ${theme.sand}`,
              }}
            >
              {cat}
            </Button>
          );
        })}

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ ...S.input, width: "auto", cursor: "pointer" }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div style={{ fontSize: 13, color: theme.muted, marginBottom: 20 }}>
        {sorted.length} product{sorted.length !== 1 ? "s" : ""}
        {search && ` matching "${search}"`}
      </div>

      {sorted.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No products found"
          subtitle={`No results for "${search}" in ${category}.`}
          action={
            <Button
              onClick={() => { setSearch(""); setCategory("All"); }}
              style={{ padding: "10px 24px" }}
            >
              Clear Filters
            </Button>
          }
        />
      ) : (
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap:                 20,
          }}
        >
          {sorted.map((p) => (
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
      )}
    </Section>
  );
}
