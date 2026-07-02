// ─── CONTEXT: KERANJANG BELANJA (CartContext) ────────────────────────────────
// Global state untuk keranjang agar Header (indikator jumlah item), halaman
// Menu, dan halaman Checkout selalu sinkron tanpa perlu passing props manual.

import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

const TAX_RATE = 0.05;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [note, setNote] = useState('');

  function addItem(menu, portion, price) {
    const key = `${menu.id}-${portion}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        { key, id: menu.id, name: menu.name, emoji: menu.emoji, image: menu.image, portion, price, qty: 1 },
      ];
    });
  }

  function changeQty(key, delta) {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function clearCart() {
    setItems([]);
    setNote('');
  }

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const tax = useMemo(() => Math.round(subtotal * TAX_RATE), [subtotal]);
  const total = subtotal + tax;
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const value = { items, note, setNote, addItem, changeQty, clearCart, subtotal, tax, total, count };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart harus dipakai di dalam <CartProvider>');
  return ctx;
}
