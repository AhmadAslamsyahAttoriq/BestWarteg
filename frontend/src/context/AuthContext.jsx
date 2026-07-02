// ─── CONTEXT: AUTENTIKASI ─────────────────────────────────────────────────────
// Menyimpan status login user (pelanggan / tamu) agar bisa diakses dari
// komponen mana pun tanpa prop-drilling.

import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Muat sesi dari localStorage saat aplikasi pertama kali dibuka
  useEffect(() => {
    const savedUser = localStorage.getItem('bw_user');
    const savedToken = localStorage.getItem('bw_token');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken || null);
      } catch {
        localStorage.removeItem('bw_user');
      }
    }
    setLoading(false);
  }, []);

  function persist(nextUser, nextToken) {
    setUser(nextUser);
    setToken(nextToken || null);
    localStorage.setItem('bw_user', JSON.stringify(nextUser));
    if (nextToken) localStorage.setItem('bw_token', nextToken);
  }

  async function login(username, password) {
    const data = await authApi.login({ username, password });
    persist(data.user, data.token);
    return data.user;
  }

  async function register(payload) {
    const data = await authApi.register(payload);
    persist(data.user, data.token);
    return data.user;
  }

  function loginAsGuest() {
    const guest = { id: 'guest-' + Date.now(), name: 'Tamu', username: 'tamu', role: 'guest' };
    persist(guest, null);
    return guest;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bw_user');
    localStorage.removeItem('bw_token');
  }

  const value = { user, token, loading, login, register, loginAsGuest, logout, isGuest: user?.role === 'guest' };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  return ctx;
}
