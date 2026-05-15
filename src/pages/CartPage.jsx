// ── src/pages/CartPage.jsx ───────────────────────────────────────

import { Button, EmptyState, Section } from "../components/UI";
import { theme, S } from "../styles/theme";

export default function CartPage({
  cart,
  cartSubtotal,
  shippingCost,
  cartTotal,
  FREE_SHIPPING,
  removeFromCart,
  updateQty,
  setPage,
  currentUser,
}) {
  if (cart.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        subtitle="Add some beautiful things to get started."
        action={
          <Button onClick={() => setPage("products")} style={{ padding: "12px 28px" }}>
            Browse Products
          </Button>
        }
      />
    );
  }

  const remainingForFree = FREE_SHIPPING - cartSubtotal;

  return (
    <Section>
      <h2
        style={{
          fontFamily:   theme.fontDisplay,
          fontSize:     30,
          color:        theme.ink,
          marginBottom: 32,
        }}
      >
        Shopping Cart
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
        {/* Cart items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                ...S.card,
                padding:    20,
                display:    "flex",
                gap:        20,
                alignItems: "center",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  background:     theme.sand,
                  borderRadius:   theme.radiusMd,
                  width:          72,
                  height:         72,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       36,
                  flexShrink:     0,
                }}
              >
                {item.image}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily:  theme.fontDisplay,
                    fontSize:    16,
                    fontWeight:  700,
                    color:       theme.ink,
                    marginBottom: 2,
                  }}
                >
                  {item.name}
                </div>
                <div style={{ color: theme.muted, fontSize: 13 }}>{item.category}</div>
                <div style={{ color: theme.accent, fontWeight: 700, fontSize: 15, marginTop: 4 }}>
                  ${item.price}
                </div>
              </div>

              {/* Qty stepper */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  style={{ ...S.btn(theme.sand, theme.ink), padding: "5px 12px" }}
                >
                  −
                </button>
                <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  style={{ ...S.btn(theme.sand, theme.ink), padding: "5px 12px" }}
                >
                  +
                </button>
              </div>

              {/* Line total */}
              <div
                style={{
                  fontFamily: theme.fontDisplay,
                  fontSize:   17,
                  fontWeight: 700,
                  color:      theme.ink,
                  minWidth:   72,
                  textAlign:  "right",
                }}
              >
                ${(item.price * item.qty).toFixed(2)}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ ...S.btn(theme.dangerLight, theme.danger), padding: "6px 12px", fontSize: 13 }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{ ...S.card, padding: 28 }}>
          <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 20, margin: "0 0 20px" }}>
            Order Summary
          </h3>

          <div style={{ fontSize: 14, color: theme.muted }}>
            <Row label="Subtotal"  value={`$${cartSubtotal.toFixed(2)}`} />
            <Row
              label="Shipping"
              value={shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              valueColor={shippingCost === 0 ? theme.green : undefined}
            />
            <div
              style={{
                borderTop:   `1px solid ${theme.sand}`,
                paddingTop:  12,
                marginTop:   12,
                display:     "flex",
                justifyContent: "space-between",
                alignItems:  "center",
              }}
            >
              <strong style={{ color: theme.ink }}>Total</strong>
              <strong
                style={{
                  fontFamily: theme.fontDisplay,
                  fontSize:   20,
                  color:      theme.accent,
                }}
              >
                ${cartTotal.toFixed(2)}
              </strong>
            </div>
          </div>

          <Button
            onClick={() => setPage(currentUser ? "checkout" : "auth")}
            style={{ width: "100%", padding: "13px", fontSize: 15, marginTop: 20, textAlign: "center" }}
          >
            {currentUser ? "Proceed to Checkout →" : "Sign In to Checkout →"}
          </Button>

          {!currentUser && (
            <p style={{ fontSize: 12, color: theme.muted, textAlign: "center", marginTop: 10 }}>
              Create a free account to place your order.
            </p>
          )}

          {remainingForFree > 0 && (
            <div
              style={{
                marginTop:    14,
                background:   theme.greenLight,
                borderRadius: theme.radiusMd,
                padding:      "10px 14px",
                fontSize:     12,
                color:        theme.green,
                textAlign:    "center",
              }}
            >
              Add ${remainingForFree.toFixed(2)} more for free shipping!
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      <span>{label}</span>
      <span style={{ color: valueColor || "#1C1814", fontWeight: 600 }}>{value}</span>
    </div>
  );
}
