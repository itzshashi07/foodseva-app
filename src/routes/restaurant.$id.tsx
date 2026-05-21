import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star, Clock, Plus, Minus, ShoppingBag } from "lucide-react";
import { getRestaurantById, type Restaurant } from "@/lib/foodseva-data";
import { useCart } from "@/lib/cart-store";
import { Header } from "@/components/foodseva/Header";
import { Footer } from "@/components/foodseva/Footer";

export const Route = createFileRoute("/restaurant/$id")({
  head: ({ params }) => {
    const r = getRestaurantById(params.id);
    const title = r ? `${r.name} — FoodSeva` : "Restaurant — FoodSeva";
    const desc = r ? `${r.cuisine}. ${r.tagline}. Order now on FoodSeva.` : "Order food on FoodSeva";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(r ? [{ property: "og:image", content: r.image }] : []),
      ],
    };
  },
  loader: ({ params }): Restaurant => {
    const r = getRestaurantById(params.id);
    if (!r) throw notFound();
    return r;
  },
  component: RestaurantPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Restaurant not found</h1>
        <Link to="/" className="text-primary underline mt-2 inline-block">Go home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center">
      <div>Error: {error.message}</div>
    </div>
  ),
});

function RestaurantPage() {
  const r = Route.useLoaderData() as Restaurant;
  const { items, add, setQty, count, total } = useCart();

  const qtyOf = (id: string) => items.find((i) => i.id === id)?.qty || 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-warm)" }}>
      <Header />

      {/* Hero banner */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <Link to="/" className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/95 backdrop-blur flex items-center justify-center hover:scale-105 transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="absolute bottom-5 left-5 right-5 text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{r.name}</h1>
          <p className="text-sm opacity-95 mt-0.5">{r.cuisine}</p>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success text-success-foreground font-semibold">
              <Star className="w-3 h-3 fill-current" /> {r.rating}
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {r.deliveryTime}</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <section className="max-w-3xl mx-auto px-4 w-full py-6 pb-32">
        <h2 className="text-xl font-bold mb-1">Menu</h2>
        <p className="text-xs text-muted-foreground mb-5">{r.menu.length} items available</p>

        <div className="space-y-3">
          {r.menu.map((m, i) => {
            const q = qtyOf(m.id);
            return (
              <div key={m.id}
                   className="flex gap-4 p-3 rounded-3xl bg-card border border-border/60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] transition-all animate-slide-up"
                   style={{ animationDelay: `${i * 40}ms` }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${m.veg ? "border-success" : "border-destructive"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.veg ? "bg-success" : "bg-destructive"}`} />
                    </span>
                    <h3 className="font-bold text-base leading-tight">{m.name}</h3>
                  </div>
                  <div className="text-lg font-extrabold text-foreground">₹{m.price}</div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.desc}</p>
                </div>
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                  <img src={m.image} alt={m.name} loading="lazy"
                       className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    {q === 0 ? (
                      <button
                        onClick={() => add(m, r.id, r.name)}
                        className="px-4 py-1.5 rounded-full bg-background border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition shadow-[var(--shadow-soft)]"
                      >
                        ADD +
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-1 shadow-[var(--shadow-soft)] animate-pop">
                        <button onClick={() => setQty(m.id, q - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-primary-foreground/20 rounded-full">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm w-5 text-center">{q}</span>
                        <button onClick={() => setQty(m.id, q + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-primary-foreground/20 rounded-full">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating cart bar */}
      {count > 0 && (
        <Link to="/cart"
              className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-30 flex items-center justify-between px-5 py-4 rounded-2xl text-primary-foreground font-semibold shadow-[var(--shadow-elevated)] animate-slide-up"
              style={{ background: "var(--gradient-hero)" }}>
          <div className="text-sm">
            <div className="font-bold">{count} item{count > 1 ? "s" : ""} • ₹{total}</div>
            <div className="text-xs opacity-90">Plus delivery charges</div>
          </div>
          <div className="flex items-center gap-1.5 font-bold">
            View Cart <ShoppingBag className="w-4 h-4" />
          </div>
        </Link>
      )}

      <Footer />
    </div>
  );
}
