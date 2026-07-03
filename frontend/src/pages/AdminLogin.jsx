// ─── HALAMAN: LOGIN ADMIN ─────────────────────────────────────────────────────
// Login terpisah dari pelanggan, khusus akun dengan role 'admin'.

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminLogin(username, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bw-bg">
      <div className="card-surface w-full max-w-sm p-6">
        <h1 className="font-display text-2xl text-bw-gold text-center mb-1">🔐 Login Admin</h1>
        <p className="text-sm text-bw-muted text-center mb-6">Khusus pengelola Best Warteg</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          {error && <p className="text-sm text-bw-red">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <Link to="/login" className="block text-center text-sm text-bw-muted hover:text-bw-gold mt-4">
          ← Kembali ke login pelanggan
        </Link>
      </div>
    </div>
  );
}