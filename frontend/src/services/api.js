// ─── HALAMAN: RIWAYAT PESANAN ─────────────────────────────────────────────────

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { orderApi } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function History() {
  const { token, isGuest } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadOrders() {
    if (isGuest) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await orderApi.getMine(token);
      setOrders(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleDelete(id) {
    if (!confirm(`Hapus pesanan #${id}?`)) return;
    try {
      await orderApi.remove(token, id);
      setOrders((prev) => prev.filter((o) => o.orderId !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleConfirm(id) {
    try {
      const res = await orderApi.confirm(token, id);
      setOrders((prev) => prev.map((o) => (o.orderId === id ? res.data : o)));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="text-bw-gold text-sm hover:underline">← Kembali ke Menu</Link>
      <h1 className="font-display text-2xl text-bw-gold mt-3 mb-6">📋 Riwayat Pesanan</h1>

      {isGuest && (
        <p className="text-bw-muted text-center py-16">
          Riwayat hanya tersedia untuk akun terdaftar. <Link to="/login" className="text-bw-gold underline">Masuk / Daftar</Link>
        </p>
      )}

      {!isGuest && loading && <Loading label="Memuat riwayat..." />}
      {!isGuest && !loading && error && <ErrorMessage message={error} onRetry={loadOrders} />}

      {!isGuest && !loading && !error && (
        orders.length === 0 ? (
          <div className="text-center text-bw-muted py-16">
            <div className="text-3xl mb-2">📋</div>
            <p>Belum ada pesanan</p>
            <p className="text-sm">Yuk mulai pesan!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((o) => (
              <div key={o.orderId} className="card-surface p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-display text-bw-gold">#{o.orderId}</p>
                    <p className="text-xs text-bw-muted">{o.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {o.status === 'selesai' ? (
                      <span className="text-xs bg-bw-green/20 text-bw-green px-2 py-1 rounded-full">✅ Pesanan Diterima</span>
                    ) : (
                      <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">🍳 Sedang Diproses</span>
                    )}
                    <button onClick={() => handleDelete(o.orderId)} className="text-bw-muted hover:text-bw-red">🗑</button>
                  </div>
                </div>
                <p className="text-sm text-bw-muted mt-3">
                  {o.items.map((i) => `${i.emoji} ${i.name} (${i.portion}) x${i.qty}`).join(' · ')}
                </p>
                {o.note && <p className="text-xs text-bw-muted mt-1">📝 {o.note}</p>}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-bw-border">
                  <span className="text-bw-goldlight font-semibold">{fmt(o.total)}</span>
                  <span className="text-sm text-bw-muted">{o.paymentLabel}</span>
                </div>
                {o.status !== 'selesai' && (
                  <button
                    onClick={() => handleConfirm(o.orderId)}
                    className="btn-gold w-full mt-3 text-sm py-2"
                  >
                    Konfirmasi Pesanan Diterima
                  </button>
                )}
                {o.status === 'selesai' && o.confirmedAt && (
                  <p className="text-xs text-bw-muted mt-2 text-center">Diterima pada {o.confirmedAt}</p>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}