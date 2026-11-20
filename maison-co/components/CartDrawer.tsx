"use client";

import { useEffect } from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function CartDrawer() {
  const { items, total, count, isOpen, close, remove, setQty, clear } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const checkout = () => {
    alert("Дякуємо за замовлення! (тут буде оформлення)");
    clear();
    close();
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "show" : ""}`} onClick={close} />

      <aside className={`cart-drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
        <div className="cart-head">
          <h3>Cart ({count})</h3>
          <button onClick={close} aria-label="Close cart"><X size={18} /></button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <strong>{item.brand}</strong>
                    <span>{item.name}</span>
                    <small>{formatPrice(item.price)}</small>

                    <div className="qty">
                      <button onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease">
                        <Minus size={12} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button className="cart-remove" onClick={() => remove(item.id)} aria-label="Remove">
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-foot">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="btn-dark big" onClick={checkout}>Checkout</button>
              <button className="cart-clear" onClick={clear}>Clear cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}