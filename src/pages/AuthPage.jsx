// ── src/pages/AuthPage.jsx ───────────────────────────────────────

import { useState } from "react";
import { Button } from "../components/UI";
import { theme, S } from "../styles/theme";

export default function AuthPage({ register, login, setPage }) {
  const [mode,     setMode]     = useState("login");   // "login" | "register"
  const [form,     setForm]     = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors,   setErrors]   = useState({});
  const [apiError, setApiError] = useState("");
  const [loading,  setLoading]  = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (mode === "register" && !form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email address.";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters.";
    if (mode === "register" && form.password !== form.confirm)
      e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setApiError("");

    const res =
      mode === "login"
        ? login(form.email, form.password)
        : register(form.name, form.email, form.password);

    setLoading(false);
    if (res.ok) setPage("home");
    else setApiError(res.msg);
  };

  const switchMode = () => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setErrors({});
    setApiError("");
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

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
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
    <div
      style={{
        background:     theme.bg,
        minHeight:      "80vh",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        padding:        24,
      }}
    >
      <div style={{ ...S.card, padding: "40px 36px", width: "100%", maxWidth: 420 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 40 }}>🛍️</span>
          <h2
            style={{
              fontFamily: theme.fontDisplay,
              fontSize:   26,
              color:      theme.ink,
              margin:     "10px 0 4px",
            }}
          >
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ color: theme.muted, fontSize: 13 }}>
            {mode === "login"
              ? "Sign in to your Atelier account"
              : "Join Atelier today — it's free"}
          </p>
        </div>

        {/* Fields */}
        {mode === "register" && field("name",    "Full Name",        "Jane Smith"        )}
        {field("email",    "Email Address",    "hello@example.com")}
        {field("password", "Password",         "••••••••",          "password"          )}
        {mode === "register" && field("confirm", "Confirm Password",  "••••••••",          "password")}

        {/* API error */}
        {apiError && (
          <div
            style={{
              background:   theme.dangerLight,
              color:        theme.danger,
              borderRadius: theme.radiusMd,
              padding:      "10px 14px",
              fontSize:     13,
              marginBottom: 16,
            }}
          >
            {apiError}
          </div>
        )}

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          style={{ width: "100%", padding: "13px", fontSize: 15, textAlign: "center" }}
        >
          {loading
            ? "Please wait…"
            : mode === "login"
            ? "Sign In"
            : "Create Account"}
        </Button>

        {/* Demo hint */}
        {mode === "login" && (
          <div
            style={{
              marginTop:    14,
              padding:      14,
              background:   theme.sand,
              borderRadius: theme.radiusMd,
              fontSize:     12,
              color:        theme.muted,
              textAlign:    "center",
            }}
          >
            Demo credentials:{" "}
            <strong style={{ color: theme.ink }}>demo@shop.com</strong> /{" "}
            <strong style={{ color: theme.ink }}>demo123</strong>
          </div>
        )}

        {/* Switch mode */}
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: theme.muted }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={switchMode}
            style={{
              background: "none",
              border:     "none",
              color:      theme.accent,
              cursor:     "pointer",
              fontWeight: 700,
              fontSize:   13,
              fontFamily: "inherit",
            }}
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
