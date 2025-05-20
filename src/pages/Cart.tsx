
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, CreditCard, ShoppingCart } from "lucide-react";

export default function Cart() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Render cart contents using CartContents component which uses the useCart hook
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartContents isCheckingOut={isCheckingOut} setIsCheckingOut={setIsCheckingOut} />
    </div>
  );
}

// Separate component that uses the useCart hook, safely inside the CartProvider
function CartContents({ isCheckingOut, setIsCheckingOut }: { 
  isCheckingOut: boolean; 
  setIsCheckingOut: React.Dispatch<React.SetStateAction<boolean>> 
}) {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      // In a real app, would redirect to a checkout success page
      alert("Your order has been placed successfully!");
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-gray-500">Looks like you haven't added any cakes to your cart yet.</p>
          <Button asChild className="mt-4">
            <Link to="/cakes">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-center p-4 hidden md:table-cell">Price</th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-right p-4">Total</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.cake.id} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded overflow-hidden mr-4 hidden md:block">
                            <img src={item.cake.image} alt={item.cake.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <Link to={`/cake/${item.cake.id}`} className="font-medium hover:text-primary">
                              {item.cake.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center hidden md:table-cell">
                        ${item.cake.price.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => updateQuantity(item.cake.id, item.quantity - 1)}
                            disabled={item.quantity === 1}
                            className="h-8 w-8"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          
                          <span className="w-12 text-center">{item.quantity}</span>
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => updateQuantity(item.cake.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-4 text-right font-medium">
                        ${(item.cake.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.cake.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/cakes">Continue Shopping</Link>
              </Button>
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="border rounded-lg p-6 bg-muted/30">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" /> Checkout
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
