// ─── CONTROLLER: KERANJANG ────────────────────────────────────────────────────

import { menus } from '../data/menus.js';
import { carts } from '../store/memoryStore.js';

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function getCart(req, res) {
  const cart = carts[req.params.sid] || [];
  res.json({ success: true, data: cart, total: cartTotal(cart) });
}

export function addToCart(req, res) {
  const { menuId, portion = 'sedang' } = req.body;
  const menu = menus.find(m => m.id === Number(menuId));
  if (!menu) return res.status(404).json({ success: false, message: 'Menu tidak ditemukan' });

  if (!carts[req.params.sid]) carts[req.params.sid] = [];
  const cart = carts[req.params.sid];
  const price = menu.price[portion];
  const key = `${menu.id}-${portion}`;
  const existing = cart.find(i => i.key === key);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, id: menu.id, name: menu.name, emoji: menu.emoji, image: menu.image, portion, price, qty: 1 });
  }

  res.json({ success: true, data: cart, total: cartTotal(cart) });
}

export function updateCartItem(req, res) {
  const cart = carts[req.params.sid] || [];
  const item = cart.find(i => i.key === req.params.key);
  if (!item) return res.status(404).json({ success: false, message: 'Item tidak ditemukan' });

  item.qty += Number(req.body.delta);
  if (item.qty <= 0) {
    carts[req.params.sid] = cart.filter(i => i.key !== req.params.key);
  }

  const updated = carts[req.params.sid] || [];
  res.json({ success: true, data: updated, total: cartTotal(updated) });
}

export function clearCart(req, res) {
  carts[req.params.sid] = [];
  res.json({ success: true, message: 'Keranjang berhasil dikosongkan' });
}
