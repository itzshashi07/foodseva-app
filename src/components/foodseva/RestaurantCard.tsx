import { Link } from "@tanstack/react-router";

import {
  Star,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";

import type { Restaurant } from "@/lib/foodseva-data";

export function RestaurantCard({
  r,
  i = 0,
}: {
  r: Restaurant;
  i?: number;
}) {
  return (
    <Link
      to="/restaurant/$id"
      params={{ id: r.id }}
      className="group block rounded-3xl overflow-hidden bg-card border border-border/60 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 animate-slide-up"
      style={{ animationDelay: `${i * 60}ms` }}
    >

      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">

        <img
          src={r.image}
          alt={r.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* RATING */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/95 backdrop-blur text-xs font-semibold flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          {r.rating}
        </div>

        {/* TITLE */}
        <div className="absolute bottom-3 left-3 right-3 text-white">

          <h3 className="text-xl font-bold leading-tight drop-shadow">
            {r.name}
          </h3>

          <p className="text-xs opacity-90">
            {r.cuisine}
          </p>

        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        {/* TAGLINE */}
        <p className="text-sm text-muted-foreground italic line-clamp-1">
          "{r.tagline}"
        </p>

        {/* DELIVERY + ADDRESS */}
        <div className="flex items-center justify-between text-xs text-foreground/70">

          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {r.deliveryTime}
          </div>

          <div className="flex items-center gap-1 line-clamp-1 max-w-[140px]">
            <MapPin className="w-3 h-3" />
            {r.address}
          </div>

        </div>

        {/* CALL BUTTON */}
        <a
          href={`tel:${r.phone}`}
          onClick={(e) => e.stopPropagation()}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-xl font-medium hover:opacity-90 transition"
        >
          <Phone className="w-4 h-4" />
          Call Restaurant
        </a>

      </div>
    </Link>
  );
}