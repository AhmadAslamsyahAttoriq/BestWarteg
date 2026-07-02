// ─── HALAMAN: LOGIN ───────────────────────────────────────────────────────────

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return setError('Isi semua kolom!');
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleGuest() {
    loginAsGuest();
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-surface w-full max-w-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="text-4xl">🍛</span>
          <h1 className="font-display text-2xl text-bw-gold mt-2">Best Warteg</h1>
          <p className="text-sm text-bw-muted mt-1">Masakan Rumahan Terbaik · Sejak 2010</p>
        </div>

        <div className="flex mb-6 rounded-lg overflow-hidden border border-bw-border">
          <span className="flex-1 text-center py-2 bg-bw-gold text-bw-bg font-semibold text-sm">Masuk</span>
          <Link to="/register" className="flex-1 text-center py-2 text-bw-muted text-sm hover:text-bw-gold">
            Daftar
          </Link>
        </div>

        {error && (
          <div className="bg-bw-red/15 border border-bw-red text-red-300 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-bw-muted">Username atau Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-bw-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="input-field mt-1"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-gold disabled:opacity-60">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="text-center text-sm text-bw-muted mt-4">
          Tidak mau daftar?{' '}
          <button onClick={handleGuest} className="text-bw-gold underline">
            Masuk sebagai Tamu
          </button>
        </div>

        <p className="text-xs text-bw-muted text-center mt-6">
          Akun admin contoh: <span className="text-bw-gold">admin1 / admin123</span>
        </p>
      </div>
    </div>
  );
}
