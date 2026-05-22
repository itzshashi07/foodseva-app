import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-bold text-lg mb-2">FoodSeva 🍴</div>
          <p className="text-muted-foreground">
            Gaon ke logon ke liye ek simple, bharosemand food delivery platform. WhatsApp se order, ghar tak swad.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1 text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-primary">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Support</div>
          <p className="text-muted-foreground">
            WhatsApp:{" "}
            <a href="https://wa.me/918078633912" className="text-primary font-medium">
              +91 80786 33912
            </a>
          </p>
          <p className="text-muted-foreground mt-1">Roz 9 AM – 10 PM</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground py-4 border-t border-border/60">
        © {new Date().getFullYear()} FoodSeva • Made with ❤️ for rural Bharat
      </div>
    </footer>
  );
}
