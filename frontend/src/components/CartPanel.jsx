// ─── KOMPONEN: CARTPANEL ──────────────────────────────────────────────────────
// Menampilkan isi keranjang (dari CartContext) dan memicu PaymentModal.

import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import PaymentModal from './PaymentModal.jsx';

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function CartPanel() {
  const { items, note, setNote, changeQty, subtotal, tax, total } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  return (
    <aside id="keranjang" className="card-surface p-5 lg:sticky lg:top-24 scroll-mt-24">
      <h3 className="font-display text-lg text-bw-gold mb-4">🛒 Keranjang Saya</h3>

      {items.length === 0 ? (
        <div className="text-center text-bw-muted py-10">
          <div className="text-3xl mb-2">🛒</div>
          <p>Keranjang masih kosong</p>
          <p className="text-sm">Pilih menu di sebelah kiri</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
            {items.map((c) => (
              <div key={c.key} className="flex items-center gap-3">
                <img src={c.image} alt={c.name} className="w-12 h-12 rounded-lg object-cover bg-bw-surface2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{c.name}</p>
                  <p className="text-xs text-bw-muted">Porsi {c.portion} · {fmt(c.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => changeQty(c.key, -1)} className="w-6 h-6 rounded bg-bw-surface2 hover:bg-bw-border">−</button>
                  <span className="w-4 text-center text-sm">{c.qty}</span>
                  <button onClick={() => changeQty(c.key, 1)} className="w-6 h-6 rounded bg-bw-surface2 hover:bg-bw-border">+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-bw-border text-sm space-y-1">
            <Row label="Subtotal" value={fmt(subtotal)} />
            <Row label="Pajak (5%)" value={fmt(tax)} />
            <Row label="Total" value={fmt(total)} bold />
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Catatan pesanan (misal: tidak pedas, tanpa MSG...)"
            rows={2}
            className="input-field mt-3 text-sm"
          />

          <button onClick={() => setShowPayment(true)} className="btn-gold w-full mt-3">
            Lanjut ke Pembayaran 💳
          </button>
        </>
      )}

      {showPayment && <PaymentModal onClose={() => setShowPayment(false)} />}
    </aside>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? 'font-semibold text-bw-goldlight text-base' : 'text-bw-muted'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
