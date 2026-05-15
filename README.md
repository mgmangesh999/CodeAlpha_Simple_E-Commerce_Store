# 🛍️ E-Commerce Store

A curated e-commerce store built with **React** and powered by **Gemini AI**.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🏠 Home page | Hero banner, staff picks grid, value props |
| 🛍️ Product listings | 12 products, filter by category, search, sort |
| 📄 Product detail | Qty selector, stock warning, Gemini AI assistant |
| 🛒 Shopping cart | Add/remove/update qty, free-shipping progress |
| 💳 Checkout | Shipping + payment form with validation |
| 📦 Order history | All past orders per user |
| 🔐 Auth | Register / Login with field validation |
| ✨ Gemini AI | Ask product questions on the detail page |

---

## 🚀 Quick Start

### 1. Clone / download the project

```bash
cd CodeAlpha_Simple_E-Commerce_Store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your Gemini API key

Copy the example env file:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
REACT_APP_GEMINI_API_KEY=your_actual_key_here
```

**How to get a free Gemini API key:**
1. Visit https://aistudio.google.com/
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API Key"**
4. Copy and paste the key into `.env`

### 4. Start the development server

```bash
npm start
```

Open http://localhost:3000 to view the app.

---

## 📁 Project Structure

```
CodeAlpha_Simple_E-Commerce_Store/
├── .env                       ← Your API key here
├── .gitignore
├── package.json
├── public/
│   └── index.html
└── src/
    ├── App.jsx                 ← Root router / layout
    ├── index.js                ← React entry point
    ├── data/
    │   └── products.js         ← Product catalogue seed data
    ├── hooks/
    │   └── useStore.js         ← Central state (cart, auth, orders)
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── ProductsPage.jsx
    │   ├── ProductDetailPage.jsx
    │   ├── CartPage.jsx
    │   ├── CheckoutPage.jsx
    │   ├── OrdersPage.jsx
    │   └── AuthPage.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   └── UI.jsx              ← Stars, Badge, Button, Input, Card …
    ├── utils/
    │   └── gemini.js           ← Gemini API helper (reads from .env)
    └── styles/
        ├── global.css
        └── theme.js            ← Design tokens + shared style objects
```

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| Styling | CSS-in-JS (inline styles + CSS vars) |
| AI | Google Gemini 2.0 Flash (free tier) |
| State | React `useState` (in-memory) |
| Fonts | Playfair Display + Lora (Google Fonts) |

---

## 🌐 Demo Credentials

| Field | Value |
|---|---|
| Email | `demo@shop.com` |
| Password | `demo123` |

---

## 📦 Build for Production

```bash
npm run build
```

Outputs to the `build/` folder, ready to deploy on Netlify, Vercel, or any static host.

---

## 🔒 Security Notes

- `.env` is in `.gitignore` — **never** commit it.
- The Gemini API key is exposed in the browser bundle (client-side app).
  For production, proxy requests through your own backend server.

---

## 📄 License

MIT — free to use and modify.
