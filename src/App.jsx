// ── src/App.jsx ──────────────────────────────────────────────────
// Root component: lightweight client-side "router" + layout shell.

import { useState } from "react";
import { useStore }          from "./hooks/useStore";
import Navbar                from "./components/Navbar";
import Footer                from "./components/Footer";
import HomePage              from "./pages/HomePage";
import ProductsPage          from "./pages/ProductsPage";
import ProductDetailPage     from "./pages/ProductDetailPage";
import CartPage              from "./pages/CartPage";
import CheckoutPage          from "./pages/CheckoutPage";
import OrdersPage            from "./pages/OrdersPage";
import AuthPage              from "./pages/AuthPage";

export default function App() {
  const [page,            setPage]            = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const store = useStore();

  /* Helper: navigate to detail page */
  const goToDetail = (product) => {
    setSelectedProduct(product);
    setPage("detail");
  };

  /* Shared props passed to every page */
  const nav    = { setPage };
  const cartP  = {
    cart:         store.cart,
    cartSubtotal: store.cartSubtotal,
    shippingCost: store.shippingCost,
    cartTotal:    store.cartTotal,
    FREE_SHIPPING: store.FREE_SHIPPING,
  };

  return (
    <div
      style={{
        fontFamily: "'Lora', Georgia, serif",
        minHeight:  "100vh",
        display:    "flex",
        flexDirection: "column",
        background: "#F5F0EB",
      }}
    >
      {/* ── Nav ── */}
      <Navbar
        page={page}
        setPage={setPage}
        cartCount={store.cartCount}
        currentUser={store.currentUser}
        logout={store.logout}
      />

      {/* ── Pages ── */}
      <main style={{ flex: 1 }}>
        {page === "home" && (
          <HomePage
            setPage={setPage}
            products={store.products}
            addToCart={store.addToCart}
            setSelectedProduct={setSelectedProduct}
            goToDetail={goToDetail}
          />
        )}

        {page === "products" && (
          <ProductsPage
            products={store.products}
            addToCart={store.addToCart}
            setSelectedProduct={setSelectedProduct}
            setPage={setPage}
            goToDetail={goToDetail}
          />
        )}

        {page === "detail" && (
          <ProductDetailPage
            product={selectedProduct}
            addToCart={store.addToCart}
            setPage={setPage}
          />
        )}

        {page === "cart" && (
          <CartPage
            {...cartP}
            removeFromCart={store.removeFromCart}
            updateQty={store.updateQty}
            setPage={setPage}
            currentUser={store.currentUser}
          />
        )}

        {page === "checkout" && (
          <CheckoutPage
            {...cartP}
            placeOrder={store.placeOrder}
            setPage={setPage}
          />
        )}

        {page === "orders" && (
          <OrdersPage
            userOrders={store.userOrders}
            currentUser={store.currentUser}
            setPage={setPage}
          />
        )}

        {page === "auth" && (
          <AuthPage
            register={store.register}
            login={store.login}
            setPage={setPage}
          />
        )}
      </main>

      {/* ── Footer ── */}
      <Footer setPage={setPage} />
    </div>
  );
}
