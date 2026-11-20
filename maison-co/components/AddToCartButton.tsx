"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <button
      className="btn-cart"
      aria-label={`Add ${product.name} to cart`}
      onClick={() => add(product)}
    >
      <ShoppingBag size={14} />
    </button>
  );
}