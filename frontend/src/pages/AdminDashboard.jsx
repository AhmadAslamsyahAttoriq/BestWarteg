// ─── HALAMAN: DASHBOARD ADMIN ─────────────────────────────────────────────────
// Admin hanya bisa memantau daftar harga, menambah menu baru, dan menghapus menu.

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

const emptyForm = {
  name: '', category: '', emoji: '🍽️', image: '', description: '',
  kecil: '', sedang: '', besar: '',
};

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  async function loadMenus() {
    setLoading(true);
    setError('');
    try {
      const res = await menuApi.getAll();
      setMenus(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMenus();
  }, []);

  function handleLogout() {
    logout();
    navigate('/admin-login');
  }

  async function handleAdd(e) {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      await menuApi.create(token, {
        name: form.name,
        category: form.category,
        emoji: form.emoji,
        image: form.image,
        description: form.description,
        price: { kecil: form.kecil, sedang: form.sedang, besar: form.besar },
      });
      setForm(emptyForm);
      await loadMenus();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Hapus menu "${name}"?`)) return;
    try {
      await menuApi.remove(token, id);
      setMenus((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-bw-bg">
      <header className="border-b border-bw-border px-4 py-4 flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <h1 className="font-display text-xl text-bw-gold">🔐 Dashboard Admin</h1>
          <p className="text-xs text-bw-muted">Masuk sebagai {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-bw-muted hover:text-bw-red">
          Keluar
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-8">
        {/* ── Form Tambah Menu ── */}
        <section className="card-surface p-5">
          <h2 className="font-display text-lg text-bw-gold mb-4">+ Tambah Menu Baru</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text" placeholder="Nama menu" required
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
            />
            <input
              type="text" placeholder="Kategori (mis. Lauk, Sayur, Minuman)" required
              value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="input-field"
            />
            <input
              type="text" placeholder="Emoji (mis. 🍗)"
              value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
              className="input-field"
            />
            <input
              type="text" placeholder="URL gambar (opsional)"
              value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="input-field"
            />
            <input
              type="number" placeholder="Harga kecil" required min="0"
              value={form.kecil} onChange={(e) => setForm({ ...form, kecil: e.target.value })}
              className="input-field"
            />
            <input
              type="number" placeholder="Harga sedang" required min="0"
              value={form.sedang} onChange={(e) => setForm({ ...form, sedang: e.target.value })}
              className="input-field"
            />
            <input
              type="number" placeholder="Harga besar" required min="0"
              value={form.besar} onChange={(e) => setForm({ ...form, besar: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Deskripsi singkat"
              value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field sm:col-span-2"
              rows={2}
            />
            {formError && <p className="text-sm text-bw-red sm:col-span-2">{formError}</p>}
            <button type="submit" disabled={saving} className="btn-gold sm:col-span-2">
              {saving ? 'Menyimpan...' : 'Tambah Menu'}
            </button>
          </form>
        </section>

        {/* ── Daftar Harga (Monitoring) ── */}
        <section>
          <h2 className="font-display text-lg text-bw-gold mb-4">📋 Daftar Harga Menu</h2>

          {loading && <Loading label="Memuat menu..." />}
          {!loading && error && <ErrorMessage message={error} onRetry={loadMenus} />}

          {!loading && !error && (
            <div className="overflow-x-auto card-surface">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-bw-border text-bw-muted text-left">
                    <th className="p-3">Menu</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Kecil</th>
                    <th className="p-3">Sedang</th>
                    <th className="p-3">Besar</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {menus.map((m) => (
                    <tr key={m.id} className="border-b border-bw-border/50">
                      <td className="p-3">{m.emoji} {m.name}</td>
                      <td className="p-3 text-bw-muted">{m.category}</td>
                      <td className="p-3">{fmt(m.price.kecil)}</td>
                      <td className="p-3">{fmt(m.price.sedang)}</td>
                      <td className="p-3">{fmt(m.price.besar)}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(m.id, m.name)}
                          className="text-bw-muted hover:text-bw-red"
                        >
                          🗑 Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}