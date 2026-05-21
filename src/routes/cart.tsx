import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CheckCircle2, MessageCircle, X } from "lucide-react";
import { useCart, useLocation, calcDelivery } from "@/lib/cart-store";
import { Header } from "@/components/foodseva/Header";
import { Footer } from "@/components/foodseva/Footer";

const ADMIN_PHONE = "918078633912";
const RESTAURANT_PHONE = "919829982153";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — FoodSeva" },
      { name: "description", content: "Review your order and checkout via WhatsApp on FoodSeva." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, clear, total } = useCart();
  const [loc] = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [distance, setDistance] = useState<number>(2);
  const [showTerms, setShowTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sentAdmin, setSentAdmin] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("fs_name") || "");
    setMobile(localStorage.getItem("fs_mobile") || "");
  }, []);

  const delivery = calcDelivery(total, distance);
  const final = total + delivery;

  function buildMessage() {
    const lines: string[] = [];
    lines.push("*New Food Order* 🍔");
    lines.push("");
    lines.push(`*Name:* ${name}`);
    lines.push(`*Mobile:* ${mobile}`);
    lines.push(`*Location:* ${loc || "—"}`);
    lines.push("");
    lines.push("*Items:*");
    items.forEach((i) => {
      lines.push(`• ${i.name} x ${i.qty} = ₹${i.price * i.qty}`);
    });
    lines.push("");
    lines.push(`*Food Total:* ₹${total}`);
    lines.push(`*Distance:* ${distance} km`);
    lines.push(`*Delivery Charge:* ₹${delivery}`);
    lines.push(`*Total Payable:* ₹${final}`);
    lines.push("");
    lines.push("_Sent via FoodSeva_");
    return lines.join("\n");
  }

  function validate(): string | null {
    if (items.length === 0) return "Cart khali hai";
    if (!loc) return "Pehle location select karein";
    if (!name.trim()) return "Apna naam likhein";
    if (!/^[6-9]\d{9}$/.test(mobile.trim())) return "Sahi 10-digit mobile number likhein";
    if (distance <= 0) return "Distance enter karein";
    return null;
  }

  function handlePlace() {
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    localStorage.setItem("fs_name", name);
    localStorage.setItem("fs_mobile", mobile);
    setShowTerms(true);
  }

  function confirmAndOpenAdmin() {
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${msg}`, "_blank");
    setSentAdmin(true);
  }

  function openRestaurant() {
    const msg = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${RESTAURANT_PHONE}?text=${msg}`, "_blank");
    setShowTerms(false);
    setShowSuccess(true);
  }

  function finishSuccess() {
    setShowSuccess(false);
    setSentAdmin(false);
    clear();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-warm)" }}>
      <Header />

      <main className="max-w-3xl mx-auto px-4 w-full py-6 flex-1">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Continue shopping
        </Link>
        <h1 className="text-3xl font-extrabold mb-1">Your Cart</h1>
        <p className="text-sm text-muted-foreground mb-6">{items.length} item{items.length !== 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-border">
            <ShoppingBag className="w-14 h-14 mx-auto text-muted-foreground/40 mb-3" />
            <p className="font-semibold">Cart abhi khali hai</p>
            <Link to="/" className="inline-block mt-4 px-5 py-2.5 rounded-full text-primary-foreground font-semibold" style={{ background: "var(--gradient-hero)" }}>
              Browse restaurants
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {items.map((i) => (
                <div key={i.id} className="flex gap-3 p-3 rounded-2xl bg-card border border-border shadow-[var(--shadow-soft)]">
                  <img src={i.image} alt={i.name} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold leading-tight truncate">{i.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{i.restaurantName}</p>
                      </div>
                      <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-background">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-sm w-6 text-center">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-background">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="font-extrabold">₹{i.price * i.qty}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="bg-card rounded-3xl border border-border p-5 shadow-[var(--shadow-soft)] mb-5">
              <h2 className="font-bold text-lg mb-4">Delivery details</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Your name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ramesh Kumar"
                         className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Mobile (WhatsApp)</label>
                  <input value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                         placeholder="9876543210" inputMode="numeric"
                         className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Location</label>
                  <input value={loc || ""} readOnly
                         className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-secondary text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Distance (km)</label>
                  <input type="number" min={0.5} step={0.5} value={distance}
                         onChange={(e) => setDistance(Number(e.target.value) || 0)}
                         className="w-full mt-1 px-4 py-3 rounded-xl border border-input bg-background outline-none focus:ring-2 focus:ring-ring text-sm" />
                </div>
              </div>
            </div>

            {/* Bill */}
            <div className="bg-card rounded-3xl border border-border p-5 shadow-[var(--shadow-soft)] mb-5">
              <h2 className="font-bold text-lg mb-3">Bill summary</h2>
              <div className="space-y-2 text-sm">
                <Row label="Food total" value={`₹${total}`} />
                <Row label={`Delivery (${distance} km)`} value={delivery === 0 ? <span className="text-success font-semibold">FREE</span> : `₹${delivery}`} />
                {total < 300 && (
                  <div className="text-xs bg-accent text-accent-foreground rounded-lg p-2 mt-2">
                    💡 Add ₹{300 - total} more for FREE delivery (within 3 km)
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-extrabold text-lg">
                  <span>Total payable</span><span>₹{final}</span>
                </div>
              </div>
            </div>

            <button onClick={handlePlace}
                    className="w-full py-4 rounded-2xl text-primary-foreground font-bold text-lg shadow-[var(--shadow-elevated)] hover:scale-[1.01] active:scale-100 transition"
                    style={{ background: "var(--gradient-hero)" }}>
              Place Order on WhatsApp 🍽️
            </button>
            <p className="text-[11px] text-center text-muted-foreground mt-2">
              By placing order, you agree to our <Link to="/terms" className="underline">Terms</Link>
            </p>
          </>
        )}
      </main>

      <Footer />

      {/* TERMS MODAL */}
      {showTerms && (
        <Modal onClose={() => setShowTerms(false)}>
          <h2 className="text-xl font-extrabold mb-1">Before you order</h2>
          <p className="text-xs text-muted-foreground mb-4">Please read & agree to continue</p>
          <ul className="space-y-2.5 text-sm mb-5">
            {[
              "❌ Fake orders se aapka number block ho jaayega",
              "🚚 Delivery charges aapki distance ke hisaab se apply honge",
              "💵 Order confirm karne ke liye delivery charges advance dena hoga",
              "🤝 FoodSeva sirf ek facilitator hai — restaurant aur customer ke beech",
            ].map((t) => (
              <li key={t} className="flex gap-2 items-start">
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {!sentAdmin ? (
            <button onClick={confirmAndOpenAdmin}
                    className="w-full py-3.5 rounded-2xl text-primary-foreground font-bold shadow-[var(--shadow-soft)]"
                    style={{ background: "var(--gradient-hero)" }}>
              ✔ I Agree — Send to Admin
            </button>
          ) : (
            <div className="space-y-3">
              <div className="text-center text-xs bg-success/10 text-success-foreground border border-success/30 rounded-xl p-3">
                ✅ Admin ko message bhej diya gaya. Ab restaurant ko bhi bhejein.
              </div>
              <button onClick={openRestaurant}
                      className="w-full py-3.5 rounded-2xl bg-success text-success-foreground font-bold flex items-center justify-center gap-2 shadow-[var(--shadow-soft)]">
                <MessageCircle className="w-5 h-5" /> Send to Restaurant
              </button>
            </div>
          )}
        </Modal>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <Modal onClose={finishSuccess}>
          <div className="text-center py-2">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/15 flex items-center justify-center mb-4 animate-bounce-in">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h2 className="text-2xl font-extrabold mb-2">Order Placed Successfully!</h2>
            <p className="text-sm text-muted-foreground mb-1">Aapka order receive ho gaya hai.</p>
            <p className="text-sm text-muted-foreground mb-6">
              Confirmation 5 minutes mein aapke WhatsApp pe milega.
            </p>
            <button onClick={finishSuccess}
                    className="w-full py-3.5 rounded-2xl text-primary-foreground font-bold shadow-[var(--shadow-soft)]"
                    style={{ background: "var(--gradient-hero)" }}>
              Back to Home
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between text-foreground/80">
      <span>{label}</span><span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in"
         onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
           className="bg-card w-full max-w-md rounded-3xl p-6 shadow-[var(--shadow-elevated)] relative animate-slide-up">
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center">
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
