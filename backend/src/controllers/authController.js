// ─── CONTROLLER: AUTENTIKASI ─────────────────────────────────────────────────
// Menangani register, login pelanggan, login admin, dan profil user aktif.

import jwt from 'jsonwebtoken';
import { users } from '../data/users.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants.js';

function signToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, username: user.username, role: user.role || 'customer' },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function publicUser(user) {
  return { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role || 'customer' };
}

export function register(req, res) {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: 'Username sudah digunakan' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email sudah terdaftar' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password minimal 6 karakter' });
  }

  const user = { id: Date.now(), name, username, email, password, role: 'customer' };
  users.push(user);
  const token = signToken(user);
  res.json({ success: true, token, user: publicUser(user) });
}

export function login(req, res) {
  const { username, password } = req.body;
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Username atau password salah' });
  }
  const token = signToken(user);
  res.json({ success: true, token, user: publicUser(user) });
}

// Login khusus admin: hanya mengizinkan akun dengan role 'admin'.
// Dipisah dari login biasa agar logika hak akses tetap jelas terbaca.
export function adminLogin(req, res) {
  const { username, password } = req.body;
  const user = users.find(
    u => (u.username === username || u.email === username) && u.password === password && u.role === 'admin'
  );
  if (!user) {
    return res.status(401).json({ success: false, message: 'Kredensial admin tidak valid' });
  }
  const token = signToken(user);
  res.json({ success: true, token, user: publicUser(user) });
}

export function me(req, res) {
  res.json({ success: true, user: req.user });
}
