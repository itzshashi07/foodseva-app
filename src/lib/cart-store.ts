import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import type { MenuItem } from "./foodseva-data";

export interface CartItem extends MenuItem {
  qty: number;
  restaurantId: string;
  restaurantName: string;
}

const KEY = "foodseva_cart_v1";
const LOC_KEY = "foodseva_location_v1";

type Listener = () => void;
const listeners = new Set<Listener>();

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

export function useCart() {
  const items = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => {
      // stable snapshot via JSON string keyed cache
      return readCached();
    },
    () => [] as CartItem[],
  );

  const add = useCallback((item: MenuItem, restaurantId: string, restaurantName: string) => {
    const cur = read();
    const existing = cur.find((i) => i.id === item.id);
    let next: CartItem[];
    if (existing) {
      next = cur.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      next = [...cur, { ...item, qty: 1, restaurantId, restaurantName }];
    }
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) return write(read().filter((i) => i.id !== id));
    write(read().map((i) => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const clear = useCallback(() => write([]), []);

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, add, remove, setQty, clear, total, count };
}

let cache: CartItem[] = [];
let cacheKey = "";
function readCached(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY) || "[]";
  if (raw !== cacheKey) {
    cacheKey = raw;
    try {
      cache = JSON.parse(raw);
    } catch {
      cache = [];
    }
  }
  return cache;
}

// Listen to cross-tab changes
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) listeners.forEach((l) => l());
  });
}

export function useLocation() {
  const [loc, setLocState] = useState<string | null>(null);
  useEffect(() => {
    setLocState(localStorage.getItem(LOC_KEY));
  }, []);
  const setLoc = (l: string) => {
    localStorage.setItem(LOC_KEY, l);
    setLocState(l);
  };
  return [loc, setLoc] as const;
}

export function calcDelivery(total: number, km: number): number {
  if (total >= 300 && km <= 3) return 0;
  if (km <= 0) return 0;
  // ₹15 per km, min ₹30
  return Math.max(30, Math.round(km * 15));
}
