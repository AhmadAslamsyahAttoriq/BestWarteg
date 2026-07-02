// ─── HALAMAN: HOME (MENU) ─────────────────────────────────────────────────────
// Mengambil data menu dari backend lewat useEffect + fetch (menuApi), lalu
// menyaring hasilnya di sisi klien berdasarkan kategori & kata pencarian.

import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import CategoryTabs from '../components/CategoryTabs.jsx';
import FoodCard from '../components/FoodCard.jsx';
import CartPanel from '../components/CartPanel.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { menuApi } from '../services/api.js';

export default function Home() {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadData() {
    setLoading(true);
    setError('');
    try {
      const [menuRes, catRes] = await Promise.all([menuApi.getAll(), menuApi.getCategories()]);
      setMenus(menuRes.data);
      setCategories(catRes.data);
    } catch (err) {
      setError(err.message || 'Gagal memuat menu dari server. Pastikan backend aktif di localhost:3001.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Saat ikon 🛒 di Header diklik (link ke "/#keranjang"), scroll otomatis
  // ke panel keranjang — supaya jelas ini bukan halaman kosong.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === '#keranjang') {
      document.getElementById('keranjang')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash, loading]);

  const filtered = useMemo(() => {
    return menus.filter((m) => {
      const matchCat = activeCat === 'all' || m.category === activeCat;
      const q = query.toLowerCase();
      const matchQuery = !q || m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [menus, activeCat, query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <span className="text-4xl">🍛</span>
        <h1 className="font-display text-3xl sm:text-4xl text-bw-gold mt-2">Warung Terbaik, Masakan Terenak</h1>
        <p className="text-bw-muted mt-2 mb-5">Pilihan lauk pauk lengkap · Harga ramah kantong · Porsi mengenyangkan</p>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      {loading && <Loading label="Sedang menunggu stok dari dapur..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadData} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div>
            <div className="mb-5">
              <CategoryTabs categories={categories} active={activeCat} onSelect={setActiveCat} />
            </div>
            {filtered.length === 0 ? (
              <p className="text-center text-bw-muted py-16">🍽 Menu tidak ditemukan</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((menu) => (
                  <FoodCard key={menu.id} menu={menu} />
                ))}
              </div>
            )}
          </div>
          <CartPanel />
        </div>
      )}
    </div>
  );
}
