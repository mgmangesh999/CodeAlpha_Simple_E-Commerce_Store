// ── src/hooks/useStore.js ────────────────────────────────────────
// Central "database" hook. Simulates a backend with in-memory state.
// In production: replace setUsers/setOrders with real API calls.

import { useState } from "react";
import { PRODUCTS } from "../data/products";

const FREE_SHIPPING = Number(process.env.REACT_APP_FREE_SHIPPING_THRESHOLD) || 75;
const SHIPPING_COST = Number(process.env.REACT_APP_SHIPPING_COST)           || 8.99;

/** Seed user for demo purposes */
const SEED_USERS = [
  {
    id:       1,
    name:     "Demo User",
    email:    "demo@shop.com",
    password: "demo123",
    joined:   "2024-01-15",
  },
];

export function useStore() {
  /* ── Tables ── */
  const [products]     = useState(PRODUCTS);
  const [users,    setUsers]    = useState(SEED_USERS);
  const [orders,   setOrders]   = useState([]);
  const [cart,     setCart]     = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [nextOrderId, setNextOrderId] = useState(1001);

  /* ── Cart ── */
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingCost = cartSubtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  const cartTotal    = cartSubtotal + shippingCost;
  const cartCount    = cart.reduce((sum, i) => sum + i.qty, 0);

  /* ── Auth ── */
  const register = (name, email, password) => {
    if (!name.trim())    return { ok: false, msg: "Name is required." };
    if (!email.trim())   return { ok: false, msg: "Email is required." };
    if (password.length < 6)
      return { ok: false, msg: "Password must be at least 6 characters." };
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
      return { ok: false, msg: "An account with that email already exists." };

    const newUser = {
      id:       Date.now(),
      name:     name.trim(),
      email:    email.trim().toLowerCase(),
      password,
      joined:   new Date().toISOString().slice(0, 10),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { ok: true };
  };

  const login = (email, password) => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );
    if (!user) return { ok: false, msg: "Invalid email or password." };
    setCurrentUser(user);
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  /* ── Orders ── */
  const placeOrder = (shippingInfo) => {
    if (!currentUser) return { ok: false, msg: "Please sign in first." };
    if (!cart.length)  return { ok: false, msg: "Your cart is empty." };

    const order = {
      id:       nextOrderId,
      userId:   currentUser.id,
      items:    cart.map((i) => ({ ...i })),   // snapshot
      subtotal: cartSubtotal,
      shipping: shippingCost,
      total:    cartTotal,
      address:  shippingInfo,
      status:   "Processing",
      date:     new Date().toISOString().slice(0, 10),
    };

    setOrders((prev) => [...prev, order]);
    setNextOrderId((n) => n + 1);
    clearCart();
    return { ok: true, order };
  };

  const userOrders = currentUser
    ? orders.filter((o) => o.userId === currentUser.id)
    : [];

  return {
    /* Data */
    products,
    cart,
    cartSubtotal,
    shippingCost,
    cartTotal,
    cartCount,
    currentUser,
    userOrders,
    /* Cart actions */
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    /* Auth actions */
    register,
    login,
    logout,
    /* Order actions */
    placeOrder,
    /* Constants */
    FREE_SHIPPING,
  };
}
