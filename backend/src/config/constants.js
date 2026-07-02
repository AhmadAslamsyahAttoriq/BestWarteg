// ─── KONFIGURASI APLIKASI ───────────────────────────────────────────────────
// Simpan semua nilai konstan/rahasia di sini agar mudah diubah tanpa
// menyentuh logika lain di file lain.

export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET || 'best-warteg-secret-2025';
export const JWT_EXPIRES_IN = '7d';
export const TAX_RATE = 0.05;       // Pajak PB1 5%
export const DEFAULT_SHIPPING = 8000;
