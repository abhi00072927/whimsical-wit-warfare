
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CakeCard } from "@/components/CakeCard";
import { cakes } from "@/data/cakeData";
import { CartProvider } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function CakeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = Array.from(new Set(cakes.map(cake => cake.category)));
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const filteredCakes = cakes.filter(cake => {
    const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cake.description.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(cake.category);
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Our Cake Collection</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className="w-full md:w-64 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Search</h2>
                <Input
                  type="text"
                  placeholder="Search cakes..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="flex-1">
              {filteredCakes.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold">No cakes found</h2>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCakes.map(cake => (
                    <CakeCard key={cake.id} cake={cake} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
