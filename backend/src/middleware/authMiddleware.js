// ─── MIDDLEWARE OTENTIKASI ────────────────────────────────────────────────────
// Memvalidasi JWT yang dikirim lewat header Authorization: Bearer <token>

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token tidak valid' });
  }
}

// Middleware tambahan khusus untuk membatasi akses ke akun admin,
// dipisah dari requireAuth agar reusable untuk rute non-admin lain.
export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Akses khusus admin' });
  }
  next();
}
