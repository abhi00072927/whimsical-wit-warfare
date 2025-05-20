
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake } from "@/data/cakeData";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

interface CakeCardProps {
  cake: Cake;
}

export function CakeCard({ cake }: CakeCardProps) {
  const { addToCart } = useCart();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/cake/${cake.id}`}>
        <div className="aspect-square overflow-hidden">
          <img 
            src={cake.image} 
            alt={cake.name} 
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="line-clamp-1 text-lg">{cake.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="line-clamp-2 text-sm text-gray-500">{cake.description}</p>
          <p className="mt-2 font-bold text-lg text-primary">${cake.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={(e) => {
            e.preventDefault();
            addToCart(cake);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
