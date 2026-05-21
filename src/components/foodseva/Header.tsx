import { Link } from "@tanstack/react-router";
import { ShoppingBag, MapPin, UtensilsCrossed } from "lucide-react";
import { useCart, useLocation } from "@/lib/cart-store";

export function Header() {
  const { count } = useCart();
  const [loc] = useLocation();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-[var(--shadow-soft)] group-hover:scale-105 transition-transform"
               style={{ background: "var(--gradient-hero)" }}>
            <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg tracking-tight">FoodSeva</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">Gaon ka apna swad</div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {loc && (
            <Link to="/" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-accent text-accent-foreground text-sm hover:bg-accent/80 transition">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">{loc}</span>
            </Link>
          )}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 px-4 py-2 rounded-full text-primary-foreground font-semibold text-sm shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all"
            style={{ background: "var(--gradient-hero)" }}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] rounded-full bg-foreground text-background text-[11px] font-bold flex items-center justify-center px-1 animate-bounce-in">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
