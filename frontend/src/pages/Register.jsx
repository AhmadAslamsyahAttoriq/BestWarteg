// ─── HALAMAN: REGISTER ────────────────────────────────────────────────────────

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, username, email, password } = form;
    if (!name || !username || !email || !password) return setError('Isi semua kolom!');
    if (password.length < 6) return setError('Password minimal 6 karakter.');
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-surface w-full max-w-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="text-4xl">🍛</span>
          <h1 className="font-display text-2xl text-bw-gold mt-2">Best Warteg</h1>
          <p className="text-sm text-bw-muted mt-1">Buat akun baru</p>
        </div>

        <div className="flex mb-6 rounded-lg overflow-hidden border border-bw-border">
          <Link to="/login" className="flex-1 text-center py-2 text-bw-muted text-sm hover:text-bw-gold">
            Masuk
          </Link>
          <span className="flex-1 text-center py-2 bg-bw-gold text-bw-bg font-semibold text-sm">Daftar</span>
        </div>

        {error && (
          <div className="bg-bw-red/15 border border-bw-red text-red-300 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Nama Lengkap" placeholder="Nama kamu" value={form.name} onChange={(v) => update('name', v)} />
          <Field label="Username" placeholder="Pilih username unik" value={form.username} onChange={(v) => update('username', v)} />
          <Field label="Email" type="email" placeholder="email@kamu.com" value={form.email} onChange={(v) => update('email', v)} />
          <Field label="Password" type="password" placeholder="Minimal 6 karakter" value={form.password} onChange={(v) => update('password', v)} />
          <button type="submit" disabled={loading} className="btn-gold disabled:opacity-60">
            {loading ? 'Memproses...' : 'Buat Akun'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-bw-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field mt-1"
      />
    </div>
  );
}
