import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Header } from "@/components/foodseva/Header";
import { Footer } from "@/components/foodseva/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — FoodSeva" },
      { name: "description", content: "Terms of use, disclaimers, and platform policy for FoodSeva rural food delivery." },
      { property: "og:title", content: "Terms & Conditions — FoodSeva" },
      { property: "og:description", content: "FoodSeva platform terms, disclaimers, and policies." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    h: "1. Platform ki Bhumika",
    p: "FoodSeva sirf ek digital facilitator hai jo customer aur local restaurants ko jod-ta hai. Hum khud food prepare ya deliver nahi karte.",
  },
  {
    h: "2. Food Quality",
    p: "Food ki quality, taste, hygiene aur preparation ki poori zimmedari restaurant ki hai. FoodSeva is par koi guarantee nahi deta.",
  },
  {
    h: "3. Customer ki Zimmedari",
    p: "Customer ko sahi address, mobile number aur details deni hogi. Fake orders place karne par mobile number permanently block kiya jaayega.",
  },
  {
    h: "4. Delivery & Charges",
    p: "Delivery charges distance ke hisaab se calculate hote hain. ₹300 ya zyada ka order 3 km tak free deliver hota hai. Order confirm karne ke liye delivery charges advance dene padenge.",
  },
  {
    h: "5. Delays & Cancellations",
    p: "Mausam, traffic, ya restaurant ki capacity ke karan delivery time vary kar sakta hai. FoodSeva delays ke liye liable nahi hai.",
  },
  {
    h: "6. Liability Disclaimer",
    p: "Food consumption ke baad agar koi issue hota hai (allergy, illness, etc.), to uski poori zimmedari restaurant aur customer ki hai. FoodSeva ki koi liability nahi hai.",
  },
  {
    h: "7. Payments",
    p: "Payment delivery ke time directly restaurant/delivery partner ko ki jaati hai. FoodSeva koi payment process nahi karta.",
  },
  {
    h: "8. Changes to Terms",
    p: "FoodSeva apni terms kabhi bhi update kar sakta hai. Updated terms website pe publish hone ke baad lagu honge.",
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-warm)" }}>
      <Header />
      <main className="max-w-3xl mx-auto px-4 w-full py-8 flex-1">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
            <ShieldAlert className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-extrabold">Terms & Conditions</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-IN")}</p>

        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.h} className="p-5 rounded-2xl bg-card border border-border shadow-[var(--shadow-soft)]">
              <h2 className="font-bold mb-1.5">{s.h}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-accent text-accent-foreground text-sm">
          Kisi bhi question ke liye WhatsApp karein: <a className="font-bold underline" href="https://wa.me/918078633912">+91 80786 33912</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
