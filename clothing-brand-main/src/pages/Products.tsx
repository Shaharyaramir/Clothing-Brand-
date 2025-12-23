import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import ProductCard from "@/components/ProductCard";
import CartSheet from "@/components/CartSheet";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  sizes: string[] | null;
  colors: string[] | null;
  in_stock: boolean;
  featured: boolean;
}

const categories = [
  { value: "all", label: "All Sarees" },
  { value: "bridal", label: "Bridal" },
  { value: "festive", label: "Festive" },
  { value: "everyday", label: "Everyday" },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isLoading: cartLoading,
  } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let query = supabase.from("products").select("*").order("created_at", { ascending: false });

        if (selectedCategory !== "all") {
          query = query.eq("category", selectedCategory);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
  ];

  return (
    <>
      <Helmet>
        <title>Silk Sarees Collection | Maan Silk Center</title>
        <meta
          name="description"
          content="Explore our exquisite collection of silk sarees including Kanjivaram, Banarasi, Mysore, and more. Premium quality silk with traditional craftsmanship."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="Maan Silk Center" className="h-14 w-auto" />
              </Link>

              <div className="hidden md:flex items-center gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="font-display text-sm tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <CartSheet
                  cartItems={cartItems}
                  cartCount={cartCount}
                  cartTotal={cartTotal}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-foreground hover:text-gold transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/20">
                <div className="flex flex-col py-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-display text-sm tracking-widest uppercase text-foreground/70 hover:text-gold transition-colors duration-300 py-4 px-6"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6 bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Our <span className="gradient-text">Collection</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the timeless elegance of handcrafted silk sarees, each piece a masterpiece of traditional artistry
            </p>
            <div className="mt-6 mx-auto w-16 h-px bg-gold" />
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-6 border-b border-border/30">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`font-display text-sm tracking-widest uppercase px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedCategory === category.value
                      ? "bg-gold text-obsidian border-gold"
                      : "bg-transparent text-foreground/70 border-border/50 hover:border-gold hover:text-gold"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-muted rounded-lg" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded w-1/4" />
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-8 bg-muted rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-display text-2xl text-muted-foreground">
                  No products found in this category
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    isLoading={cartLoading}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border/30">
          <div className="container mx-auto text-center">
            <p className="font-body text-sm text-muted-foreground">
              © 2024 Maan Silk Center. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Products;
