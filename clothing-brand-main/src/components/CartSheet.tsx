import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2, X } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CartSheetProps {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartSheet = ({
  cartItems,
  cartCount,
  cartTotal,
  updateQuantity,
  removeFromCart,
  clearCart,
}: CartSheetProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center gap-2 text-foreground/70 hover:text-gold transition-colors">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-obsidian text-xs w-5 h-5 rounded-full flex items-center justify-center font-display">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background border-border">
        <SheetHeader className="border-b border-border/30 pb-4">
          <SheetTitle className="font-display text-2xl text-foreground flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-gold" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-180px)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="font-display text-lg text-muted-foreground">Your cart is empty</p>
              <p className="font-body text-sm text-muted-foreground/60 mt-2">
                Add some beautiful silk sarees to get started
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-auto py-4 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-card rounded-lg border border-border/30"
                  >
                    {/* Image */}
                    <div className="w-20 h-24 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.image_url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=250&fit=crop"}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm text-foreground truncate">
                        {item.product?.name}
                      </h4>
                      {item.selected_size && (
                        <p className="font-body text-xs text-muted-foreground mt-1">
                          Size: {item.selected_size}
                        </p>
                      )}
                      <p className="font-display text-sm gradient-text mt-2">
                        {formatPrice(item.product?.price || 0)}
                      </p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded border border-border/50 flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-display text-sm w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded border border-border/50 flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-border/30 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-muted-foreground">Subtotal</span>
                  <span className="font-display text-xl gradient-text">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <Button variant="shimmer" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-center font-body text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
