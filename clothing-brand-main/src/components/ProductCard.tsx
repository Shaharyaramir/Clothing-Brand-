import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

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
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, size: string) => void;
  isLoading?: boolean;
}

const ProductCard = ({ product, onAddToCart, isLoading }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "Free Size");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border/30 hover:border-gold/50 transition-all duration-300">
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="font-display text-lg text-muted-foreground">Out of Stock</span>
          </div>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <p className="font-display text-xs text-gold uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground">Colors:</span>
            <div className="flex gap-1">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="font-body text-xs text-foreground/80"
                >
                  {color}
                </span>
              )).reduce((prev, curr, i) => (
                <>{prev}{i > 0 && ", "}{curr}</>
              ) as any, null)}
            </div>
          </div>
        )}

        {/* Size selector */}
        {product.sizes && product.sizes.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground">Size:</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-secondary text-foreground text-xs rounded px-2 py-1 border border-border focus:border-gold focus:outline-none"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="font-display text-xl gradient-text">
            {formatPrice(product.price)}
          </span>
          <Button
            variant="gold"
            size="sm"
            onClick={() => onAddToCart(product.id, selectedSize)}
            disabled={!product.in_stock || isLoading}
            className="gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
