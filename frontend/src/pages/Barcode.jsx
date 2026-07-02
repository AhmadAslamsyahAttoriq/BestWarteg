// ─── HALAMAN: BARCODE TOKO ────────────────────────────────────────────────────

import { Link } from 'react-router-dom';

function generateBarPattern(code) {
  return Array.from(code).flatMap((c) =>
    c.charCodeAt(0).toString(2).padStart(7, '0').split('').map(Number)
  );
}

export default function Barcode() {
  const code = 'BWG-2024-001-JKT';
  const pattern = generateBarPattern(code);
  const barW = 300 / pattern.length;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <Link to="/" className="text-bw-gold text-sm hover:underline">← Kembali ke Menu</Link>
      <h1 className="font-display text-2xl text-bw-gold mt-3 mb-1">🏷 Barcode Best Warteg</h1>
      <p className="text-sm text-bw-muted mb-6">Tunjukkan barcode ini kepada kasir untuk identifikasi toko</p>

      <div className="card-surface p-6 text-center">
        <p className="font-display text-lg text-bw-gold">BEST WARTEG</p>
        <p className="text-xs text-bw-muted mb-4">Masakan Rumahan Terbaik · Sejak 2010</p>
        <div className="bg-white rounded-lg p-3">
          <svg viewBox="0 0 300 80" width="100%">
            <rect width="300" height="80" fill="white" />
            {pattern.map((bit, i) =>
              bit ? <rect key={i} x={i * barW} y={0} width={barW} height={80} fill="#1a1108" /> : null
            )}
          </svg>
        </div>
        <p className="text-xs text-bw-muted mt-3 tracking-widest">{code}</p>
      </div>

      <div className="card-surface p-5 mt-4 text-sm space-y-3">
        <div><strong className="text-bw-gold">📍 Alamat</strong><br />Jl. Warteg Bahagia No. 17, Jakarta Selatan</div>
        <div><strong className="text-bw-gold">📞 Kontak</strong><br />0812-3456-7890</div>
        <div><strong className="text-bw-gold">⏰ Jam Buka</strong><br />Senin – Minggu, 06.00 – 22.00 WIB</div>
      </div>
    </div>
  );
}
