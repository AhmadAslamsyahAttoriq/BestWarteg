// ─── KOMPONEN: SEARCHBAR ──────────────────────────────────────────────────────
// Menerima value & onChange lewat props (controlled input), state pencarian
// sesungguhnya dikelola oleh komponen induk (Home.jsx) via useState.

export default function SearchBar({ value, onChange }) {
  return (
    <div className="max-w-xl mx-auto flex items-center gap-2 bg-bw-bg border border-bw-border rounded-full px-4 py-2.5">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari menu favoritmu..."
        className="flex-1 bg-transparent outline-none text-bw-text placeholder:text-bw-muted"
      />
      <span>🔍</span>
    </div>
  );
}
