// ─── KOMPONEN: PAYMENTMODAL ───────────────────────────────────────────────────
// Modal pemilihan metode pembayaran, terpisah dari CartPanel agar tiap
// komponen punya satu tanggung jawab yang jelas.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { orderApi } from '../services/api.js';
import SuccessModal from './SuccessModal.jsx';

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');
const PAY_LABEL = { qris: 'QRIS', transfer: 'Transfer Bank BCA', cod: 'Tunai / COD' };

export default function PaymentModal({ onClose }) {
  const { items, note, total, clearCart } = useCart();
  const { user, token, isGuest } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successOrder, setSuccessOrder] = useState(null);

  async function handleConfirm() {
    if (!method) return setError('Pilih metode pembayaran!');
    if (isGuest) {
      setError('Login terlebih dahulu untuk memesan.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await orderApi.create(token, { payment: method, note, items });
      setSuccessOrder({ ...res.data, items });
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (successOrder) {
    return (
      <SuccessModal
        order={successOrder}
        onDone={() => {
          onClose();
          navigate('/riwayat');
        }}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="card-surface w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-bw-muted hover:text-bw-text">✕</button>
        <h2 className="font-display text-xl text-bw-gold mb-1">💳 Pembayaran</h2>
        <p className="text-sm text-bw-muted mb-4">Pilih metode pembayaran untuk pesanan kamu, {user?.name}</p>

        <ul className="text-sm bg-bw-bg rounded-lg p-3 mb-4 space-y-1 max-h-32 overflow-y-auto">
          {items.map((c) => (
            <li key={c.key}>{c.emoji} {c.name} ({c.portion}) x{c.qty} — {fmt(c.price * c.qty)}</li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 mb-4">
          {Object.entries(PAY_LABEL).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMethod(key)}
              className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                method === key ? 'border-bw-gold bg-bw-surface2' : 'border-bw-border hover:border-bw-gold'
              }`}
            >
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-bw-red text-sm mb-3">⚠️ {error}</p>}

        <div className="flex justify-between items-center bg-bw-bg rounded-lg px-4 py-3 mb-4">
          <span className="text-bw-muted">Total</span>
          <span className="text-bw-goldlight font-semibold text-lg">{fmt(total)}</span>
        </div>

        <button onClick={handleConfirm} disabled={submitting} className="btn-gold w-full disabled:opacity-60">
          {submitting ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
        <button onClick={onClose} className="w-full mt-2 py-2 text-bw-muted hover:text-bw-text text-sm">
          Batal
        </button>
      </div>
    </div>
  );
}
