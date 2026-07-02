// ─── KOMPONEN: PROTECTEDROUTE ────────────────────────────────────────────────
// Membungkus rute yang butuh login; redirect ke /login jika belum ada sesi.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
