// ── src/pages/OrdersPage.jsx ─────────────────────────────────────

import { Badge, Button, EmptyState, Section } from "../components/UI";
import { theme, S } from "../styles/theme";

const STATUS_COLORS = {
  Processing: { bg: "#FFF3E0", color: "#E65100" },
  Shipped:    { bg: "#E3F2FD", color: "#1565C0" },
  Delivered:  { bg: "#E8F5E9", color: "#2E7D32" },
  Cancelled:  { bg: "#FFEBEE", color: "#C62828" },
};

export default function OrdersPage({ userOrders, currentUser, setPage }) {
  if (!currentUser) {
    return (
      <EmptyState
        icon="🔐"
        title="Sign in to view your orders"
        subtitle="Your order history lives here once you're logged in."
        action={
          <Button onClick={() => setPage("auth")} style={{ padding: "12px 28px" }}>
            Sign In →
          </Button>
        }
      />
    );
  }

  if (!userOrders.length) {
    return (
      <EmptyState
        icon="📦"
        title="No orders yet"
        subtitle="Your future orders will appear here."
        action={
          <Button onClick={() => setPage("products")} style={{ padding: "12px 28px" }}>
            Start Shopping
          </Button>
        }
      />
    );
  }

  const sorted = [...userOrders].reverse();

  return (
    <Section>
      <h2
        style={{
          fontFamily:   theme.fontDisplay,
          fontSize:     30,
          color:        theme.ink,
          marginBottom: 8,
        }}
      >
        My Orders
      </h2>
      <p style={{ color: theme.muted, fontSize: 14, marginBottom: 32 }}>
        {userOrders.length} order{userOrders.length !== 1 ? "s" : ""} placed
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
        {sorted.map((order) => {
          const sc = STATUS_COLORS[order.status] || STATUS_COLORS["Processing"];
          return (
            <div key={order.id} style={{ ...S.card, padding: 24 }}>
              {/* Header */}
              <div
                style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  alignItems:     "flex-start",
                  marginBottom:   16,
                  flexWrap:       "wrap",
                  gap:            8,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: theme.fontDisplay,
                      fontSize:   17,
                      fontWeight: 700,
                      color:      theme.ink,
                    }}
                  >
                    Order #{order.id}
                  </div>
                  <div style={{ fontSize: 13, color: theme.muted, marginTop: 2 }}>
                    Placed on {order.date}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Badge bg={sc.bg} color={sc.color}>{order.status}</Badge>
                  <span
                    style={{
                      fontFamily: theme.fontDisplay,
                      fontSize:   18,
                      fontWeight: 700,
                      color:      theme.accent,
                    }}
                  >
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping address */}
              <div style={{ fontSize: 13, color: theme.muted, marginBottom: 14 }}>
                📍 {order.address.address}
              </div>

              {/* Items */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display:      "flex",
                      alignItems:   "center",
                      gap:          8,
                      background:   theme.sand,
                      borderRadius: theme.radiusMd,
                      padding:      "6px 14px",
                      fontSize:     13,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{item.image}</span>
                    <span style={{ color: theme.ink, fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: theme.muted }}>× {item.qty}</span>
                    <span style={{ color: theme.accent, fontWeight: 600 }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div
                style={{
                  marginTop:  16,
                  paddingTop: 16,
                  borderTop:  `1px solid ${theme.sand}`,
                  display:    "flex",
                  gap:        24,
                  fontSize:   12,
                  color:      theme.muted,
                  flexWrap:   "wrap",
                }}
              >
                <span>Subtotal: <strong>${order.subtotal.toFixed(2)}</strong></span>
                <span>
                  Shipping:{" "}
                  <strong style={{ color: order.shipping === 0 ? theme.green : undefined }}>
                    {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
                  </strong>
                </span>
                <span>Items: <strong>{order.items.reduce((s, i) => s + i.qty, 0)}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
