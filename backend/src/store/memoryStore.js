// ─── PENYIMPANAN SEMENTARA (IN-MEMORY) ───────────────────────────────────────
// Dipisah dari data referensi (menus/users) karena isinya berubah-ubah
// selama aplikasi berjalan: keranjang aktif & daftar pesanan.

export const orders = [];  // { orderId, userId, items, total, payment, date, status }
export const carts = {};   // sessionId -> [{ key, id, name, emoji, price, portion, qty }]
