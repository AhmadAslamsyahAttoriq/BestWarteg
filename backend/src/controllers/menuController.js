// ─── CONTROLLER: MENU ────────────────────────────────────────────────────────

import { menus } from '../data/menus.js';

export function getMenus(req, res) {
  let data = [...menus];

  if (req.query.cat && req.query.cat !== 'all') {
    data = data.filter(m => m.category === req.query.cat);
  }
  if (req.query.q) {
    const q = req.query.q.toLowerCase();
    data = data.filter(m =>
      m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, total: data.length, data });
}

export function getCategories(req, res) {
  const categories = ['all', ...new Set(menus.map(m => m.category))];
  res.json({ success: true, data: categories });
}

export function getMenuById(req, res) {
  const menu = menus.find(m => m.id === Number(req.params.id));
  if (!menu) return res.status(404).json({ success: false, message: 'Menu tidak ditemukan' });
  res.json({ success: true, data: menu });
}

export function createMenu(req, res) {
  const { name, category, price, emoji, image, description } = req.body;
  if (!name || !category || !price || !price.kecil || !price.sedang || !price.besar) {
    return res.status(400).json({ success: false, message: 'Nama, kategori, dan harga (kecil/sedang/besar) wajib diisi' });
  }
  const newMenu = {
    id: menus.length ? Math.max(...menus.map(m => m.id)) + 1 : 1,
    name,
    category,
    price: { kecil: Number(price.kecil), sedang: Number(price.sedang), besar: Number(price.besar) },
    emoji: emoji || '🍽️',
    image: image || '',
    description: description || '',
    rating: 0,
    sold: 0,
    stock: 0,
    favorite: false,
  };
  menus.push(newMenu);
  res.json({ success: true, data: newMenu });
}

export function deleteMenu(req, res) {
  const idx = menus.findIndex(m => m.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Menu tidak ditemukan' });
  menus.splice(idx, 1);
  res.json({ success: true, message: 'Menu dihapus' });
}