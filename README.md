# 🍛 Best Warteg — React.js Food Ordering App

Aplikasi pemesanan makanan **Best Warteg**, dibangun ulang mengikuti struktur
React.js sesuai Lembar Penilaian Tugas Praktikum: komponen modular, Props &
State, integrasi API dengan `useEffect`, Tailwind CSS, React Router multi-halaman,
Context API untuk keranjang global, dan struktur backend yang rapi & terpisah.

## Struktur Proyek

```
best-warteg/
├── backend/                 # Express.js API (port 3001)
│   └── src/
│       ├── config/          # Konstanta & konfigurasi (PORT, JWT_SECRET, dst.)
│       ├── data/             # Data referensi: menus.js, users.js (admin terpisah)
│       ├── store/            # Penyimpanan sementara: carts, orders
│       ├── middleware/       # authMiddleware.js (requireAuth, requireAdmin)
│       ├── controllers/      # Logika bisnis per fitur
│       ├── routes/           # Definisi endpoint per fitur
│       ├── app.js            # Perakitan express app
│       └── server.js         # Entry point (npm run dev)
│
└── frontend/                 # React + Vite + Tailwind (port 5173)
    └── src/
        ├── components/       # Header, SearchBar, Footer, FoodCard, CartPanel,
        │                      # PaymentModal, SuccessModal, ProtectedRoute, dll.
        ├── pages/             # Login, Register, Home, FoodDetail, History, Barcode
        ├── context/           # AuthContext.jsx, CartContext.jsx (Context API)
        ├── services/          # api.js — satu-satunya tempat pemanggilan fetch
        ├── index.css          # Tailwind directives + komponen kustom
        └── App.jsx            # React Router routes
```

## Cara Menjalankan (Localhost)

Backend dan frontend berjalan sebagai **dua proses terpisah**. Buka dua
terminal.

### 1. Jalankan Backend (port 3001)

```bash
cd backend
npm install
npm run dev
```

Backend aktif di **http://localhost:3001**. Endpoint utama:
`/api/auth/*`, `/api/menu`, `/api/cart/:sid`, `/api/orders`, `/api/voucher`.

### 2. Jalankan Frontend (port 5173)

Buka terminal baru (biarkan backend tetap berjalan):

```bash
cd frontend
npm install
npm run dev
```

Frontend aktif di **http://localhost:5173** dan otomatis memanggil API ke
`http://localhost:3001/api` (diatur lewat `VITE_API_URL` di `.env`, contoh
nilainya ada di `.env.example`).

> Pastikan backend sudah berjalan **sebelum** membuka frontend, karena halaman
> Menu memuat data lewat `useEffect` + `fetch` saat pertama kali dibuka.

## Akun Contoh

| Peran     | Username | Password  |
|-----------|----------|-----------|
| Admin     | admin1   | admin123  |
| Admin     | admin2   | admin1234 |
| Pelanggan | Daftar sendiri lewat halaman **Register**, atau masuk sebagai **Tamu** |

## Deployment

- **Frontend**: `npm run build` di folder `frontend/`, lalu deploy folder
  `dist/` ke Vercel/Netlify. File `vercel.json` sudah disertakan untuk
  menangani rewrite SPA (mencegah 404 saat refresh di halaman detail).
- **Backend**: deploy folder `backend/` ke layanan Node.js (Render, Railway,
  dll.) lalu perbarui `VITE_API_URL` di frontend agar mengarah ke URL backend
  produksi.
