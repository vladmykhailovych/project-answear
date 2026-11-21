
"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

const nav = ["Women", "Men", "Kids", "Shoes", "Bags"];

export default function Header() {
  const { count, open } = useCart();

  return (
    <header className="header">
      <Link href="/" className="logo">Maison&amp;Co</Link>

      <nav className="nav">
        {nav.map((item) => (
          <Link key={item} href={`/${item.toLowerCase()}`}>
            {item}
          </Link>
        ))}
      </nav>

      <div className="header-icons">
        <Link href="/search" aria-label="Search">
          <Search size={16} />
        </Link>

        <Link href="/wishlist" aria-label="Wishlist">
          <Heart size={16} />
        </Link>

        <button aria-label="Cart" className="cart-btn" onClick={open}>
          <ShoppingCart size={16} />
          {count > 0 && <span className="badge">{count}</span>}
        </button>

        <Link href="/account" aria-label="Account">
          <User size={16} />
        </Link>
      </div>
    </header>
  );
}
