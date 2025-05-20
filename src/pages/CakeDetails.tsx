
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { cakes } from "@/data/cakeData";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import { CartProvider } from "@/contexts/CartContext";
import { CakeCard } from "@/components/CakeCard";

export default function CakeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const cake = cakes.find(cake => cake.id === id);
  
  // Find related cakes in the same category
  const relatedCakes = cakes
    .filter(c => c.category === cake?.category && c.id !== id)
    .slice(0, 3);
  
  const { addToCart } = useCart();
  
  if (!cake) {
    return (
      <CartProvider>
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Cake Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the cake you're looking for.</p>
          <Button onClick={() => navigate("/cakes")}>Return to Shop</Button>
        </div>
      </CartProvider>
    );
  }
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  
  const handleAddToCart = () => {
    addToCart(cake, quantity);
  };
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="lg:w-1/2">
              <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={cake.image} 
                  alt={cake.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-3xl font-bold">{cake.name}</h1>
              <p className="text-xl font-bold text-primary">${cake.price.toFixed(2)}</p>
              
              <div className="border-t border-b py-4">
                <p className="text-gray-700">{cake.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {cake.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-12 text-center">{quantity}</span>
                  
                  <Button variant="outline" size="icon" onClick={increaseQuantity}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              
              <div className="pt-4">
                <h3 className="font-semibold">Category: {cake.category}</h3>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedCakes.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">You may also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCakes.map(relatedCake => (
                  <CakeCard key={relatedCake.id} cake={relatedCake} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CartProvider>
  );
}
