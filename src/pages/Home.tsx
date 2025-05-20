
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { CakeCard } from "@/components/CakeCard";
import { cakes } from "@/data/cakeData";
import { Cake } from "lucide-react";
import { CartProvider } from "@/contexts/CartContext";

export default function Home() {
  const featuredCakes = cakes.filter(cake => cake.featured);
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Delicious Handcrafted Cakes</h1>
              <p className="text-lg mb-6">
                Treat yourself with our premium selection of freshly baked cakes for any occasion.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link to="/cakes">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1557925923-cd4648e211a0?q=80&w=1969&auto=format&fit=crop" 
                alt="Delicious cake" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Cakes</h2>
              <Button variant="outline" asChild>
                <Link to="/cakes">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredCakes.map(cake => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary/10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Cake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
                <p className="text-gray-600">We use only the freshest, highest quality ingredients in all our cakes.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary/10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Cake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Handcrafted</h3>
                <p className="text-gray-600">Each cake is carefully handcrafted by our experienced pastry chefs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary/10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Cake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">We ensure timely delivery to make your special occasions even better.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Sweet Delights</h3>
                <p>Handcrafting delicious cakes for all your special moments.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-primary">Home</Link></li>
                  <li><Link to="/cakes" className="hover:text-primary">Shop</Link></li>
                  <li><Link to="/cart" className="hover:text-primary">Cart</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <p>Email: info@sweetdelights.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Address: 123 Baker Street, Cake City</p>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p>&copy; {new Date().getFullYear()} Sweet Delights. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
