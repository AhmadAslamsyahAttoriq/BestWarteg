// ─── KOMPONEN: CATEGORYTABS ───────────────────────────────────────────────────
// Menerima daftar kategori & kategori aktif lewat props, memberi tahu induk
// saat kategori berubah lewat callback onSelect (komunikasi anak → induk).

export default function CategoryTabs({ categories, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            active === c
              ? 'bg-bw-gold text-bw-bg border-bw-gold font-semibold'
              : 'border-bw-border text-bw-muted hover:border-bw-gold hover:text-bw-gold'
          }`}
        >
          {c === 'all' ? '🍽 Semua' : c}
        </button>
      ))}
    </div>
  );
}
