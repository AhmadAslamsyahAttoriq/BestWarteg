// ─── APP: PENGATUR RUTE (REACT ROUTER) ───────────────────────────────────────

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import FoodDetail from './pages/FoodDetail.jsx';
import History from './pages/History.jsx';
import Barcode from './pages/Barcode.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu/:id" element={<FoodDetail />} />
                  <Route path="/riwayat" element={<History />} />
                  <Route path="/barcode" element={<Barcode />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}