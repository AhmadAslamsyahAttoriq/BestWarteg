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
