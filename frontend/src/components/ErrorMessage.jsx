// ─── KOMPONEN: ERRORMESSAGE ───────────────────────────────────────────────────

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center py-16">
      <p className="text-bw-red mb-3">⚠️ {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-gold px-4 py-2 text-sm">
          Coba Lagi
        </button>
      )}
    </div>
  );
}
