
import { CartProvider } from "@/contexts/CartContext";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
}
