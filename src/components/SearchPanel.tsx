"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ShoppingBag } from "lucide-react";
import { createClient } from "../lib/supabase/client";
import { PRODUCT_COLUMNS, toProduct, type ProductRow } from "../lib/products";
import { formatPrice, type Product } from "../data/products";
import { useCart } from "../context/CartContext";

export default function SearchPanel({ onClose }: { onClose: () => void }) {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reqId = useRef(0);

  // Прибираємо символи, які ламають фільтр PostgREST або працюють як шаблон.
  const term = query
    .replace(/[%_,()"\\*]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const id = ++reqId.current; // відсікає застарілі відповіді

    if (term.length < 2) {
      setResults([]);
      setLoading(false);
      setFailed(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const { data, error } = await createClient()
        .from("products")
        .select(PRODUCT_COLUMNS)
        .eq("is_published", true)
        .or(`brand.ilike.%${term}%,name.ilike.%${term}%`)
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true })
        .limit(8);

      if (id !== reqId.current) return;
      setLoading(false);

      if (error) {
        console.error("[search]", error.message);
        setFailed(true);
        setResults([]);
        return;
      }

      setFailed(false);
      setResults(((data ?? []) as ProductRow[]).map(toProduct));
    }, 250);

    return () => clearTimeout(timer);
  }, [term]);

  const showStatus = term.length >= 2;

  return (
    <div className="search-panel" role="search">
      <div className="container search-inner">
        <div className="search-field">
          <Search size={16} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search by brand or name"
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={onClose} aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        {showStatus && loading && <p className="search-status">Searching…</p>}
        {showStatus && !loading && failed && (
          <p className="search-status">Search is unavailable right now. Try again later.</p>
        )}
        {showStatus && !loading && !failed && results.length === 0 && (
          <p className="search-status">No results for “{query.trim()}”</p>
        )}

        {results.length > 0 && (
          <ul className="search-results">
            {results.map((p) => (
              <li key={p.id} className="search-item">
                <img src={p.image} alt="" />
                <div className="search-item-info">
                  <strong>{p.brand}</strong>
                  <span>{p.name}</span>
                </div>
                <small>{formatPrice(p.price)}</small>
                <button
                  type="button"
                  className="btn-cart"
                  aria-label={`Add ${p.name} to cart`}
                  onClick={() => {
                    add(p);
                    onClose();
                  }}
                >
                  <ShoppingBag size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
