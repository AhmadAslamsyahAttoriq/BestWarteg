// ─── KOMPONEN: SUCCESSMODAL ───────────────────────────────────────────────────
// Konfirmasi pesanan berhasil + barcode pesanan, terpisah dari PaymentModal.

const PAY_LABEL = { qris: 'QRIS', transfer: 'Transfer Bank BCA', cod: 'Tunai / COD' };

function generateBarPattern(code) {
  return Array.from(code).flatMap((c) =>
    c.charCodeAt(0).toString(2).padStart(7, '0').split('').map(Number)
  );
}

export default function SuccessModal({ order, onDone, onClose }) {
  const pattern = generateBarPattern(order.orderId);
  const barW = 300 / pattern.length;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="card-surface w-full max-w-md p-6 text-center relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-bw-muted hover:text-bw-text">✕</button>
        <div className="text-4xl mb-2">✅</div>
        <h2 className="font-display text-xl text-bw-gold">Pesanan Berhasil!</h2>
        <p className="text-sm text-bw-muted mb-4">Pesanan kamu sedang diproses oleh dapur</p>

        <div className="bg-bw-bg rounded-lg py-3 mb-4">
          <p className="text-xs text-bw-muted">Nomor Pesanan</p>
          <p className="font-display text-lg text-bw-gold">#{order.orderId}</p>
        </div>

        <ul className="text-sm text-left bg-bw-bg rounded-lg p-3 mb-3 space-y-1">
          {order.items.map((c) => (
            <li key={c.key}>{c.emoji} {c.name} ({c.portion}) x{c.qty}</li>
          ))}
        </ul>
        <p className="text-sm text-bw-muted mb-4">Metode: {PAY_LABEL[order.payment] || order.payment}</p>

        <div className="bg-white rounded-lg p-3 mb-4">
          <svg viewBox="0 0 300 70" width="100%">
            <rect width="300" height="70" fill="white" />
            {pattern.map((bit, i) =>
              bit ? <rect key={i} x={i * barW} y={4} width={barW} height={60} fill="#1a1108" /> : null
            )}
            <text x="150" y="68" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#555" letterSpacing="2">
              {order.orderId}
            </text>
          </svg>
        </div>

        <button onClick={onDone} className="btn-gold w-full mb-2">Lihat Riwayat Pesanan</button>
        <button onClick={onClose} className="w-full py-2 text-bw-muted hover:text-bw-text text-sm">
          Pesan Lagi
        </button>
      </div>
    </div>
  );
}
