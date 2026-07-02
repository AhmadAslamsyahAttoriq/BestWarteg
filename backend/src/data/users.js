// ─── DATA USER & ADMIN ───────────────────────────────────────────────────────
// Akun admin dipisah dari akun pelanggan biasa lewat field `role`.
// Disimpan in-memory untuk keperluan praktikum (bukan database sungguhan).

export const users = [
  { id: 1, name: 'Admin Warteg', username: 'admin1',  email: 'admin1@bestwarteg.com',  password: 'admin123',  role: 'admin' },
  { id: 2, name: 'Admin Dua',    username: 'admin2',  email: 'admin2@bestwarteg.com',  password: 'admin1234', role: 'admin' },
];
