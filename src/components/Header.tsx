"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import SearchPanel from "./SearchPanel";

const nav = ["Women", "Men", "Kids", "Shoes", "Bags"];

export default function Header() {
  const { count, open } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Клік поза хедером закриває пошук.
  useEffect(() => {
    if (!searchOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [searchOpen]);

  return (
    <header className="header" ref={headerRef}>
      <Link href="/" className="logo">Maison&amp;Co</Link>

      <nav className="nav">
        {nav.map((item) => (
          <Link key={item} href={`/${item.toLowerCase()}`}>{item}</Link>
        ))}
      </nav>

      <div className="header-icons">
        <button
          aria-label="Search"
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((v) => !v)}
        >
          <Search size={16} />
        </button>
        <button aria-label="Wishlist"><Heart size={16} /></button>
        <button aria-label="Cart" className="cart-btn" onClick={open}>
          <ShoppingCart size={16} />
          {count > 0 && <span className="badge">{count}</span>}
        </button>
        <button aria-label="Account"><User size={16} /></button>
      </div>

      {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
