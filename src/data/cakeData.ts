
export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients: string[];
  featured: boolean;
}

export const cakes: Cake[] = [
  {
    id: "1",
    name: "Chocolate Delight",
    description: "A rich, moist chocolate cake with chocolate ganache and chocolate shavings.",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop",
    category: "Chocolate",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter"],
    featured: true
  },
  {
    id: "2",
    name: "Strawberry Bliss",
    description: "Light vanilla sponge cake with fresh strawberries and cream.",
    price: 32.99,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop",
    category: "Fruit",
    ingredients: ["Strawberries", "Flour", "Sugar", "Eggs", "Cream"],
    featured: true
  },
  {
    id: "3",
    name: "Red Velvet",
    description: "Classic red velvet cake with cream cheese frosting.",
    price: 38.99,
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=2013&auto=format&fit=crop",
    category: "Classic",
    ingredients: ["Cocoa", "Flour", "Sugar", "Buttermilk", "Cream Cheese"],
    featured: false
  },
  {
    id: "4",
    name: "Lemon Drizzle",
    description: "Zesty lemon cake with lemon glaze and candied lemon peel.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=2071&auto=format&fit=crop",
    category: "Citrus",
    ingredients: ["Lemon", "Flour", "Sugar", "Eggs", "Butter"],
    featured: false
  },
  {
    id: "5",
    name: "Vanilla Bean",
    description: "Simple yet elegant vanilla cake with vanilla bean frosting.",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?q=80&w=1974&auto=format&fit=crop",
    category: "Classic",
    ingredients: ["Vanilla", "Flour", "Sugar", "Eggs", "Butter"],
    featured: true
  },
  {
    id: "6",
    name: "Carrot Cake",
    description: "Moist carrot cake with walnuts and cream cheese frosting.",
    price: 33.99,
    image: "https://images.unsplash.com/photo-1590031905406-f18a426d772d?q=80&w=2029&auto=format&fit=crop",
    category: "Vegetable",
    ingredients: ["Carrots", "Flour", "Sugar", "Eggs", "Walnuts"],
    featured: false
  }
];
