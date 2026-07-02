// ─── KOMPONEN: HEADER ─────────────────────────────────────────────────────────
// Papan nama aplikasi + navigasi utama + indikator jumlah item keranjang.

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="sticky top-0 z-30 bg-bw-surface/95 backdrop-blur border-b border-bw-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="font-display text-xl text-bw-gold">🍛 Best Warteg</Link>

        <nav className="hidden sm:flex items-center gap-1 text-sm">
          <NavLink to="/">Menu</NavLink>
          <NavLink to="/riwayat">Riwayat</NavLink>
          <NavLink to="/barcode">Barcode Toko</NavLink>
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <span className="hidden md:inline text-bw-muted">👤 {user?.name}</span>
          <Link
            to="/#keranjang"
            className="relative bg-bw-surface2 hover:bg-bw-border transition-colors rounded-lg px-3 py-2"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-bw-red text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className="bg-bw-surface2 hover:bg-bw-border transition-colors rounded-lg px-3 py-2"
          >
            ⬅ Keluar
          </button>
        </div>
      </div>
      <nav className="flex sm:hidden gap-1 px-4 pb-2 text-sm">
        <NavLink to="/">Menu</NavLink>
        <NavLink to="/riwayat">Riwayat</NavLink>
        <NavLink to="/barcode">Barcode</NavLink>
      </nav>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-lg text-bw-muted hover:text-bw-gold hover:bg-bw-surface2 transition-colors"
    >
      {children}
    </Link>
  );
}
