import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./context/cart-context.tsx";
import { AuthProvider } from "./context/auth-context.tsx";
import { ToastProvider } from "./context/toast-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);
