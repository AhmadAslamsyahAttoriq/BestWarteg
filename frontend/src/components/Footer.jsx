// ─── KOMPONEN: FOOTER ─────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-bw-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-bw-muted flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="font-display text-bw-gold">🍛 Best Warteg</div>
        <p>Masakan Rumahan Terbaik · Sejak 2010</p>
        <p>© {new Date().getFullYear()} Best Warteg. Semua hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
