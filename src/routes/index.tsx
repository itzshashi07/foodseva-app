import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Sparkles, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { LOCATIONS, getRestaurantsByLocation, type Location } from "@/lib/foodseva-data";
import { useLocation } from "@/lib/cart-store";
import { Header } from "@/components/foodseva/Header";
import { Footer } from "@/components/foodseva/Footer";
import { RestaurantCard } from "@/components/foodseva/RestaurantCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodSeva — Gaon ka apna food delivery" },
      { name: "description", content: "Rural food delivery via WhatsApp. Order from local restaurants in Dangwar, Japla, Koiridih, Nabinagar & Nawadih." },
      { property: "og:title", content: "FoodSeva — Gaon ka apna food delivery" },
      { property: "og:description", content: "Order tasty food from your village restaurants. Simple, fast, WhatsApp se." },
    ],
  }),
  component: Home,
});

function Home() {
  const [loc, setLoc] = useLocation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const restaurants = mounted && loc ? getRestaurantsByLocation(loc as Location) : [];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-warm)" }}>
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
             style={{ background: "radial-gradient(circle at 20% 20%, var(--saffron), transparent 50%), radial-gradient(circle at 80% 60%, var(--primary), transparent 50%)" }} />
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-12 sm:pt-16 sm:pb-20 relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3 text-primary" />
              Bihar ka pehla rural food delivery app
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Garam khana,
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
                seedha aapke ghar
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Apne gaon ke best restaurants se order karein. WhatsApp pe confirm hoga,
              <br className="hidden sm:block" /> garam-garam delivery milegi. Bas 3 tap mein!
            </p>
          </div>

          {/* Location selector */}
          <div className="mt-10 max-w-3xl mx-auto bg-card border border-border rounded-3xl p-5 sm:p-7 shadow-[var(--shadow-elevated)] animate-slide-up">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg">Apna gaon chunein</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {LOCATIONS.map((l) => {
                const active = loc === l;
                return (
                  <button
                    key={l}
                    onClick={() => setLoc(l)}
                    className={`px-3 py-3 rounded-2xl font-semibold text-sm transition-all ${
                      active
                        ? "text-primary-foreground shadow-[var(--shadow-soft)] scale-[1.02]"
                        : "bg-secondary hover:bg-accent text-foreground"
                    }`}
                    style={active ? { background: "var(--gradient-hero)" } : {}}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
            {loc && (
              <p className="mt-4 text-xs text-muted-foreground text-center">
                Showing restaurants delivering to <span className="font-semibold text-foreground">{loc}</span>
              </p>
            )}
          </div>

          {/* Trust pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
            {[
              { icon: Truck, t: "Free delivery ₹300+" },
              { icon: ShieldCheck, t: "Trusted local kitchens" },
              { icon: MessageCircle, t: "WhatsApp confirmation" },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
                <Icon className="w-3.5 h-3.5 text-primary" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="max-w-6xl mx-auto px-4 w-full pb-10">
        {!mounted ? null : !loc ? (
          <div className="text-center py-20 text-muted-foreground">
            👆 Pehle apna gaon select karein
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-3">😔</div>
            <p className="font-semibold">Abhi {loc} mein koi restaurant available nahi hai</p>
            <p className="text-sm text-muted-foreground mt-1">Hum jaldi launch kar rahe hain!</p>
          </div>
        ) : (
          <>
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Restaurants in {loc}</h2>
                <p className="text-sm text-muted-foreground">{restaurants.length} kitchens delivering near you</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {restaurants.map((r, i) => (
                <RestaurantCard key={r.id} r={r} i={i} />
              ))}
            </div>
          </>
        )}
      </section>

      <div className="flex-1" />
      <Footer />
    </div>
  );
}
