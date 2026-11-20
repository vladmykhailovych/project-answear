import Link from "next/link";
import { AtSign, ThumbsUp, Pin, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo dark">Maison&amp;Co</div>
          <p className="tagline">Timeless elegance,<br />crafted for modern life.</p>
        </div>

        <div>
          <h4>Shop</h4>
          {["Women", "Men", "Kids", "Shoes", "Accessories"].map((i) => (
            <Link key={i} href={`/${i.toLowerCase()}`}>{i}</Link>
          ))}
        </div>

        <div>
          <h4>About &amp; Help</h4>
          {["About Us", "Reviews", "FAQ", "Contacts"].map((i) => (
            <Link key={i} href="#">{i}</Link>
          ))}
        </div>

        <div>
          <h4>Follow</h4>
          <Link href="#"><AtSign size={13} /> Instagram</Link>
          <Link href="#"><ThumbsUp size={13} /> Facebook</Link>
          <Link href="#"><Pin size={13} /> Pinterest</Link>
          <Link href="#"><Play size={13} /> YouTube</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Maison&amp;Co</span>
        <span>Privacy · Terms · Shipping</span>
      </div>
    </footer>
  );
}