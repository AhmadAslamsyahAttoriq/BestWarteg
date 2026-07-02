// ─── KOMPONEN: LOADING ────────────────────────────────────────────────────────
// Papan pengumuman "sedang menunggu stok" saat useEffect memuat data dari API.

export default function Loading({ label = 'Memuat data...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-bw-muted">
      <div className="w-8 h-8 border-2 border-bw-border border-t-bw-gold rounded-full animate-spin" />
      <p>{label}</p>
    </div>
  );
}
