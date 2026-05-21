import { Link } from "@tanstack/react-router";
import { Star, Clock } from "lucide-react";
import type { Restaurant } from "@/lib/foodseva-data";

export function RestaurantCard({ r, i = 0 }: { r: Restaurant; i?: number }) {
  return (
    <Link
      to="/restaurant/$id"
      params={{ id: r.id }}
      className="group block rounded-3xl overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${i * 60}ms` }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={r.image} alt={r.name} loading="lazy"
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/95 backdrop-blur text-xs font-semibold flex items-center gap-1">
          <Star className="w-3 h-3 fill-saffron text-saffron" style={{ fill: "var(--saffron)", color: "var(--saffron)" }} />
          {r.rating}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
          <h3 className="text-xl font-bold leading-tight drop-shadow">{r.name}</h3>
          <p className="text-xs opacity-90">{r.cuisine}</p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground italic line-clamp-1">"{r.tagline}"</p>
        <div className="flex items-center gap-1 text-xs font-medium text-foreground/70 whitespace-nowrap ml-2">
          <Clock className="w-3 h-3" /> {r.deliveryTime}
        </div>
      </div>
    </Link>
  );
}
