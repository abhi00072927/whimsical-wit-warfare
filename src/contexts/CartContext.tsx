
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Cake } from "../data/cakeData";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  cake: Cake;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (cake: Cake, quantity?: number) => void;
  removeFromCart: (cakeId: string) => void;
  updateQuantity: (cakeId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cakeCart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cakeCart", JSON.stringify(items));
  }, [items]);

  const addToCart = (cake: Cake, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.cake.id === cake.id);
      
      if (existingItem) {
        toast({
          title: "Cake added",
          description: `Added more ${cake.name} to your cart.`,
        });
        
        return prevItems.map(item =>
          item.cake.id === cake.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: "Cake added",
          description: `${cake.name} has been added to your cart.`,
        });
        
        return [...prevItems, { cake, quantity }];
      }
    });
  };

  const removeFromCart = (cakeId: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.cake.id === cakeId);
      if (itemToRemove) {
        toast({
          title: "Cake removed",
          description: `${itemToRemove.cake.name} has been removed from your cart.`,
          variant: "destructive"
        });
      }
      
      return prevItems.filter(item => item.cake.id !== cakeId);
    });
  };

  const updateQuantity = (cakeId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cakeId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map(item =>
        item.cake.id === cakeId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (sum, item) => sum + item.cake.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
