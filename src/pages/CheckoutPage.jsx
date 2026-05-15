// ── src/pages/CheckoutPage.jsx ───────────────────────────────────

import { useState } from "react";
import { Button, Section } from "../components/UI";
import { theme, S } from "../styles/theme";

/* Simple validators */
const validate = (form) => {
  const errors = {};
  if (!form.fullName.trim())      errors.fullName  = "Full name is required.";
  if (!form.address.trim())       errors.address   = "Street address is required.";
  if (!form.city.trim())          errors.city      = "City is required.";
  if (!/^\d{4,6}$/.test(form.zip.trim())) errors.zip = "Enter a valid ZIP / postal code.";
  if (!/^\d{16}$/.test(form.card.replace(/\s/g, "")))
    errors.card = "Enter a valid 16-digit card number.";
  if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errors.expiry = "Use MM/YY format.";
  if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = "Enter a 3 or 4-digit CVV.";
  return errors;
};

export default function CheckoutPage({ cartSubtotal, shippingCost, cartTotal, placeOrder, setPage }) {
  const [form, setForm] = useState({
    fullName: "", address: "", city: "", zip: "",
    card: "", expiry: "", cvv: "",
  });
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const res = placeOrder({
      name:    form.fullName,
      address: `${form.address}, ${form.city} ${form.zip}`,
    });
    if (res.ok) setSuccess(res.order);
    else alert(res.msg);
  };

  /* ── Success screen ── */
  if (success) {
    return (
      <div
        style={{
          padding:        "80px 24px",
          textAlign:      "center",
          background:     theme.bg,
          minHeight:      "80vh",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          gap:            12,
        }}
      >
        <div style={{ fontSize: 72 }}>🎉</div>
        <h2 style={{ fontFamily: theme.fontDisplay, fontSize: 34, color: theme.green, margin: 0 }}>
          Order Confirmed!
        </h2>
        <p style={{ color: theme.muted, fontSize: 16, margin: 0 }}>
          Order <strong>#{success.id}</strong> is now being prepared.
        </p>
        <p style={{ color: theme.muted, fontSize: 14, margin: 0 }}>
          Total: <strong>${success.total.toFixed(2)}</strong>
          &nbsp;· Ship to: {success.address.address}
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <Button onClick={() => setPage("orders")} bg={theme.green} style={{ padding: "12px 28px" }}>
            View My Orders
          </Button>
          <Button
            onClick={() => setPage("products")}
            bg={theme.cream}
            color={theme.ink}
            style={{ padding: "12px 28px", border: `1px solid ${theme.sand}` }}
          >
            Keep Shopping
          </Button>
        </div>
      </div>
    );
  }

  /* ── Checkout form ── */
  const field = (key, label, placeholder, type = "text") => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 13, color: theme.muted, display: "block", marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={set(key)}
        style={{
          ...S.input,
          borderColor: errors[key] ? theme.danger : theme.sand,
        }}
      />
      {errors[key] && (
        <span style={{ fontSize: 12, color: theme.danger, marginTop: 4, display: "block" }}>
          {errors[key]}
        </span>
      )}
    </div>
  );

  return (
    <Section>
      <h2 style={{ fontFamily: theme.fontDisplay, fontSize: 30, color: theme.ink, marginBottom: 32 }}>
        Checkout
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, maxWidth: 900 }}>
        {/* Forms */}
        <div>
          {/* Shipping */}
          <div style={{ ...S.card, padding: 28, marginBottom: 20 }}>
            <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: "0 0 20px" }}>
              📦 Shipping Information
            </h3>
            {field("fullName", "Full Name",       "Jane Smith"         )}
            {field("address",  "Street Address",  "123 Elm Street"     )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 130px", gap: 12 }}>
              <div>{field("city", "City",    "Portland" )}</div>
              <div>{field("zip",  "ZIP / Postal", "97201"    )}</div>
            </div>
          </div>

          {/* Payment */}
          <div style={{ ...S.card, padding: 28 }}>
            <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: "0 0 12px" }}>
              💳 Payment
            </h3>
            <div
              style={{
                background:    "#FFF9F5",
                borderRadius:  theme.radiusMd,
                padding:       "10px 14px",
                fontSize:      12,
                color:         theme.muted,
                marginBottom:  16,
                border:        `1px dashed ${theme.warm}`,
              }}
            >
              Demo mode — enter any 16-digit number, e.g. <strong>4242 4242 4242 4242</strong>
            </div>
            {field("card",   "Card Number", "4242 4242 4242 4242")}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>{field("expiry", "Expiry (MM/YY)", "08/28")}</div>
              <div>{field("cvv",    "CVV",            "123"  )}</div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ ...S.card, padding: 24, alignSelf: "start" }}>
          <h3 style={{ fontFamily: theme.fontDisplay, fontSize: 18, margin: "0 0 16px" }}>
            Order Summary
          </h3>
          <SummaryRow label="Subtotal"  value={`$${cartSubtotal.toFixed(2)}`}  />
          <SummaryRow
            label="Shipping"
            value={shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
            valueColor={shippingCost === 0 ? theme.green : undefined}
          />
          <div
            style={{
              borderTop:      `1px solid ${theme.sand}`,
              paddingTop:     12,
              marginTop:      4,
              display:        "flex",
              justifyContent: "space-between",
              alignItems:     "center",
            }}
          >
            <strong style={{ color: theme.ink }}>Total</strong>
            <strong
              style={{ fontFamily: theme.fontDisplay, fontSize: 20, color: theme.accent }}
            >
              ${cartTotal.toFixed(2)}
            </strong>
          </div>
          <Button onClick={handleSubmit} style={{ width: "100%", padding: 13, fontSize: 15, marginTop: 20 }}>
            Place Order →
          </Button>
          <p style={{ fontSize: 11, color: theme.muted, textAlign: "center", marginTop: 12 }}>
            🔒 Secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </Section>
  );
}

function SummaryRow({ label, value, valueColor }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 14, color: "#7A6F64" }}>
      <span>{label}</span>
      <span style={{ color: valueColor || "#1C1814", fontWeight: 600 }}>{value}</span>
    </div>
  );
}
