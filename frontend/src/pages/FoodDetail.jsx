// ─── HALAMAN: DETAIL MENU ─────────────────────────────────────────────────────
// Mengambil ID menu dari URL lewat useParams, lalu fetch detail via useEffect.

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { menuApi } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function FoodDetail() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [portion, setPortion] = useState('sedang');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  async function loadMenu() {
    setLoading(true);
    setError('');
    try {
      const res = await menuApi.getById(id);
      setMenu(res.data);
      setPortion('sedang');
    } catch (err) {
      setError(err.message || 'Menu tidak ditemukan');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenu();
  }, [id]);

  if (loading) return <Loading label="Memuat detail menu..." />;
  if (error || !menu) return <ErrorMessage message={error || 'Menu tidak ditemukan'} onRetry={loadMenu} />;

  const price = menu.price[portion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="text-bw-gold text-sm hover:underline">← Kembali ke Menu</Link>

      <div className="card-surface overflow-hidden mt-4 grid sm:grid-cols-2">
        <div className="aspect-square bg-bw-surface2">
          <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <h1 className="font-display text-2xl text-bw-gold">{menu.emoji} {menu.name}</h1>
          <p className="text-sm text-bw-muted">{menu.category} · ⭐ {menu.rating} · {menu.sold} terjual</p>
          <p className="text-bw-text">{menu.description}</p>

          <div>
            <label className="text-sm text-bw-muted">Pilih Porsi</label>
            <select value={portion} onChange={(e) => setPortion(e.target.value)} className="input-field mt-1">
              {Object.entries(menu.price).map(([size, p]) => (
                <option key={size} value={size}>
                  {size[0].toUpperCase() + size.slice(1)} — {fmt(p)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-display text-bw-goldlight">{fmt(price)}</span>
            <button onClick={() => addItem(menu, portion, price)} className="btn-gold">
              + Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
