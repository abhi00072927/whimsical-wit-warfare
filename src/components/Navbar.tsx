
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Cake } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const { totalItems } = useCart();
  
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Cake className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl text-primary">Sweet Delights</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-primary font-medium">
            Home
          </Link>
          <Link to="/cakes" className="text-gray-600 hover:text-primary font-medium">
            Cakes
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-2">Cart</span>
              {totalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </div>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
